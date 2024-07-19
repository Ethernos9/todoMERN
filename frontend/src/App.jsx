import React, { useEffect, useState } from 'react'
import dotenv from "dotenv"
import axios from "axios"



const App = () => {


  const [todos,setTodos]= useState([])
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  
   
  let url  = "http://localhost:3000"
  
     const getTodos = async()=>{
        const data =   await axios.get(`${url}/todos`)   
        setTodos(data.data.todos)   
        console.log(data.data.todos)
   }
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeDesc = (e) => {
    setDesc(e.target.value)
  }
  const addTodo = async()=>{
      try {
         const response =  axios.post(`${url}/todo`,{title,desc})
         getTodos()
         setTitle("")
         setDesc("")
      } catch (error) {
         console.log(error)
      }
  }
  const updateTodo = async(id)=>{
    try {
      const response = await axios.put(`${url}/completed`,{id});
    } catch (error) {
      console.error('Error updating todo:', error);
    }
    getTodos()
  }
  const deleteTodo = async(id)=>{
    try {
       await axios.post(`${url}/delete`,{id});
    } catch (error) {
      console.error('Error updating todo:', error);
    }
    getTodos()
  }
  useEffect(()=>{
   getTodos()
  },[])

  return (
    <div>
      <div>
            <input type="text" onChange={onChangeTitle} placeholder='title' value = {title} name = "name"/>
            <input type="text" onChange={onChangeDesc} placeholder='title' value = {desc} name = "desc"/>

            <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        {
          todos.map((todo,index)=>{
            return(
              <div key = {index}>
                <h2>{todo.title}</h2>
                <p>{todo.desc}</p>
                <button onClick={()=>updateTodo(todo._id)}>{todo.complete ? "completed":"not completed"}</button>
                <button onClick={()=>deleteTodo(todo._id)}>X</button>
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default App