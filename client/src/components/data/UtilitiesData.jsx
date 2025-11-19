import React, { useEffect, useState } from "react";

function UtilitiesData({loading, utilities, pageSize, count, currentPage, previous, next, fetchData, handleDelete, handleEdit }) {

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <table className="w-[89%] rounded-lg text-gray-700 dark:text-gray-400 text-left">
        <thead className="border-b border-gray-300 bg-gray-50 dark:border-[rgba(255,255,255,0.09)] dark:bg-gray-900">
          <tr>
            <th><input type="checkbox" className="w-3 h-3 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Property</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Unit</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Item</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Previous Reading</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Current Reading</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Date</th>
          </tr>
        </thead>
        <tbody>
        {utilities.length > 0 ? (
          Array.isArray(utilities) && utilities.map((items, index) =>(
            <tr key={index} className="group hover:bg-white border-b dark:hover:bg-gray-800 cursor-pointer border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
              <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.property_detail?.landlord_detail?.first_name}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.unit_detail?.unit_number}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.item}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.previous_reading}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.current_reading}</td>
              <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.date}</td>
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
    </div>
  );
}

export default UtilitiesData;
