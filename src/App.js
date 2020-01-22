import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id)=>{
    const newTodos = [...todos];
    const todo = newTodos.find(todo=>todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  const handleAddTodo = (e) =>{
    const name = todoNameRef.current.value;
    if(name == '') return
      console.log(name);
      todoNameRef.current.value = null;
      setTodos(prevTodos => {
        return [...prevTodos, {
          id: uuidv4(),
          name: name,
          complete: false
        }]
      })
  }

  const handleClearTodos = ()=>{
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <div className="container">
      <div className="col-md-5 mx-auto border py-3">
        <TodoList todos={todos} toggleTodo = {toggleTodo}/>
        <div>
          {todos.filter(todo => !todo.complete).length} Left to do
        </div>
        <input ref={todoNameRef} className="col-md-6" type="text"/>
        <button onClick={handleAddTodo} className="col-md-3">Add Todo</button>
        <button onClick={handleClearTodos} className="col-md-3">Clear</button>
        
      </div>
    </div>
  );
}

export default App;
