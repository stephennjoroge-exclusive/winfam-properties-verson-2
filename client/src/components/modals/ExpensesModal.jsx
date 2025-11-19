import React from 'react'
import {useEffect, useState} from 'react'
import { IoMdClose } from "react-icons/io";
import axios from 'axios'

const ExpensesModal = ({property, unit, formData, setFormData, fetchData, fetchingData, openModal, setOpenModal}) => {
  if(!openModal) return null;
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  

  const handleSubmit = async(e, action) => {
    e.preventDefault()
    setSuccess('')
    setLoading(true)
    setErrors({})

    try{
      if (formData.id){
        await axios.patch(`http://localhost:8000/expenses/${formData.id}/`, formData, {
          headers: {'Content-Type':'application/json'}
        })

      } else {
        await axios.post('http://localhost:8000/expenses/', formData, {
          headers: {'Content-Type': 'application/json'}
        });
      }
     
      await fetchData()

      setSuccess('Expenses created successfully!')

      if (action === 'exit'){
        setTimeout(() => setOpenModal(false),2000)
      } else if(action === 'new'){
        setFormData({
          property: "",
          unit: "",
          expense_name: "",
          cost: "",
          description: "",
          date: ''
        })
      }
      setTimeout(() => setSuccess(''),3000)
    } catch(error){
      if(error.response && error.response.data){
        setErrors(error.response.data)
        console.log(error)
      } else{
        setErrors({general: 'Something went wrong'})
      }
    } finally{
      setLoading(false)
    }
  }

  const fields = [
    {name: 'property', label: 'Property', type: 'select'},
    {name: 'unit', label: 'Unit', type: 'select'},
    {name: 'expense_name', label: 'Expense Name', type: 'text'},
    {name: 'cost', label: 'Cost', type: 'number'},
    {name: 'description', label: 'Description', type: 'text'},
    {name: 'date', label: 'Date', type: 'date'},
  ]

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev =>({...prev, [name]: value}))
  }
  
  return (
    <div className='flex fixed justify-center items-center inset-0 bg-black/15 z-50'>
      <div className="bg-white relative text-gray-700 dark:bg-gray-900 text-[10px] dark:text-gray-400 p-6 rounded-lg w-[600px] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)]">
        <div className='flex flex-col items-start'>
          <IoMdClose className='absolute top-0 m-2 text-sm right-0 cursor-pointer' onClick={() => setOpenModal(false)} />

          <div className='mb-4 items-start flex justify-between'>
            <div className='flex flex-col'>
              <h2 className="font-bold text-[18px] items-start flex">Expenses Information</h2>
              <p className='text-[8px]'>Provide the necessary Expenses Ininformation</p>
            </div>
            <div className="ml-3 flex-1">
              {success && <p className="text-green-500 font-bold text-[12px] bg-green-50 rounded-2xl p-2">{success}</p>}
              {fetchingData && <p className="text-gray-500 font-bold text-[12px] bg-gray-50 rounded-2xl p-2">Fetching units and properties...</p>}
              {loading && <p className="text-gray-500 font-bold text-[12px] bg-gray-50 rounded-2xl p-2">Submitting...</p>}
              {errors.general && <p className="text-red-500 font-bold text-[12px] bg-red-50 rounded-2xl p-2">{errors.general}</p>}
            </div>
          </div>

          <form method="POST" className=" space-y-3 w-full flex flex-col">
             {fields.map(({name, label, type}) =>(
                <div key={name} className='flex'>
                  <label htmlFor={name} className='flex text-[10px] items-start w-24 text-start font-bold'>{label}</label>
                  
                  {type === 'select' ? (
                    <select
                      id={name}
                      name = {name}
                      value = {formData[name] || ''}
                      onChange={handleChange}
                      className='border-b cursor-pointer overflow-scroll border-gray-300 text-gray-400 dark:text-gray-400 text-[9px] dark:border-gray-700 outline-none rounded-[7px] px-1 py-1 flex-1 w-full'>
                        <option value="" className='font-bold'>Select {label}</option>
                        {name === 'property' ? 
                          property.map((items) => (
                            <option key={items.id} value={items.id}>{items.landlord_detail?.first_name} {items.landlord_detail?.last_name}</option>
                          )) : ''}
                        {name === 'unit' ? 
                          unit.map((items) =>(
                            <option key={items.id} value={items.id}>{items?.unit_number}</option>
                        )): ''}
                      </select>
                  ) : (
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={formData[name] || ''}
                      onChange={handleChange}
                      placeholder={label}
                      className='border-b border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-700 text-[10px] outline-none rounded-[7px] px-2 py-1 flex-1 w-full'/>
                  )}
                </div>
             ))}
          <div className='mt-5 flex justify-between w-full'>
          <button onClick={() => setOpenModal(false)} className="bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white text-[10px] hover:bg-gray-500 text-white cursor-pointer rounded px-3 py-1">Cancel</button>
          <div className='flex gap-2'>

            <button
              type="button"
              name='action'
              className="bg-blue-500 text-[10px] hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-gray-100 text-white rounded px-3 py-1 cursor-pointer"
              onClick={(e) => handleSubmit(e, "new")}
            >
              Save & New
            </button>

            <button
              type="button"
              name='action'
              className="bg-blue-500 text-[10px] hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-gray-100 text-white rounded px-3 py-1 cursor-pointer"
              onClick={(e) => handleSubmit(e, "exit")}
            >
              Save & Exit
            </button>
          </div>

          </div>
        </form>
          
        </div>
      </div>
    </div>
  )
}

export default ExpensesModal
