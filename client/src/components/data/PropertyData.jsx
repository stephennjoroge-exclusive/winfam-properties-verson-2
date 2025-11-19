import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios'

function PropertyData({property, loading, handleEdit, handleDelete, fetchData, next, previous, currentPage, pageSize, count}) {


  if (loading) return <p>Loading...</p>

  return (
    <div className="">
      <table className="w-[80%] rounded-lg text-gray-700 dark:text-gray-400 text-left">
        <thead className="border-b border-gray-300  bg-gray-50 dark:border-[rgba(255,255,255,0.09)] dark:bg-gray-900">
          <tr>
            <th><input type="checkbox" className="w-3 h-3 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Landlord</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Location</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">No of Units</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Operations</th>
  
          </tr>
        </thead>
        <tbody>
          {property.length > 0 ? (
            Array.isArray(property) && property.map((items, index) =>(
              <tr key={index} className="group hover:bg-white border-b dark:hover:bg-gray-800 cursor-pointer border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.landlord && `${items.landlord_detail.first_name} ${items.landlord_detail.last_name}`}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.location}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.total_units}</td>
                <td className="py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                  <span className="flex">
                    <GoPencil onClick={() => handleEdit(items.id)} className="mx-2 text-[11px]"/>
                    <RiDeleteBin6Line onClick={() => handleDelete(items.id)} className="mx-2 text-[11px]"/>
                  </span>
                </td>
              </tr>
            ))):(
                <tr>
                  <td colSpan='10' className="text-center text-gray-500 py-4">
                    No records found
                  </td>
                </tr>
            )}
        </tbody>
      </table>
      <div className={`flex relative justify-center items-center gap-3 mt-4 ${property.length < 1 && 'hidden'}`}>
        <button onClick={() => fetchData(previous)} disabled={!previous}
          className={`px-3 py-1 rounded ${
            previous ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700'
            : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
          }`}>Prev</button>

        {Number.isFinite(count / pageSize) && count > 0 && (
          [...Array(Math.ceil(Number(count) / pageSize))].map((_, index) => (
            <button key={index} onClick={() => fetchData(`http://localhost:8000/property/?page=${index + 1}`)} 
              className={`px-3 py-1 rounded bg-blue-50 text-[10px] ${currentPage === index + 1 ? 
              'text-black border border-blue-500 cursor-pointer dark:bg-blue-600'
              : 'dark:bg-gray-800 cursor-pointer bg-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'
            }`}>{index + 1}</button>
          ))
        )}

        <button onClick={() => fetchData(next)} disabled={!next}
          className={`px-3 py-1 rounded ${
            next ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700'
            : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
          }`}>Next</button>

      </div>
    </div>
  );
}

export default PropertyData;
