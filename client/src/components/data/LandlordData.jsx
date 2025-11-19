import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import {useState} from 'react'
import axios from 'axios'
import { IoIosArrowDown } from "react-icons/io";

function LandlordData({handleEdit, handleDelete, setDeleteModal, loading, landlord, next, previous, count, pageSize, currentPage, fetchData}) {
  const [showLandlord, setShowLandlord] = useState(false)

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex "> 
      <div className="flex flex-col w-[70%]">
        <table className="items-center  rounded-lg text-gray-700 dark:text-gray-400 text-left">
          <thead className="border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            <tr>
              <th><input type="checkbox" className="w-3 h-3 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-[rgba(255,255,255,0.09)]cursor-pointer" /></th>
              <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">First Name</th>
              <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Last Name</th>
              <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Phone</th>
              <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Operations</th>
            </tr>
          </thead>
          <tbody>
          {landlord.length > 0 ? ( 
          Array.isArray(landlord) && landlord.map((items, index) =>(
            <tr key={index} className="group hover:bg-white border-b dark:hover:bg-gray-800 cursor-pointer border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
              <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.first_name}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.last_name}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.phone_number}</td>
              <td className="py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <span className="flex">
                  <GoPencil onClick={() => handleEdit(items.id)} className="mx-2 text-[11px]"/>
                  <RiDeleteBin6Line onClick={() => setDeleteModal(items.id)} className="mx-2 text-[11px]"/>
                </span>
              </td>
            </tr>
          ))) : (
            <tr>
              <td colSpan='10' className="text-center text-gray-500 py-4">
                No records found
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <div className={`flex justify-center items-center gap-3 mt-4 ${landlord.length < 1 && 'hidden'}`}>
          <button onClick={() => fetchData(previous)} disable={!previous}
            className={`px-3 py-1 rounded ${
              previous ? "bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700"
              : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50"
            }`}>Prev</button>

          
          {Number.isFinite(count / pageSize) && count > 0 && (
            [...Array(Math.ceil(count/ pageSize))].map((_, index) => (
              <button key={index} onClick={() =>{fetchData(`http://localhost:8000/landlords/?page=${index + 1}`)}}
              className={`px-3 py-1 rounded bg-blue-50 text-[10px] ${currentPage === index + 1 ? 
                "text-black border border-blue-500 cursor-pointer dark:bg-blue-600"
                : "dark:bg-gray-800 cursor-pointer bg-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}>{index + 1}</button>
            ))
          )}

          <button onClick={() => fetchData(next)} disable={!next}
            className={`px-3 py-1 rounded ${
              next ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700'
              : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
            }`}>Next</button>
        </div>
      </div>

      <div className=" ml-2 rounded relative flex flex-1 px-3 py-1 bg-gray-100 dark:bg-gray-900" onClick={() => setShowLandlord(prev => !prev)}>
        <div className="flex cursor-pointer justify-between items-center px-2 py-1 text-gray-700 font-bold dark:text-gray-400 bg-gray-100 dark:bg-gray-900 shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] rounded flex-1 h-7">
          <button className="cursor-pointer">Choose Landlord</button>
          <IoIosArrowDown className={`${showLandlord ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`} />
        </div>

        {showLandlord && (
          landlord.map((items) => (
            <div className="absolute flex w-[90%]  flex-col shadow shadow-gray-200 dark:shadow-gray-800 border-b-3 border-blue-600 dark:border-blue-800 text-left cursor-pointer text-black px-1 py-1 gap-2  bg-gray-100 dark:bg-gray-900 dark:text-gray-400 top-9  rounded-2xl flex-1">
              <p className="hover:bg-gray-200 px-3 rounded dark:hover:bg-gray-800 py-1">HOME this is where the chart will be .. a pie chart of all the landlords and all their units</p>
              <p className="hover:bg-gray-200 px-3 rounded dark:hover:bg-gray-800 py-1">{items.first_name} {items.last_name}</p>
              <p className="hover:bg-gray-200 px-3 rounded dark:hover:bg-gray-800 py-1">{items.first_name} {items.last_name}</p>
              <p className="hover:bg-gray-200 px-3 rounded dark:hover:bg-gray-800 py-1">{items.first_name} {items.last_name}</p>
              <p className="hover:bg-gray-200 px-3 rounded dark:hover:bg-gray-800 py-1">{items.first_name} {items.last_name}</p>
              <p className="hover:bg-gray-200 px-3 rounded dark:hover:bg-gray-800 py-1">{items.first_name} {items.last_name}</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default LandlordData;
