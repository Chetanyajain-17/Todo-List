import './App.css';
import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  // States to manage view toggle, todo list, input fields, and completed todos
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompleteTodos] = useState([]);

  // Add a new todo to the list
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr); // update state
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr)); // save to localStorage
  };

  // Delete a todo from the list
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // remove item at given index
    setTodos(reducedTodo);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
  };

  // Mark a todo as completed
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; // add 1 because getMonth() returns 0-based index
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    // Create new completed task item
    let completedItem = {
      ...allTodos[index],
      completedon: completedOn,
    };

    let updatedCompletedArray = [...completedTodos, completedItem];
    updatedCompletedArray.push(completedItem);
    setCompleteTodos(updatedCompletedArray); // update completedTodos state
    handleDeleteTodo(index); // remove from active todo list
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArray));
  };

  // Load saved todos from localStorage on page load
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompleteTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>

      {/* Todo Input Section */}
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input
              type='text'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder='What is the task title?'
            />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input
              type='text'
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder='What is the task description?'
            />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='PrimaryButton'>
              Add
            </button>
          </div>
        </div>

        {/* Toggle between Todo and Completed */}
        <div className='btn-area'>
          <button
            className={`secondaryBtn ${!isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        {/* Active Todo List */}
        <div className='todo-list'>
          {!isCompleteScreen && allTodos.map((item, index) => (
            <div className='todo-list-item' key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>
                <MdDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                <FaCheck className='check-icon' onClick={() => handleComplete(index)} />
              </div>
            </div>
          ))}
        </div>

        {/* Completed Todo List */}
        <div className='todo-list'>
          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed on: {item.completedon}</small></p>
              </div>
              <div>
                <MdDelete className='icon' title='delete' />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
