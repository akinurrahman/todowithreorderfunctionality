# Todo List Application

## Overview

This is a simple Todo List application built using React JS. Users can add, delete, and reorder tasks with drag-and-drop functionality. The application fetches tasks from the JSONPlaceholder API initially only when there are no tasks stored locally. Task data is saved to local storage, ensuring persistence across sessions.

## Key Features

- **Load Todos**: Todos are loaded from JSONPlaceholder only when there are no tasks stored locally. If tasks exist in local storage, fetching from the API is skipped.
- **Local Storage**: Task data is saved to local storage, allowing for persistence across sessions.
- **Add and Delete Todos**: Users can add new todos and delete existing ones.
- **Reorder Todos**: Todos can be reordered using drag-and-drop functionality.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/akinurrahman/todowithreorderfunctionality.git
    ```

2. Navigate to the project directory:

    ```bash
    cd todowithreorderfunctionality
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

- **Add Todo**: Click on the "Add New Todo" button and enter the task in the input field.  click the "Add" button to add the task to the list.
- **Delete Todo**: Each todo item has a delete button (trash icon). Click on the delete button to remove the task from the list.
- **Reorder Todo**: Drag and drop a todo item to change its position in the list.

## Technologies Used

- React JS
- Local Storage API
- JSONPlaceholder API
- dnd-kit/core for drag-and-drop functionality




