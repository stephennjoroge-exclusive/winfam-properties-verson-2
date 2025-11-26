import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import useDynamicAPI from "../useDynamicAPI";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const {getAPI} = useDynamicAPI()

  const fetchData = async (url = '/analytics/') => {
    try{
      const params = new URLSearchParams()

      const finalURL = `${url}${toString() ? `?${toString()}` : ''}`
      const response = await getAPI(finalURL)

      setData(response.occupied_units)
    }catch(error) {
      console.log('There was an error', error)
    }
  }
const COLORS = ["#3B82F6", "#2563EB", "#22C55E", "#16A34A", "#4ADE80", "#F97316", "#FB923C", "#F59E0B", "#FCD34D", "#3B82F6"];


  return (
    <div className="w-[30%] mt-3 rounded-2xl p-4 border dark:border-none border-gray-200">
      <div className="bg-gray-100 dark:bg-gray-900">
        <h2 className="text-[12px] text-start mb-3 text-gray-700 dark:text-gray-400 font-bold">Unit Distribution</h2>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={[
                { name: "Mantainance", value: 5 },
                { name: "Vacant", value: 3 },
                { name: "Occupied", value: 31 },
              ]}
              dataKey="value"
              outerRadius={80}
              innerRadius={60}
              stroke="none"
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={index} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

