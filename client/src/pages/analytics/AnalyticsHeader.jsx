import React from 'react'
import {useEffect, useState} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import TenantGraphs from './TenantGraphs';
import {Link} from 'react-router-dom'



const AnalyticsHeader = () => {
    
    const [openDropdown, setOpenDropdown] = useState(false)
    const [dropdownSelect, setDropdownSelect] = useState('')

  return (
   <div className='bg-gray-50 rounded flex justify-between pr-3 pl-3 h-[50px] items-center'>
        <p className='text-2xl font-bold text-gray-700'>Analytics</p>
        <div className='flex relative items-center h-[30px] border rounded border-gray-300 px-3 py-1 cursor-pointer' onClick={() => setOpenDropdown(prev => !prev)}>
            <HiOutlineDocumentDuplicate className='mr-1 text-gray-700'/>
            <div className='flex items-center mr-5 flex-1 w-full text-[12px]'>
                {dropdownSelect || 'Select Metric'}
            </div>
            <IoIosArrowDown className={`${openDropdown ? 'rotate-180 duration-300': 'rotate-0 duration-300'} text-[12px] text-gray-700 `}/>

            {openDropdown && (
                <div className='dropdown-list px-2 py-1 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-8 left-0 right-0 rounded bg-gray-100'>
                    <Link to='/tenantMetrics'>
                      <p>Tenants</p>
                    </Link>
                    <Link to='/propertyMetrics'>
                      <p>Property</p>                    
                    </Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default AnalyticsHeader
