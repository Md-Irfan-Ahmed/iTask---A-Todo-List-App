import React from 'react'
import { MdOutlineTaskAlt } from "react-icons/md";
const Navbar = () => {
  return (
    <nav className='flex justify-between bg-[#003285] py-2'>
        <div className="logo flex">
            <MdOutlineTaskAlt className='ml-9 size-8'/>
            <span className="font-bold text-2xl">iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='text-lg cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='text-lg cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
