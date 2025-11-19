
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { TbUserHexagon } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { MdPhonelink } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { PiHouseLineBold } from "react-icons/pi";
import { CgArrowAlignH } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

const Sidebar = ({isDark, setOpen, isOpen, setDropdownFinancials, dropdownFinancials }) => {

  function open(){
    setOpen(!isOpen)
  }

  function dropdownFinancialsFunc(){
    setDropdownFinancials(!dropdownFinancials)
  }


  return (
    <div className={`fixed top-0 left-0 z-50 h-full flex flex-col justify-between bg-gray-50 overflow-visible text-gray-700 ${isOpen ? 'w-[200px]' : 'w-[60px]'} ${isOpen ? 'shadow-2xl' : ''} p-4 dark:bg-gray-900 dark:text-gray-400 ${isDark ? 'dark' : ''} dark:border-r dark:border-[rgba(255,255,255,0.09)]`}>
      <div>
        <IoMdClose className={`top-0 text right-0 m-2  hover:bg-white hover:shadow shadow-gray-400 dark:hover:shadow-none cursor-pointer hover:text-red-600 absolute text-black dark:text-gray-400 rounded-full ${!isOpen && 'hidden'} `} onClick={open}/>

        <header className={`flex relative justify-centers`}>
          <img src="/images/winfam.png" alt="" className={`h-15  w-15 flex items-center ${!isOpen && 'hidden'}`}/>
          <div className='flex flex-col items-center'>
              <p className={`items-center font-bold font-serif mt-3 ${!isOpen && 'hidden'}`}>Winfam</p>
              <p className={`text-[10px] font-serif items-center ${!isOpen && 'hidden'}`}>Properties</p>
          </div>
        </header>

          <div className={`flex justify-center items-center ${isOpen ? "w-full" : "w-full h-16"}`}>
            <img 
              src='/images/winfampic.png' 
              alt="Winfam Logo" 
              className={`w-20 h-20 object-cover dark:invert ${isOpen ? 'hidden' : ''}`}
            />
          </div>
        
        <div className='relative group'>
          <Link to='/dashboard' onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <RxDashboard className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400 group-hover:text-blue-700  text-gray-800 text-sm dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`}/>
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400 text-gray-700 text-[10px] group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Dashboard
            </p>

          </Link>

         {!isOpen && (
          <span className='absolute bg-gray-800 text-white hover:opacity-0 text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] opacity-0 group-hover:opacity-100'>
            Dashboard
          </span>
         )}
        </div>


        <div className='relative group'>
          <Link to="/landlords"  onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <TbUserHexagon className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400  group-hover:text-blue-600 text-gray-600 dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`}/>
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 text-gray-700 text-[10px] dark:group-hover:text-gray-400 group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Landlords
            </p>

          </Link>

          {!isOpen && (
          <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
            Landlords
          </span>
         )}

        </div>
        
        
        <div className='relative group'>
          <Link to="/property" onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <HiOutlineBuildingOffice2 className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400  group-hover:text-blue-600 text-gray-700 dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 text-gray-700 text-[10px] dark:group-hover:text-gray-400 group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Properties
            </p>

          </Link>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Properties
            </span>
          )}
        </div>
       
        <div className='relative group'>
          <Link to="/units" onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <PiHouseLineBold className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400  group-hover:text-blue-600 text-gray-600 dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 text-gray-700 text-[10px] dark:group-hover:text-gray-400 group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Units
            </p>

          </Link>
          {!isOpen && (
          <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
            Units
          </span>
          )}
      </div>
       
        <div className='relative group'>
          <Link to="/tenants" onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <CgProfile className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400  group-hover:text-blue-700 text-gray-700 text-sm dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 text-gray-700 text-[10px] dark:group-hover:text-gray-400 group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Tenants
            </p>

          </Link>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Tenants
            </span>
          )}
        </div>
       
        <div className='relative group'>
          <div className={`group flex justify-between  items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-2 justify-center'} `} onClick={dropdownFinancialsFunc}>
            <div className='flex justify-between w-full items-center'>
              <div className='flex items-center'>
                <FaRegMoneyBillAlt className = {` cursor-pointer group-hover:text-blue-700 dark:group-hover:text-gray-400 dark:group-hover:bg-gray-800 text-gray-700 text-sm dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} onClick={open}/>
                <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 group-hover:text-blue-700 dark:group-hover:text-gray-400 text-gray-700 text-[10px] dark:text-gray-400 ${!isOpen && 'hidden'} `}>
                  Financials
                </p>
              </div>
                <IoIosArrowDown className={`${dropdownFinancials ? 'rotate-180' : 'rotate-0'} duration-200 text-[10px] ${!isOpen && 'hidden'}`}/>
              </div>

            </div>

            {dropdownFinancials && (
              <div className={`py-1 flex flex-col p-2 text-[12px] ${!isOpen && 'hidden'}`}>
                <Link to='/payments' onClick={() => setOpen(false)} href="#" className='mx-2 px-4 py-1 text-[10px] border-l-2 border-transparent  hover:border-blue-800 hover:border-l-2 hover:bg-blue-50 rounded ml-4 dark:hover:bg-gray-800'>Payments</Link>
                <Link to='/expenses' onClick={() => setOpen(false)} href="#" className='mx-2 px-4 py-1 text-[10px] border-l-2 border-transparent  hover:border-blue-800 hover:border-l-2 hover:bg-blue-50 rounded ml-4 dark:hover:bg-gray-800'>Expenses</Link>
                <Link to='/utilities' onClick={() => setOpen(false)} href="#" className='mx-2 px-4 py-1 text-[10px] border-l-2 border-transparent  hover:border-blue-800 hover:border-l-2 hover:bg-blue-50 rounded ml-4 dark:hover:bg-gray-800'>Utilities</Link>
              </div>

            )}
            {!isOpen && (
              <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
                Financials
              </span>
            )}
        </div>


        <div className='relative group'>
          <Link to="/analytics"  onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <TbReportSearch className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400  group-hover:text-blue-700 text-gray-700 text-sm dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 text-gray-700 text-[10px] dark:group-hover:text-gray-400 group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Analytics
            </p>

          </Link>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Analytics
            </span>
          )}
        </div>

        
        <div className='relative group'>
          <Link to="/tenants" onClick={() => setOpen(false)} className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <MdPhonelink className = {` cursor-pointer dark:group-hover:bg-gray-800 dark:group-hover:text-gray-400  group-hover:text-blue-700 text-gray-700 text-sm dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 text-gray-700 text-[10px] dark:group-hover:text-gray-400 group-hover:text-blue-700 dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Communication
            </p>

          </Link>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Communication
            </span>
          )}
        </div>
        
      </div>

      <div className='mb-6'>
        <div className='relative group'>
          <div className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <CgArrowAlignH className = {` cursor-pointer group-hover:text-blue-700 dark:group-hover:text-gray-400 dark:group-hover:bg-gray-800 text-gray-600 text-[20px] dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} onClick={open} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 group-hover:text-blue-700 dark:group-hover:text-gray-400 text-gray-700 text-[10px] dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Expand
            </p>

          </div>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Expand
            </span>
          )}
        </div>

        <div className='relative group'>
          <div className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <LuSettings className = {` cursor-pointer group-hover:text-blue-700 dark:group-hover:text-gray-400 dark:group-hover:bg-gray-800 text-gray-700 text-sm dark:bg-gray-900 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 group-hover:text-blue-700 dark:group-hover:text-gray-400 text-gray-700 text-[10px] dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Setting
            </p>
          </div>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Setting
            </span>
          )}
        </div>

        <div className='relative group'>
          <div className={`group flex items-center hover:bg-white hover:shadow shadow-gray-300 dark:hover:shadow-none cursor-pointer text-gray-700 dark:hover:bg-gray-800 py-1 rounded-md dark:hover:text-gray-300 mt-2 ${isOpen ? 'px-2 justify-start' : 'px-1 justify-center'}`}>
            <MdLogout className = {` cursor-pointer rotate-180 group-hover:text-red-700 dark:group-hover:text-gray-400 dark:group-hover:bg-gray-800 text-gray-700 text-[15px] dark:bg-gray-900 mr-1 dark:text-gray-400 ${isOpen && 'mr-2'}`} />
            <p className={`cursor-pointer dark:bg-gray-900 dark:group-hover:bg-gray-800 group-hover:text-red-700 dark:group-hover:text-gray-400 text-gray-700 text-[10px] dark:text-gray-400 ${!isOpen && 'hidden'} `}>
              Logout
            </p>
          </div>
          {!isOpen && (
            <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
              Logout
            </span>
          )}
        </div>

      </div>
      
    </div>


  )
}

export default Sidebar
