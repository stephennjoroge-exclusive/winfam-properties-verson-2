import {useEffect, useState} from 'react'
import useDynamicAPI from '../useDynamicAPI';

const RecentTenants = ({setInfoModal}) => {
    const [tenants , setTenants] = useState([]);
    const [loading, setLoading] = useState(false)
    const {getAPI} = useDynamicAPI();

  useEffect(() =>{
    getAPI('/tenants/')
      .then((response) =>{
        if(!response.ok){
          throw new Error('There was an error fetching the data')
        }
        return response.json()
      })
      .then((data) =>{
        setTenants(data.results || []);
        setLoading(false)
      })
      .catch((error) =>{
        console.log('There was an error fetching the data', error);
        setLoading(false)
      })
  },[])

  return (
    <div className='relative overflow-scroll'>

      <div className='absolute top-0 right-0 cursor-pointer'>
        <button className='bg-blue-600 cursor-pointer px-2 py-1 rounded text-white text-[10px]'>All Tenants</button>

      </div>
        <table className="min-w-full rounded-lg text-gray-700 dark:text-gray-400 text-left">
            <thead className="border-b text-[10px] border-gray-300 dark:border-[rgba(255,255,255,0.09)]">
                <tr>
                <th><input type="checkbox" className="w-3 h-3 bg-gray-100 border-b border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 cursor-pointer" /></th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Property</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Unit</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">First Name</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Last Name</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">ID Number</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Phone</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Move in Date</th>
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Unit Status</th>  
                <th className="py-2 px-2 border-b border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-[rgba(255,255,255,0.09)] font-bold">Rent Status</th> 
              
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
                    </td>
                </tr>
            ))): (
                <tr>
                <td colSpan='10' className="text-center text-[10px] text-gray-500 py-4">
                    No records found
                </td>
                </tr>
            )}
            </tbody>
        </table>

    </div>
  )
}

export default RecentTenants
