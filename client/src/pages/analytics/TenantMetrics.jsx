import React from 'react'
import AnalyticsHeader from './AnalyticsHeader'
import {useState, useEffect} from 'react'

const TenantMetrics = () => {
    const [tenants, setTenants] = useState(null)
    const [filterData, setFilterData] = useState({
        tenants_per_property : ''
    })

    useEffect(() => {
        fetch('http://localhost:8000/analytics/')
        .then(res => res.json())
        .then(data => {
            setTenants(data[0].tenants_in_each_property)
        })
        .then((error) => console.log(error))
    },[])
  return (
    <div>
        <AnalyticsHeader/>
        <div>
            <div className='flex justify-between p-2'>
                <div className='grid grid-cols-2'>
                    <div className='border border-gray-300 rounded px-2 py-1'>
                        <p className='font-bold text-[10px]'>No of tenants</p>
                        <div>
                            <p>{tenants && tenants.map((items) => (
                                <div className='text-start'>
                                    <p className='font-bold text-[10px] w-[200px] px-2 py-1'>{items?.landlord__first_name}
                                        : <span className='font-normal ml-3'>{items.tenant_count}</span> </p>
                                </div>
                            ))}</p>
                        </div>
                    </div>
                    <div>steve</div>
                    <div>steve</div>
                    <div>steve</div>
                </div>
                <div>
                    <p>This is where the graph goes</p>
                </div>
            </div>
        </div>

        <div>

        </div>
        
    </div>
  )
}

export default TenantMetrics











// import React from 'react'
// import {useEffect, useState} from 'react'
// import AnalyticsHeader from './TenantMetrics'

// const TenantMetrics = ({isDark}) => {
//     const [tenantData, setTenantData] = useState([])

//     useEffect(() => {
//         fetch('http://localhost:8000/analytics/')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (Array.isArray(data) && data.length > 0){
//                 setTenantData(data.occupied_units)
//             }
//         })
//         .then(error => console.log(error))
//     },[])

//     return (
//         <div>
//             <AnalyticsHeader/>
//             <div className='grid grid-cols-4'>
//                 <div className='border border-gray-300 rounded'>steve</div>
//                 <div>steve</div>
//                 <div>steve</div>
//                 <div>steve</div>
//             </div>
//         </div>
//     )
// }

// export default TenantMetrics
