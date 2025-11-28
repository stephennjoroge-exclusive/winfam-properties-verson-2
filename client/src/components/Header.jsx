import React from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import Breadcrumbs from './Breadcrumps';

const Header = ({isDark, setDark}) => {

    function darkMode() {
        setDark(!isDark)
    }

  return (
  <div className={`shadow h-[50px] z-30 flex fixed right-0 left-0 justify-between ml-[60px] top-0 bg-gray-50 p-3 dark:bg-gray-900 dark:text-gray-400 dark:border-b dark:border-[rgba(255,255,255,0.09)]
 ${isDark ? 'dark' : ''}`}>
        <div className='dark:text-gray-400 font-bold font-serif flex flex-col text-gray-700'> 
            GoodMorning , Isaac Njoroge
            <div className='text-[8px] font-normal font-sans text-gray-400 '>
                <Breadcrumbs/>
            </div>
        </div>

        <div className='flex justify-around w-[30%] items-center py-2 px-4'>
            <div className='rounded px-2 py-1 flex items-center border border-gray-100 bg-gray-100 shadow dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
              <RiSearchLine  className='mr-2 text-sm' />
              <input type="text" placeholder="Search..." className='w-[100%] text-[12px] focus:border-transparent outline-none hidden md:block' />
            </div>

            <div className='relative'>
                <span className='absolute dark:text-gray-500 top-0 right-0 bg-red-700 w-1.5 h-1.5 rounded-full'></span>
                <IoMdNotificationsOutline className='text-gray-700 dark:text-gray-500 cursor-pointer'/>
            </div>

            <div className='cursor-pointer text-gray-700 dark:text-gray-400 items-center' onClick={darkMode}>
                {isDark ? <IoSunnyOutline/> : <FiMoon/>}
            </div>

            <div className='bg-gradient-to-r from-blue-500 via-red-500  to-green-500 rounded-full w-7 h-7 cursor-pointer'>
                
            </div>
        </div>


       
    </div>
  )
}

export default Header