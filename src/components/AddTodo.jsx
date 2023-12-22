import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, addTodos, updateTodo } from '../features/todo/todoSlice'

function AddTodo({
  editId,
  editText,
  handleAfterUpdated }) {

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

  useEffect(() => {
    setInput(editText)
  }, [editText, editId])

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
    <form onSubmit={editId !== null ? handleUpdateTodo : addTodoHandler} className="space-x-3 mt-12">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your new task"
          className=" rounded-2xl border text-white border-neutral-300 bg-transparent py-3 pl-4 pr-20 text-base/6 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />

      <button
        type='submit'
        className="mt-3 relative py-2 px-8 text-black text-base font-bold uppercase rounded-[50px] overflow-hidden bg-gray-200 transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-gray-800 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[50px] hover:before:left-0">
        {editId !== null ? 'Update' : 'Add Todo'}
      </button>

      {/* <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 mt-3 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editId !== null ? 'Update' : 'Add Todo'}
      </button> */}
    </form>
  )
}

export default AddTodo