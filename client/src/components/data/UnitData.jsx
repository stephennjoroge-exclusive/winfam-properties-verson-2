import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";

function UnitData({handleEdit, handleDelete, loading, unit, next, previous, count, pageSize, currentPage, fetchData}) {

  const UNIT_TYPE_LABELS = {
    single: 'Single',
    double_room: 'Double Room',
    bedsitter: 'Bedsitter',
    one_bedroom: 'One Bedroom',
    two_bedroom: 'Two Bedroom',
  };

const UNIT_BUILD_LABELS = {
    mabati: 'Mabati',
    block: 'Block', 
  };

const UNIT_STATUS_LABELS = {
    vacant: 'Vacant',
    occupied: 'Occupied',
    maintenance: 'Maintenance',
  };


  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      <table className="min-w-full rounded-lg text-gray-700 dark:text-gray-400 text-left">
        <thead className="border-b border-gray-300 bg-gray-50 dark:border-[rgba(255,255,255,0.09)] dark:bg-gray-900">
          <tr>
            <th><input type="checkbox" className="w-3 h-3 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">
              <span className="flex">
                <p>Property</p>
                <FaPlus className="ml-2 mt-0.5 cursor-pointer"/>
              </span>
            </th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Unit</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Unit Type</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Unit Build</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Rent Amount</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Deposit</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Unit Status</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Rent Status</th>
            <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-extrabold">Operations</th>
          </tr>
        </thead>
        <tbody>
        {unit.length > 0 ? (
        Array.isArray(unit) && unit.map((items, index) =>(
          <tr key={index} className="group hover:bg-white border-b dark:hover:bg-gray-800 cursor-pointer border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
            <td><input type="checkbox" className="w-3 h-3 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer"/></td>
            <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.property_detail?.landlord_detail?.first_name} {items.property_detail?.landlord_detail?.last_name}</td>
            <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.unit_number}</td>
            <td className={`py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]`}>
              <span className={`px-2 py-[2px] rounded font-bold flex items-center gap-1`}>
                  {items.unit_type === 'bedsitter' && (
                  <GoDotFill className="text-cyan-500 dark:text-cyan-600"/>
                )}
                {items.unit_type === 'double_room' && (
                  <GoDotFill className="text-purple-500 dark:text-purple-600"/>
                )}
                {items.unit_type === 'shop' && (
                  <GoDotFill className="text-blue-500 dark:text-blue-600"/>
                )}
                {items.unit_type === 'single' && (
                  <GoDotFill className="text-stone-500 dark:text-stone-600"/>
                )}
                {items.unit_type === 'one_bedroom' && (
                  <GoDotFill className="text-slate-500 dark:text-slate-600"/>
                )}
                {items.unit_type === 'two_bedroom' && (
                  <GoDotFill className="text-blue-500 dark:text-blue-600"/>
                )}
            {UNIT_TYPE_LABELS[items.unit_type] || items.unit_type}</span></td>
            <td className={`py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]`}>
              <span className={`px-2 py-[2px] rounded font-bold flex items-center gap-1`}>
                  {items.unit_build === 'mabati' && (
                  <GoDotFill className="text-amber-500 dark:text-amber-600"/>
                )}
                {items.unit_build === 'block' && (
                  <GoDotFill className="text-sky-500 dark:text-sky-600"/>
                )}
            {UNIT_BUILD_LABELS[items.unit_build] || items.unit_build}</span></td>
            <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.rent_amount}</td>
            <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">{items.payment_unit[0]?.deposit || 'N/A'}</td>
            <td className={`py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]`}>
                <span className={`flex px-2 py-[2px] rounded font-bold items-center gap-1`}>
                {items.unit_status.toLowerCase() === 'occupied' && (
                  <GoDotFill className="text-green-500 dark:text-green-600"/>
                )}
                {items.unit_status.toLowerCase() === 'maintenance' && (
                  <GoDotFill className="text-red-500 dark:text-red-600"/>
                )}
                {items.unit_status.toLowerCase() === 'vacant' && (
                  <GoDotFill className="text-amber-500 dark:text-amber-600"/>
                )}
            {UNIT_STATUS_LABELS[items.unit_status] || items.unit_status}</span></td>
            <td className="py-1 text-[10px] px-2 border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <span className={` px-2 py-[2px] border-b rounded font-bold
                ${items.payment_unit[0]?.rent_status === "vacant" ? "bg-amber-50 border  border-amber-100 dark:bg-transparent dark:hover:bg-transparent dark:border-none font-bold dark:text-amber-700 text-amber-500" : ""}
                ${items.payment_unit[0]?.rent_status === "overdue" ? "bg-red-50 border  border-red-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none dark:text-red-700 font-bold text-red-700" : ""}
                ${items.payment_unit[0]?.rent_status === "paid" ? "bg-green-50 border  border-green-100 dark:bg-transparent dark:border-none dark:hover:bg-transparent dark:hover:border-none font-bold text-green-500 dark:text-green-600" : ""}        
              `}>
            {items.payment_unit[0]?.rent_status || 'N/A'}</span></td>
            <td className="py-1 text-[10px] border-b border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
              <span className="flex">
                <GoPencil onClick={() => handleEdit(items.id)} className="mx-2 text-[11px]"/>
                <RiDeleteBin6Line onClick={() => handleDelete(items.id)} className="mx-2 text-[11px]"/>
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
       <div className={`flex relative justify-center items-center gap-3 mt-4 ${unit.length < 1 && 'hidden'}`}>
        <button
          onClick={() => fetchData(previous)}
          disabled={!previous}
          className={`px-3 py-1 rounded ${
            previous
              ? "bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700"
              : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50"
          }`}
        >
          Prev
        </button>

        
          {Number.isFinite(count / pageSize) && count > 0 && (
            [...Array(Math.ceil(count/ pageSize))].map((_, index) => (
              <button key={index} onClick={() =>{fetchData(`http://localhost:8000/units/?page=${index + 1}`)}}
              className={`px-3 py-1 rounded bg-blue-50 text-[10px] ${currentPage === index + 1 ? 
                "text-black border border-blue-500 cursor-pointer dark:bg-blue-600"
                : "dark:bg-gray-800 cursor-pointer bg-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}>{index + 1}</button>
            ))
          )}

        <button
          onClick={() => fetchData(next)}
          disabled={!next}
          className={`px-3 py-1 rounded ${
            next
              ? "bg-blue-600 text-white cursor-pointer dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700"
              : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50"
          }`}
        >
          Next
        </button>
      </div>

    </div>
    
  );

  
}

export default UnitData;
