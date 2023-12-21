// Todos.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../features/todo/todoSlice';
import AddTodo from './AddTodo';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [doEdit, setDoEdit] = useState(false);

  const handleEditClick = (id, text) => {
    setEditId(id);
    setEditText(text);
    setDoEdit((prev) => !prev);
  };

  const handleAfterUpdated = () => {
    setEditId(null);
    setEditText('');
    setDoEdit((prev) => !prev);
  };

  return (
    <>
      <AddTodo editId={editId} editText={editText} handleAfterUpdated={handleAfterUpdated} />
      <div>Todos</div>
      <ul className="list-none flex  flex-col">
        {todos.map((todo) => (
          <li
            className={`mt-4 w-[35rem] mx-auto flex justify-between items-center text-black px-4 py-2 rounded-full bg-gray-200`}
            key={todo.id}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="checkbox-input visually-hidden"
              />
              <label
                className={`checkbox-label ${todo.completed ? 'checked' : ''} mr-3`}
                onClick={() => dispatch(toggleTodo(todo.id))}
              ></label>


              <div className={`text-black ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => (doEdit ? handleAfterUpdated() : handleEditClick(todo.id, todo.text))}
                disabled={todo.completed} // Disable the "Edit" button if the todo is completed
                className={`text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none rounded-full ${todo.completed ? 'opacity-50 cursor-not-allowed mr-3 ' : 'hover:bg-blue-600 text-md mr-3'
                  }`}

              >
                {doEdit ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-600 border-0 py-1 px-4 focus:outline-none hover: border-x-2 hover:border-red-600 rounded-md text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
