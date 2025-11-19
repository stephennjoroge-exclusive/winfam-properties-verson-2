import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Charts = ({isDark}) => {
  const data = [
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

  return (
      <div className={`w-[70%] mt-3 mr-3 items-center pr-3 border dark:border-none border-gray-200 rounded-2xl bg-gray-100 dark:bg-gray-900 ${isDark ? 'dark': ''}`}>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} className='mt-7'>
          <CartesianGrid strokeDasharray="1 5"/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip className='bg-blue-500'/>
          <Legend className='bg-blue-400' layout="horizontal" verticalAlign="bottom" align='center'  />
          <Line type='natural' dataKey="users" stroke="#86EFAC" strokeWidth={1} />
          <Line type='basis' dataKey="users" stroke="#0EA5E9" strokeWidth={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Charts
