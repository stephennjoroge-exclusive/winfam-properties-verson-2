import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const AnalyticsBoard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/analytics/')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched analytics:", data)
        if (Array.isArray(data) && data.length > 0) {
          setData(data[0]) // since backend returns a list
        }
      })
      .catch(error => console.error('Error fetching analytics:', error))
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  if (!data) return <p>Loading...</p>

  const chartData = [
    { name: 'Properties', value: data.No_of_propeties },
    { name: 'Total Units', value: data.total_units },
    { name: 'Occupied', value: data.occupied_units },
    { name: 'Total Rent', value: data.total_rent }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AnalyticsBoard
