// Function to fetch todos from local storage
export const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

// Function to store todos in local storage
export const storeTodosInLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
