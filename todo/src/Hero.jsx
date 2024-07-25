import React ,{useEffect, useState} from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillTrashFill,BsFillCheckCircleFill } from 'react-icons/bs';


function Hero() {
    const [todos, setTodos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])
    const handleEdit = (id)=>{
      axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        location.reload()

      })
      .catch(err => console.log(err))
      
  }
  const handleDelete = (id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(result => {
      location.reload()

    })
    .catch(err => console.log(err))
    
}
  
    
  return (
    <div className='Cont'>
      <h1 >Kira's To do List</h1>
      <Create/>
      {
        todos.length===0?
        <div><h2>No records</h2></div>
        :
        todos.map(todo => (
            <div className='task'>
              <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
                {todo.done? 
                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
              : <BsCircleFill className='icon'/>}

                
                <h4 className={todo.done?" line_through": "" }>{todo.task}</h4>
              </div>
              <div>
              <span><BsFillTrashFill className='icon' 
              onClick={() =>handleDelete(todo._id)} /></span>

              </div>
              
                
            </div>
        ))
      }
    </div>
  )
}

export default Hero
