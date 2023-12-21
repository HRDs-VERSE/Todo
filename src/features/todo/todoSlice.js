import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: []
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false, // Add completed property and set it to false
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = newText;
      }
    },
    toggleTodo: (state, action) => {
      const todoToToggle = state.todos.find((todo) => todo.id === action.payload);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
    addTodos: (state, action) => {
      // Assuming the payload is an array of todos
      state.todos = [...state.todos, ...action.payload];
    },
  }
});

export const { addTodo, removeTodo, updateTodo, toggleTodo, addTodos } = todoSlice.actions;
export default todoSlice.reducer;
