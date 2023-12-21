import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {addTodo, addTodos, updateTodo} from '../features/todo/todoSlice' 

function AddTodo({
  editId,
  editText,
  handleAfterUpdated}) {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos);

    const addTodoHandler = (e) => {
        e.preventDefault()
        if (input.trim() !== '') {
        dispatch(addTodo(input))
        setInput('')
        }
    }

    const handleUpdateTodo = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      if (input.trim() !== '') {
        dispatch(updateTodo({ id: editId, newText: input }));
        setInput('');
        handleAfterUpdated();
      }
    };

    useEffect(() =>{
      setInput(editText)
    },[editText, editId])

    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem('todos'));
      
      if (storedTodos) {
          dispatch(addTodos(storedTodos));
        };
      
    }, []);
    
  
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

  return (
    <form onSubmit={editId !== null ? handleUpdateTodo: addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editId !== null ? 'Update' : 'Add Todo'}
      </button>
    </form>
  )
}

export default AddTodo