import { React, useState } from 'react'
import Form from '../Todo/Form'
import Todolista from '../Todo/Todolista'

function Todolist() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  }

  const removeTodo = (todoIndex) => {
    const todosCopy = [...todos];
    todosCopy.splice(todoIndex, 1);
    setTodos(todosCopy);
  }
  return (
    <div style={{ border: '2px solid purple', borderRadius: '3%', marginTop: '9vh', backgroundColor: '#E8DED1', textAlign: 'center' }}>
        <h3>TodoList</h3>
        <Form addTodo={addTodo}/>
        <Todolista todos={todos} removeTodo={removeTodo}/>
    </div>
  )
}

export default Todolist