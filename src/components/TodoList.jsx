import React, { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = ({
  tasks,
  handleDeleteTodo,
  handleAddTodo,
  handleTaskCompleted,
}) => {
  // State to control the visibility of the TodoForm
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-lg mx-auto ">
      <button
        onClick={() => setShowForm(true)}
        className="w-full  mb-2 bg-blue-600 hover:bg-blue-500 py-3 rounded-md text-white font-bold block"
      >
        Add New Tasks
      </button>

      {/* SortableContext to enable drag and drop functionality */}
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            handleDeleteTodo={handleDeleteTodo}
            handleTaskCompleted={handleTaskCompleted}
          />
        ))}
      </SortableContext>
      {/* Conditional rendering of TodoForm */}
      {showForm && (
        <section className="fixed inset-0  bg-gray-700 bg-opacity-50 flex items-center justify-center mx-3">
          <TodoForm setShowForm={setShowForm} handleAddTodo={handleAddTodo} />
        </section>
      )}
    </div>
  );
};

export default TodoList;
