import React, { useEffect, useState } from "react";

function ExpensesData({loading, expenses, handleDelete, handleEdit}) {

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <table className="w-[80%] rounded-lg text-gray-700 dark:text-gray-400 text-left">
        <thead className="border-b border-gray-300 bg-gray-50 dark:border-[rgba(255,255,255,0.09)] dark:bg-gray-900">
          <tr>
            <th><input type="checkbox" className="w-3 h-3 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Property</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Unit</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Name</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Cost</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Description</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Date</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Operations</th>

          </tr>
        </thead>
        <tbody>
        {expenses.map((items, index) =>(
              <tr key={index} className="group hover:bg-white border-b dark:hover:bg-gray-800 cursor-pointer border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.property_detail?.landlord_detail?.first_name || ''} {items.property_detail?.landlord_detail?.last_name || ''}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.unit_detail?.unit_number || ''}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.expense_name}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.cost}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.description}</td>
                <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.date}</td>
                <td className="py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                  <span className="flex">
                    <GoPencil onClick={() => handleEdit(items.id)} className="mx-2 text-[11px]"/>
                    <RiDeleteBin6Line onClick={() => handleDelete(items.id)} className="mx-2 text-[11px]"/>
                  </span>
                </td>
              </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpensesData;
