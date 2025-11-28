import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Tenants from './pages/Tenants';
import Landlord from './pages/Landlord';
import Units from './pages/Units';
import Property from './pages/Property';
import Payments from './pages/Payments'
import Expenses from './pages/Expenses';
import Utilities from './pages/Utilities';
import Chatbot from './pages/Chatbot';
import ChatbotFloat from './components/data/singletenant/MessageFloat';
import TenantMetrics from './pages/analytics/TenantMetrics'
import PropertyMetrics from './pages/analytics/PropertyMetrics'

const App = () => {
    const [isDark, setDark] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [dropdownFinancials, setDropdownFinancials] = useState(true);
    const [dropIcon, setDropIcon] = useState(true);

  return (
    <Router>
        <div className={`flex min-h-screen duration-300 relative ${isDark ? 'dark' : ''}`}>
          <Sidebar isOpen={isOpen}
                  setOpen={setOpen}
                        dropIcon={dropIcon}
                          setDropIcon={setDropIcon}
                                dropdownFinancials={dropdownFinancials}
                                  setDropdownFinancials={setDropdownFinancials} />

          <main className='flex flex-col flex-1 text-center bg-gray-100  dark:bg-gray-900 dark:text-gray-400 min-h-screen'>
            
            <Header isDark={isDark} setDark={setDark} />

            <div className='p-3 mt-[50px] ml-[60px]'>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path='/dashboard' element={<Dashboard isDark={isDark}/>}/>
                <Route path='/tenants' element={<Tenants isDark={isDark}/>}/>
                <Route path='/units' element={<Units isDark={isDark}/>}/>
                <Route path='/property' element={<Property isDark={isDark}/>}/>
                <Route path='/landlords' element={<Landlord isDark={isDark}/>}/>
                <Route path='/payments' element={<Payments isDark={isDark}/>}/>
                <Route path='/expenses' element={<Expenses isDark={isDark}/>}/>
                <Route path='/utilities' element={<Utilities isDark={isDark}/>}/>
                <Route path='/chatbot' element={<Chatbot isDark={isDark}/>}/>
                <Route path='/chatbotfloat' element={<ChatbotFloat isDark={isDark}/>}/>
                <Route path='/analytics' element={<Navigate to='/tenantMetrics' replace isDark={isDark}/>}/>
                <Route path='/tenantMetrics' element={<TenantMetrics isDark={isDark}/>}/>
                <Route path='/propertyMetrics' element={<PropertyMetrics isDark={isDark}/>}/>
              </Routes>
            </div>
          </main>
        </div>
    </Router>  
  )
}

export default App
