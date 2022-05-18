// import './App.css';
import TodoList from './TodoList';
import React, {useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = React.useState([])
  const todoNameRef = useRef()

  React.useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toogleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
function handleClearTodos() {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}

  return (
    <div>
   <TodoList todos={todos} toogleTodo={toogleTodo} />
   <input ref={todoNameRef} type='text' />
   <button onClick={handleAddTodo}>Add Todo</button>
   <button onClick={handleClearTodos}>Clear Complete</button>
   <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
   </div>
  )
}

export default App;
