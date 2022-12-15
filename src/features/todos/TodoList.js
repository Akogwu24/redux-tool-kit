// add imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } from '../api/apiSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    //addTodo

    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div className='new-todo'>
        <input type='text' id='new-todo' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='Enter new todo' />
      </div>
      <button className='submit'>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  // Define conditional content
  if (isLoading) {
    <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className='todo'>
            <input type='checkbox' checked={todo.completed} id={todo.id} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className='trash' onClick={() => deleteTodo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    <h1>{error}</h1>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
