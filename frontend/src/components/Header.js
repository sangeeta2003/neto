import React from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Header = () => {
  return (
    <div className=' flex absolute z-10 w-[100vw] items-center justify-between bg-gradient-to-b from-black px-6'>
     
     <img className='w-56' src='https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png' alt=''/>
    <div className='flex items-center '>
    <IoIosArrowDropdownCircle size="24px" color='white'/>
    <h1 className='text-lg font-medium text-white'>Sangeeta M</h1>
      </div>
    <div className='ml-4 '>
    <button className='bg-red-800 text-white px-4 py-2'>Logout</button>
    <button className='bg-red-800 text-white px-4 py-2 ml-2' >Search Movie</button>
    </div>
    
    </div> 
  )
}

export default Header