import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import axios from "axios";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  getTodosFromLocalStorage,
  storeTodosInLocalStorage,
} from "./hooks/UseLocalStorage";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch todos from API or local storage
  const fetchTodos = async () => {
    try {
      const localData = getTodosFromLocalStorage();
      if (localData.length > 0) {
        setTasks(localData);
      } else {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const apiData = response.data.slice(0, 5);
        setTasks(apiData);
        storeTodosInLocalStorage(apiData);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Define sensors for drag and drop functionality
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Helper function to get the position of a task in the list
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  // Handle drag and drop end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If dragged over the same task, do nothing
    if (active.id === over.id) return;

    // Get original and new positions of the dragged task
    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);

    // Update tasks state with the new order
    const updatedTasks = arrayMove(tasks, originalPos, newPos);
    setTasks(updatedTasks);
    storeTodosInLocalStorage(updatedTasks);
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    storeTodosInLocalStorage(updatedTasks);
  };

  // Handle adding a new todo
  const handleAddTodo = (value) => {
    setTasks((prev) => [...prev, value]);
  };

  // handle adding completed
  const handleTaskCompleted = (id) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed: true };

      setTasks(updatedTasks);
      storeTodosInLocalStorage(updatedTasks);
    }
  };

  return (
    <div className="App min-h-screen bg-gray-100 px-3">
      <h1 className="text-3xl font-semibold text-center py-6">My Tasks ✅</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <TodoList
          tasks={tasks}
          handleDeleteTodo={handleDeleteTodo}
          handleAddTodo={handleAddTodo}
          handleTaskCompleted={handleTaskCompleted}
        />
      </DndContext>
    </div>
  );
};

export default App;
