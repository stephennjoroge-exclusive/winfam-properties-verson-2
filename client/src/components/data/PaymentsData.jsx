import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

function PaymentsData({payments, handleEdit, handleDelete, loading, count, next, previous, currentPage, fetchData, pageSize}) {
  const [addProperty, setAddProperty] = useState(false)

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <table className="min-w-full rounded-lg text-gray-700 dark:text-gray-400 text-left">
        <thead className="border-b border-gray-300 bg-gray-50 dark:border-[rgba(255,255,255,0.09)] dark:bg-gray-900">
          <tr>
            <th><input type="checkbox" className="w-3 h-3 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
            <th className="py-2  px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">
              <span className="flex relative" onClick={() => setAddProperty(prev => !prev)}>
                <p>Property</p> 
                <FaPlus className={`ml-2 mt-0.5 cursor-pointer ${addProperty ? 'rotate-180 duration-300': 'rotate-0 duration-300'}`}/>
                
                
                {!addProperty && (
                  <span className='absolute bg-gray-800 text-white text-[10px] left-full ml-2 top-1/2 -translate-y-1/2  px-2 py-1 rounded z-[500] hover:opacity-0 opacity-0 group-hover:opacity-100'>
                    Add Properties
                  </span>
                )}
              </span>
            </th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">
              <span className="flex">
                <p>Unit</p>
                 <FaPlus className="ml-2 mt-0.5 cursor-pointer"/>
              </span>
            </th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Tenants</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Rent Payable</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Rent Paid</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Payment Method</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Balance {'(B/F)'}</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Balance {'(C/F)'}</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Unit Status</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Rent Status</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Date</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Operations</th>

          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            Array.isArray(payments) && payments.map((items, index) =>(
              <tr key={index} className="group hover:bg-white border-b dark:hover:bg-gray-800 cursor-pointer border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.property ? `${items.property_detail.landlord_detail.first_name} ${items.property_detail.landlord_detail.last_name}` : ''}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.unit_detail? `${items.unit_detail.unit_number}`: ''}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.tenant ? `${items.tenant_detail.first_name} ${items.tenant_detail.last_name}`: ''}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.rent_payable}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.rent}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                  <span className={` px-2 py-[2px] border-b rounded font-bold
                    ${items.payment_method === "mpesa" ? "bg-green-50 border  border-green-100 dark:bg-transparent dark:hover:bg-transparent dark:border-none font-bold dark:text-green-600 text-green-500" : ""}
                    ${items.payment_method === "equity" ? "bg-amber-50 border border-amber-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none dark:text-amber-600 font-bold text-amber-700" : ""}
                    ${items.payment_method === "cash" ? "bg-blue-50 border  border-blue-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none font-bold text-blue-500" : ""}        
                  `}>
                {items.payment_method}</span></td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{Number(items.balance_brought_forward ?? 0).toFixed(2)}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{Number(items.balance_carry_forward ?? 0).toFixed(2)}</td>
               <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                  <span className={`
                    px-2 py-[2px] border rounded font-bold
                    ${items.tenant_detail?.unit_detail?.unit_status === "maintenance" ? "bg-amber-50 border border-amber-100 dark:bg-transparent dark:border-none font-bold dark:text-amber-700 text-amber-500" : ""}
                    ${items.tenant_detail?.unit_detail?.unit_status === "vacant" ? "bg-red-50 border border-red-100 dark:bg-transparent dark:border-none dark:text-red-700 font-bold text-red-700" : ""}
                    ${items.tenant_detail?.unit_detail?.unit_status === "occupied" ? "bg-green-50 border border-green-100 dark:bg-transparent dark:border-none font-bold text-green-500 dark:text-green-600" : ""}
                  `}>
                    {items.tenant_detail?.unit_detail?.unit_status || ""}
                  </span>
                </td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                  <span className={` px-2 py-[2px] border-b rounded font-bold
                    ${items.rent_status === "vacant" ? "bg-amber-50 border  border-amber-100 dark:bg-transparent dark:hover:bg-transparent dark:border-none font-bold dark:text-amber-700 text-amber-500" : ""}
                    ${items.rent_status === "overdue" ? "bg-red-50 border  border-red-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none dark:text-red-700 font-bold text-red-700" : ""}
                    ${items.rent_status === "paid" ? "bg-green-50 border  border-green-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none font-bold text-green-500 dark:text-green-600" : ""}        
                  `}> {items.rent_status}</span></td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.date_issued}</td>
                <td className="py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                  <span className="flex">
                    <GoPencil onClick={() => handleEdit(items.id)} className="mx-2 text-[11px]"/>
                    <RiDeleteBin6Line onClick={() => handleDelete(items.id)} className="mx-2 text-[11px]"/>
                  </span>
                </td>
              </tr>
            ))

          ):(
            <tr>
              <td colSpan='10' className="text-center text-gray-500 py-4">
                No records found
              </td>
            </tr>
          )}
        
        </tbody>
      </table>
      <div className={`flex relative justify-center items-center gap-3 mt-4 ${payments.length < 1 && 'hidden'}`}>
          <button onClick={() => {fetchData(previous)}} disabled={!previous} 
            className={`px-3 py-1 rounded ${
              previous ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700'
              : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
            }`}>Prev </button>

          {Number.isFinite(count / pageSize) && count > 0 && (
            [...Array(Math.ceil(Number(count) / pageSize))].map((_, index) =>(
              <button key={index} onClick={() => fetchData(`http://localhost:8000/payments/?page=${index + 1}`)}
              className={`px-3 py-1 rounded bg-blur-50 text-[10px] ${currentPage === index + 1 
                ? 'text-black border border-blue-500 cursor-pointer dark:bg-blue-600'
                : 'dark:bg-gray-800 cursor-pointer bg-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'
              }`}>{index + 1}</button>
            ))
          )}

          <button onClick={() => {fetchData(next)}} disabled={!next} 
            className={`px-3 py-1 rounded ${
              next ? 'bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700'
              : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
            }`}>Next </button>
      </div>
    </div>
  );
}

export default PaymentsData;
