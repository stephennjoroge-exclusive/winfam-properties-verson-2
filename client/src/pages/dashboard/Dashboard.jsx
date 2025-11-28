import React from 'react';
import Cards from '../dashboard/Cards';
import Charts from './LineChart';
import LineCharts from './PieChart';
import RecentTenants from './RecentTenants'
import {Link} from 'react-router-dom'


const Dashboard = ({isDark}) => {
  return (
    <div>
      <Cards />
      <div className='flex text-[10px]'>
        <Charts isDark={isDark}/>
        <LineCharts isDark={isDark} />
      </div>
      <div className='relative'>
         <Link to="/chatbotfloat" className='absolute top-3 right-0 rounded'><p>button</p></Link>
      </div>
      <div>
        <RecentTenants/>
      </div>

    </div>
  )
}

export default Dashboard;
