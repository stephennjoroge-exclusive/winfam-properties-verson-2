import React from 'react'
import {useEffect, useState} from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer
} from 'recharts';

const singleTenantgraph = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/analytics/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setData(data[0].total_rent || [])
        })
    },[])
    const dataset = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 500 },
    { name: "Apr", users: 200 },
    { name: "May", users: 700 },
    { name: "June", users: 300 },
    { name: "July", users: 700 },
    { name: "Aug", users: 900 },
    { name: "sept", users: 500 },
    { name: "Oct", users: 500 },
    { name: "Nov", users: 700 },
    { name: "Dec", users: 900 },
  ];
    const COLORS = [ "#FF8042", "#00C49F", "#FFBB28", "#0088FE"];
  return (
    <div className="w-[100%]">
         <div className="bg-white dark:bg-gray-900">
           <h2 className="text-[15px] mb-3 text-gray-700 dark:text-gray-400 text-start font-bold font-serif">Tenant's Distribution</h2>
            <ResponsiveContainer width="100%" height={180}>
                <LineChart data={dataset} className='mt-2'>
                    <CartesianGrid strokeDasharray="1 5"/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip className='bg-blue-500'/>
                    <Legend className='bg-blue-400' />
                    <Line type='natural' dataKey="users" stroke="#00C49F" strokeWidth={1} />
                    <Line type='basis' dataKey="users" stroke="#FFBB28" strokeWidth={1} />
                </LineChart>
            </ResponsiveContainer>
         </div>
       </div>
  )
}

export default singleTenantgraph
