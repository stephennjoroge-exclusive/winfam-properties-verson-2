import React from 'react'
import {useState, useEffect} from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export default function Cards({isDark}) {
   const [totalRent, setTotalRent] = useState(null)
   const [numOfLandlords, setNumOfLandlords] = useState(null)
   const [numOfTenants, setNumofTenants] = useState(null)

    const fetchData = async () => {
        try {
        const response = await getAPI("/dashboard/");

        setTotalRent(response.total_rent);
        setNumOfLandlords(response.No_of_landlords);
        setNumOfTenants(response.No_of_Tenants);
        } catch (error) {
        console.error("Dashboard fetch error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
     
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>

        <div className={`flex justify-around relative shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] p-2 rounded ${isDark ? 'dark' : ''}`}>
            <div className='flex flex-col'>
                <p className='text-[10px] text-start font-bold'>Total rent collected</p>
                <div className='flex items-center mr-3 mt-3'>
                    <p className='text-2xl text-start font-bold text-gray-700'><span className='text-[10px] font-light'>Ksh </span>{totalRent}</p>
                    <span className='flex absolute top-0 right-0 items-center dark:bg-gray-900 bg-green-50 text-green-500 rounded px-2 py-1'>
                        <p className='text-[10px] mr-1 font-bold'>34%</p>
                        <FaArrowTrendUp className='text-[10px]'/>
                    </span>
                </div>
                <div>
                    <p className='text-[10px] font-light mt-3 text-start'>Compared to last month</p>
                </div>
                
            </div>
            <div className='flex items-center justify-between text-6xl'>
                <FaRegMoneyBillAlt className='opacity-20 text-green-700'/>
            </div>
        </div>

        
        <div className='flex justify-around relative shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] p-2 rounded'>
            <div className='flex flex-col'>
                <p className='text-[10px] text-start font-bold'>Total monthly rent </p>
                <div className='flex items-center mr-3 mt-3'>
                    <p className='text-2xl text-start font-bold text-gray-700'><span className='text-[10px] font-light'>Ksh </span>{totalRent}</p>
                    <span className='flex absolute top-0 right-0 items-center dark:bg-gray-900 bg-green-50 text-green-500 rounded px-2 py-1'>
                        <p className='text-[10px] mr-1 font-bold'>34%</p>
                        <FaArrowTrendUp className='text-[10px]'/>
                    </span>
                </div>
                <div>
                    <p className='text-[10px] font-light mt-3 text-start'>Compared to last month</p>
                </div>
                
            </div>
            <div className='flex items-center justify-between text-6xl'>
                <FaRegMoneyBillAlt className='opacity-20 text-amber-700'/>
            </div>
        </div>

        <div className='flex justify-around relative shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] p-2 rounded'>
            <div className='flex flex-col'>
                <p className='text-[10px] text-start font-bold'>Total Number Tenants </p>
                <div className='flex items-center mr-3 mt-3'>
                    <p className='text-2xl text-start font-bold text-gray-700'><span className='text-[10px] font-light'></span>{numOfTenants}</p>
                    <span className='flex absolute top-0 right-0 items-center dark:bg-gray-900 bg-red-50 text-red-500 rounded px-2 py-1'>
                        <p className='text-[10px] mr-1 font-bold'>34%</p>
                        <FaArrowTrendUp className='text-[10px]'/>
                    </span>
                </div>
                <div>
                    <p className='text-[10px] font-light mt-3 text-start'>Compared to last month</p>
                </div>
                
            </div>
            <div className='flex items-center justify-between text-6xl'>
                <FaRegMoneyBillAlt className='opacity-20 text-blue-700'/>
            </div>
        </div>


        <div className='flex justify-around relative shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] p-2 rounded'>
            <div className='flex flex-col'>
                <p className='text-[10px] text-start font-bold'>No of Landlords</p>
                <div className='flex items-center mr-3 mt-3'>
                    <p className='text-2xl text-start font-bold text-gray-700'><span className='text-[10px] font-light'></span>{numOfLandlords}</p>
                    <span className='flex absolute top-0 right-0 items-center dark:bg-gray-900 bg-red-50 text-red-500 rounded px-2 py-1'>
                        <p className='text-[10px] mr-1 font-bold'>34%</p>
                        <FaArrowTrendUp className='text-[10px]'/>
                    </span>
                </div>
                <div>
                    <p className='text-[10px] font-light mt-3 text-start'>Compared to last month</p>
                </div>
                
            </div>
            <div className='flex items-center justify-between text-6xl'>
                <FaRegMoneyBillAlt className='opacity-20 text-slate-700'/>
            </div>
        </div>      
       
    </div>
  )
}

