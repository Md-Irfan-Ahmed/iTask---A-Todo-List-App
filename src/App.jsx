import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id)=>{
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=> {
      return item.id !== id
    });
    //newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id : uuidv4(), todo, isCompleted : false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=> {return item.id === id;})
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] lg:w-3/4 xl:w-1/2">
        <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='py-1 w-full rounded-lg px-5'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className=' bg-violet-800 disabled:bg-violet-700 text-white font-bold text-sm hover:cursor-pointer hover:bg-violet-950 px-2 pt-2 pb-1 rounded-md'>Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> 
        <label className='mx-2' htmlFor="shoe">Show Finished</label>
        <div className="mx-auto mt-4 bg-black opacity-15 w-3/4 h-[1px]"></div>
        <h2 className="text-lg font-bold mt-2">Your Todos</h2>
        <div className="todos mx-2 my-2">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item=>{
             return (showFinished || !item.isCompleted) && <div key = {item.id} className="todo flex w-full justify-between my-3">
              <div className="flex gap-5">
              <input onChange={handleCheckbox} type="checkbox" checked ={item.isCompleted} name={item.id} id=""/>
             <div className={item.isCompleted ? "line-through" :"" }>{item.todo}</div>
              </div>
             <div className="buttons flex h-full">
             <button onClick={(e)=>handleEdit(e, item.id)} className='ml-1 bg-violet-800 text-white text-sm font-bold hover:cursor-pointer hover:bg-violet-950 px-2 py-1 rounded-md'><FaEdit /></button>
             <button onClick={(e)=>{{handleDelete(e, item.id)}}} className='ml-1 bg-violet-800 text-white text-sm font-bold hover:cursor-pointer hover:bg-violet-950 px-2 py-1 rounded-md'><RiDeleteBin6Line /></button>
             </div>
             </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
