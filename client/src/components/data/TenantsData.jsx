import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";

function TenantsData({loading, tenants,handleDelete, setInfoModal, handleEdit, next, previous, count, pageSize,currentPage, fetchData}) {

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <table className="min-w-full rounded-lg text-gray-700 dark:text-gray-400 text-left">
        <thead className="border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
          <tr>
            <th><input type="checkbox" className="w-3 h-3 bg-gray-100 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
             <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">
              <span className="flex">
                <p>Property</p>
                <FaPlus className="ml-2 mt-0.5 cursor-pointer"/>
              </span>
            </th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">
              <span className="flex">
                <p>Unit</p>
                <FaPlus className="ml-2 mt-0.5 cursor-pointer"/>
              </span>
            </th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">First Name</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Last Name</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">ID Number</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Phone</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Move in Date</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Unit Status</th>  
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Rent Status</th> 
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Operations</th>
          </tr>
        </thead>
        <tbody>
        {tenants.length > 0 ? ( 
          Array.isArray(tenants) && tenants.map((items, index) =>(
            <tr key={index} className="hover:bg-white border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)] dark:hover:bg-gray-800 cursor-pointer">
              <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.property_detail?.landlord_detail?.first_name} {items.property_detail?.landlord_detail?.last_name}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.unit_detail?.unit_number}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.first_name}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.last_name}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.id_number}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.phone}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.move_in_date}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <span className={`px-2 py-[2px] border-b rounded font-bold
                  ${items.unit_detail?.unit_status.toLowerCase() === "maintenance" ? "bg-amber-50 border  border-amber-100 dark:bg-transparent dark:hover:bg-transparent dark:border-none font-bold dark:text-amber-700 text-amber-500" : ""}
                  ${items.unit_detail?.unit_status.toLowerCase() === "vacant" ? "bg-red-50 border  border-red-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none dark:text-red-700 font-bold text-red-700" : ""}
                  ${items.unit_detail?.unit_status.toLowerCase() === "occupied" ? "bg-green-50 border  border-green-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none font-bold text-green-500 dark:text-green-600" : ""}`}>
              {items.unit ? items.unit_detail.unit_status : ''}</span></td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-gray-700">
                <span className={`px-2 py-[2px] border-b rounded font-bold
                  ${items.payment_unit[0]?.rent_status === "vacant" ? "bg-amber-50 border border-amber-100 dark:bg-transparent dark:hover:bg-transparent dark:border-none font-bold dark:text-amber-700 text-amber-500" : ""}
                  ${items.payment_unit[0]?.rent_status === "overdue" ? "bg-red-50 border border-red-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none dark:text-red-700 font-bold text-red-700" : ""}
                  ${items.payment_unit[0]?.rent_status === "paid" ? "bg-green-50 border border-green-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none font-bold text-green-500 dark:text-green-600" : ""}`}>
              {items.payment_unit[0]?.rent_status || 'N/A'} </span></td>
              
              <td className="py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <span className="flex">
                  <GoPencil onClick={() => handleEdit(items.id)} className="mx-2 text-[11px]"/>
                  <RiDeleteBin6Line onClick={() => handleDelete(items.id)} className="mx-2 text-[11px]"/>
                  <LuArrowRight onClick={() => {setInfoModal(items.id)}} className="mx-2 text-[11px]"/>
                </span>
              </td>
            </tr>
        ))): (
          <tr>
            <td colSpan='10' className="text-center text-gray-500 py-4">
              No records found
            </td>
          </tr>
        )}
        </tbody>
      </table>
      <div className={`flex relative justify-center items-center gap-3 mt-4 ${tenants.length < 1 && 'hidden'}`}>
        <button onClick={() => fetchData(previous)} disabled={!previous}
          className={`px-3 py-1 rounded ${
            previous ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700 '
            : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
          }`}> Prev

        </button>

        {Number.isFinite(Number(count) / pageSize) && count > 0 && (
          [...Array(Math.ceil(count / pageSize))].map((_, index) => (
            <button key={index} onClick={() => {fetchData(`http://localhost:8000/tenants/?page=${index + 1}`)}}
            className={`px-3 py-1 rounded bg-blue-50 text-[10px] ${currentPage === index + 1 ? 
              'text-black border border-blue-500 cursor-pointer dark:bg-blue-600'
              : 'dark:bg-gray-800 cursor-pointer bg-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'
            }`}>{index + 1} </button>
          ))
        )}

        <button onClick={() => fetchData(next)} disabled={!next}
          className={`px-3 py-1 rounded ${
            next ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700 '
            : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
          }`}> Next

        </button>
      </div>

      
    </div>
  );
}

export default TenantsData;
