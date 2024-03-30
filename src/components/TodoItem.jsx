import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDelete } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const TodoItem = ({ task, handleDeleteTodo }) => {
  const { id, title, completed } = task;

  // Use useSortable hook to enable drag and drop functionality
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Style object for applying transitions and transforms
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="task  bg-white  hover:bg-gray-50 border border-gray-200  my-1 rounded-lg p-4 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center">
        <div className=" mr-4" {...listeners}>
          <IoMenu className="text-gray-400 cursor-move" />
        </div>
        <p
          className={`${
            completed && "line-through"
          } text-gray-800 font-medium `}
        >
          {title}
        </p>
      </div>
      <button
        className="focus:outline-none"
        onClick={() => handleDeleteTodo(id)}
      >
        <MdDelete className="text-red-500 cursor-pointer" />
      </button>
    </div>
  );
};

export default TodoItem;
