import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  getTodosFromLocalStorage,
  storeTodosInLocalStorage,
} from "../hooks/UseLocalStorage";

const TodoForm = ({ handleAddTodo, setShowForm }) => {
  // State to manage the input value and initialize with default values
  const [value, setValue] = useState({
    id: null,
    title: "",
    completed: false,
    userId: 1,
  });

  // Function to handle input change
  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Create a new todo object with current timestamp as ID
    const newTodo = {
      id: Date.now(),
      title: value.title,
      completed: false,
      userId: 1,
    };

    // Call the parent function to add the new todo
    handleAddTodo(newTodo);

    // Fetch existing todos from local storage
    const existingTodos = getTodosFromLocalStorage();

    // Update local storage with new todo
    storeTodosInLocalStorage([...existingTodos, newTodo]);

    // Reset the input field after submission
    setValue((prevState) => ({
      ...prevState,
      id: null,
      title: "",
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-2 bg-gray-100 p-8 w-96 relative rounded-md"
    >
      {/* Close button to hide the form */}
      <IoMdClose
        className="absolute top-3 right-3 bg-black text-white rounded-full cursor-pointer"
        onClick={() => setShowForm(false)} // Call setShowForm to hide the form
      />
      {/* Label for the input field */}
      <label>Enter a new task</label>

      <input
        type="text"
        value={value.title}
        onChange={handleChange}
        placeholder="Enter a new task"
        className="border border-gray-300 px-3 py-2 rounded-md mr-2 focus:outline-none w-full"
      />
      {/* Button to submit the new task */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none w-full"
      >
        Add New Task
      </button>
    </form>
  );
};

export default TodoForm;
