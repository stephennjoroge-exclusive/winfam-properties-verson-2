import React from 'react'
import axios from 'axios'
import { IoMdClose } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import SingleTenantgraph from '../singletenant/SingleTenantgraph';
import {useEffect, useState} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import MessageFloat from './MessageFloat'

const SingleTenant = ({id, setInfoModal, tenants, setTenants}) => {
    const [tenantsStats, setTenantsStats] = useState({})
    const [dropdown, setDropdown] = useState(false)
    const [dropdownData, setDropdownData] = useState('')

    const handleInfoModal = async () => {
        try{
            axios.get(`http://localhost:8000/tenants/${id}/`)
            setInfoModal(prev => prev.filter(items => items.id !== id))
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
       const fetchData = async () => {
         try{
            fetch(`http://localhost:8000/tenants_stats/${id}/stats/`)
            .then(res => res.json())
            .then(data => {
                setTenantsStats(data[0])
            })
        } catch(error){
            console.log(error)
        }}

        fetchData();
    },[id])

    

  return (
    <div className='flex fixed items-center justify-end inset-0 bg-black/15 z-50'>
        <div className="bg-white relative dark:border dark:border-gray-700 shadow-2xl w-[60%] h-full text-gray-700 dark:bg-gray-900 text-[10px] dark:text-gray-400 p-3 rounded-lg ">
            <IoMdClose className='absolute top-0 m-2 text-sm right-0 cursor-pointer hover:text-red-500 hover:shadow hover:border rounded-full' onClick={() => setInfoModal(false)} />
            <p className='text-[15px] text-start font-serif font-bold'>Tenant's Information</p>
            <div className=' bg-gray-50 dark:bg-gray-900 dark:border-none border border-gray-200 px-3 py-1 flex mb-3'>
                {tenants.length > 0 ? (
                    Array.isArray(tenants) && tenants.filter(items => items.id === id).map((items, index) => (
                        <div className='flex w-full'>
                            <img src="images/profile.jpeg" alt="" className='mr-3 rounded-full w-[160px] h-[150px] mt-5'/>
                            <div className='flex-1 border-l-4 border-white dark:border-none pt-1 text-start p-5'>
                            <div className='flex justify-between'>
                                <p className='text-[18px] font-bold text-gray-700 dark:text-gray-400'>{items.first_name} {items.last_name || ''}</p>
                                <div className='cursor-pointer flex w-[40%] relative items-center border rounded border-gray-200 px-2' onClick={() => setDropdown(prev => !prev)}>
                                   <HiOutlineDocumentDuplicate className='mr-1'/>
                                    <div className='flex items-center mr-5 flex-1 w-full'>
                                        {dropdownData || 'More Actions'}
                                    </div>
                                    <IoIosArrowDown className={`${dropdown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                                    {dropdown && (
                                        <div className='absolute top-7 p-2 left-0 w-full bg-gray-50 shadow rounded border-b-3 border-blue-500'>
                                            <p className='px-3 py-1 hover:bg-gray-200 rounded'>Tenants Aggreement</p>
                                        </div>
                                    )}
                               </div>
                            </div>
                            <div className='flex justify-between'>
                               <div>
                                    <p className='text-gray-700 font-light text-[12px] dark:text-gray-400'>{items.property_detail?.landlord_detail?.first_name} {items.property_detail?.landlord_detail?.last_name}</p>
                                    <p className='text-gray-700 font-light text-[12px] dark:text-gray-400'>{items.unit_detail?.unit_number}</p>
                               </div>
                            </div>

                            <div className='mt-3 flex justify-around'>
                                <div className='flex mr-9'>
                                    <div className='mr-3'>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Unit Status: </p>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Rent Status: </p>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Id Number:</p>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Phone:</p>
                                    </div>
                                    <div className=''>
                                        <td className="py-1 text-[10px] px-2">
                                            <span className={`rounded font-bold
                                            ${items.payment_unit[0]?.rent_status === "vacant" ?  "bg-amber-50 dark:bg-transparent dark:hover:bg-transparent font-bold text-amber-500  dark:text-amber-600" : ""}
                                            ${items.payment_unit[0]?.rent_status === "overdue" ?"bg-red-50  dark:bg-transparent dark:hover:bg-transparent font-bold text-red-700  dark:text-red-600" : ""}
                                            ${items.payment_unit[0]?.rent_status === "paid" ?"bg-green-50 dark:bg-transparent dark:hover:bg-transparent font-bold text-green-500 dark:text-green-600" : ""}`}>
                                        {items.payment_unit[0]?.rent_status || 'N/A'} </span></td>
              
                                        <p className="py-1 text-[10px] px-2">
                                            <span className={`rounded font-bold
                                            ${items.unit_detail?.unit_status.toLowerCase() === "maintenance" ? "bg-amber-50 dark:bg-transparent dark:hover:bg-transparent font-bold text-amber-500  dark:text-amber-600" : ""}
                                            ${items.unit_detail?.unit_status.toLowerCase() === "vacant" ? "bg-red-50  dark:bg-transparent dark:hover:bg-transparent font-bold text-red-700  dark:text-red-600" : ""}
                                            ${items.unit_detail?.unit_status.toLowerCase() === "occupied" ? "bg-green-50 dark:bg-transparent dark:hover:bg-transparent font-bold text-green-500 dark:text-green-600" : ""}`}>
                                        {items.unit ? items.unit_detail.unit_status : ''}</span></p>
                                        <p className='text-gray-700 dark:text-gray-400 text-[10px] p-1 items-center'>{items.id_number}</p>
                                        <p className='text-gray-700 dark:text-gray-400 text-[10px] p-1 items-center'>{items.phone}</p>
                                    </div>
                                    <div className='z-50'>
                                        <MessageFloat/>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='mr-3'>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>No of payments done: </p>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Outstanding Balance:</p>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Missed Payment Months:</p>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] font-bold p-1'>Payment Frequency:</p>
                                    </div>
                                    <div className=''>
                                        <p className='text-gray-700 dark:text-gray-400  text-[10px] p-1'>{tenantsStats.total_payments}</p>
                                        <p className='text-gray-700 dark:text-gray-400 text-[10px] p-1'>Ksh {tenantsStats.total_rent_paid}</p>
                                        <p className='text-gray-700 dark:text-gray-400 text-[10px] p-1'>0</p>
                                        <p className='text-gray-700 dark:text-gray-400 text-[10px] p-1'><span className='flex font-bold items-center bg-green-50 dark:bg-transparent dark:text-green-600 text-green-500 py-1 rounded'>83% <FaArrowTrendUp className='ml-2'/></span></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    ))
                
                ): (
                    <p></p>
                )}
            </div>

            <div className="flex">
                <SingleTenantgraph/>
            </div>

            <div className=''>
               <div className='flex flex-col'>
                    <p className='text-start font-serif ml-3 font-bold text-[15px]'>Attachments</p>
                    <div className='flex justify-center items-center border border-gray-200 p-2'>
                        <img src="images/idCard.jpeg " className='w-full mr-2 h-[100px]' alt="" />
                        <img src="images/idCard.jpeg " className='w-full mr-2 h-[100px]' alt="" />
                        <img src="images/idCard.jpeg " className='w-full mr-2 h-[100px]' alt="" />
                        <img src="images/idCard.jpeg " className='w-full h-[100px]' alt="" />
                    </div>
               </div>
            </div>

            
        </div>
        
    </div>
  )
}

export default SingleTenant
