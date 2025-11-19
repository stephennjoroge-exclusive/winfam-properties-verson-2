import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { IoMdClose } from "react-icons/io";

const LandlordModel = ({openModal, setOpenModal, formData, setFormData,fetchData}) => {
  if(!openModal) return null;

  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e, action) =>{
    e.preventDefault()
    setSuccess('')
    setLoading(true)
    setErrors({})

    try{
      if(formData.id){
        await axios.patch(`http://localhost:8000/landlords/${formData.id}/`, formData, {
          headers: {'Content-Type': 'application/json'}
        })
      } else {
        await axios.post('http://localhost:8000/landlords/', formData, {
          headers: {'Content-Type': 'application/json'}
        });
      }
     
      await fetchData()

      setSuccess('Landlord created successfully!')

      if (action === 'exit'){
        setTimeout(() => setOpenModal(false),2000)
      } else if(action === 'new'){
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
        })
      }
      setTimeout(() => setSuccess(''), 3000)
    } catch(error) {
      if(error.response && error.response.data){
        setErrors(error.response.data)
      } else {
        console.log(error)
        setErrors({general: 'There was an error'})
      }

    } finally{
      setLoading(false)
    }

  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))

  }

  const fields = [
    {name: 'first_name', label: 'First Name', type:'text'},
    {name: 'last_name', label: 'Last Name', type:'text'},
    {name: 'phone_number', label: 'Phone Number', type:'tel'},
  ]

  return (
     <div className='flex fixed justify-center items-center inset-0 bg-black/15 z-50'>
      <div className="bg-white relative text-gray-700 dark:bg-gray-900 text-[10px] dark:text-gray-400 p-6 rounded-lg w-[600px]">
        <IoMdClose className='absolute top-0 m-2 text-sm right-0 cursor-pointer' onClick={() => setOpenModal(false)} />

        <div className='mb-4 items-start flex justify-between'>
          <div className='flex flex-col'>
            <h2 className="font-bold text-[18px] items-start flex">Landlord Information</h2>
            <p className='text-[8px] items-start'>Provide the necessary Landlord's information</p>
          </div>

          <div className="ml-3 flex-1">
            {success && <p className="text-green-500 font-bold text-[12px] bg-green-50 rounded-2xl p-2">{success}</p>}
            {loading && <p className="text-gray-500 font-bold text-[12px] bg-gray-50 rounded-2xl p-2">Submitting...</p>}
            {errors.general && <p className="text-red-500 font-bold text-[12px] bg-red-50 rounded-2xl p-2">{errors.general}</p>}
          </div>
        </div>

        <form method="POST" className=" space-y-3 w-full flex flex-col">
          {fields.map(({name, label, type}) => (
            <div key={name} className='flex'>
              <label htmlFor={name} className='flex text-[10px] items-start w-24 text-start font-bold'>{label}</label>
              <input
               type={type}
               name = {name}
               value={formData[name]}
               placeholder={label}
               onChange={handleChange}
               className='border-b border-gray-300 text-gray-700 dark:text-gray-200 dark:border-gray-700 text-[10px] outline-none rounded-[7px] px-2 py-1 flex-1 w-full'
              />
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
  )
}

export default LandlordModel
