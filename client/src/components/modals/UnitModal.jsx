import React from 'react'
import {useState, useEffect} from 'react'
import { IoMdClose } from "react-icons/io";
import useDynamicAPI from '../../pages/useDynamicAPI';

const UnitModal = ({openModal, setOpenModal, formData, fetchData, setFormData, property, setProperty}) => {
  if(!openModal) return null;

  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const {getAPI, postAPI, putAPI} = useDynamicAPI()


  const handleSubmit = async (e, action) =>{
    e.preventDefault()
    setSuccess('')
    setLoading(true)
    setErrors({})

    try{
      if(formData.id){
        await putAPI(`/units/${formData.id}/`, formData);
      } else {
          await postAPI('/units/', formData);
      }
      await fetchData()
      setSuccess('Unit created successfully!');

      if (action === "exit") {
        setTimeout(() => setOpenModal(false), 2000);
      } else if (action === "new") {
        setFormData({
          unit_number: '',
          property: '',
          unit_type: '',
          unit_build: '',
          rent_amount: '',
          unit_status: '',
          rent_status: '',
        });
      }

      setTimeout(() => setSuccess(''), 3000)

    } catch (error){
      if(error.response && error.response.data){
        setErrors(error.response.data)
      } else {
        setErrors({general: 'Something went wrong!'});
      }

    } finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    const fetchData = async () => {
      try {
        setFetchingData(true)
        const response = await getAPI('/property/')
        if (response.results && response.results.length > 0) {
          const landlords = response.results.map(items => ({
            id: items.id,
            landlordName: `${items.landlord_detail.first_name} ${items.landlord_detail.last_name}`
          }))
          setProperty(landlords)
        } else {
          setProperty([])
        }
      }catch(error){
        console.log('There was an error fetching the properties', error)
        setProperty([])
      }finally{
        setFetchingData(false)
      }
    }

    fetchData()

  }, [openModal])

  const fields = [
    { name: "unit_number", label: "Unit Number", type: "text" },
    { name: "property", label: "Property", type: "select" },
    { name: "unit_type", label: "Unit Type", type: "select",
      options: [
        { value: "single", label: "Single" },
        { value: "double_room", label: "Double Room" },
        { value: "bedsitter", label: "Bedsitter" },
        { value: "one_bedroom", label: "One Bedroom" },
        { value: "two_bedroom", label: "Two Bedroom" } 
    ]},
    { name: "unit_build", label: "Unit Build", type: "select",
      options: [
        { value: "mabati", label: "Mabati" },
        { value: "block", label: "Block" }
      ]},
    { name: "rent_amount", label: "Rent Amount", type: "number" },
    { name: "unit_status", label: "Unit Status", type: "select",
      options: [
        { value: "vacant", label: "Vacant" },
        { value: "occupied", label: "Occupied" },
        { value: "maintenance", label: "Maintenance" }
      ]},
  ];

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData(prev =>({...prev,[name]: value}))
  }

  return (
    <div className='flex fixed justify-center items-center inset-0 bg-black/15 z-50'>
      <div className="bg-white relative text-gray-700 dark:bg-gray-900 text-[10px] dark:text-gray-400 p-6 rounded-lg w-[600px] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)]">
        <IoMdClose className='absolute top-0 m-2 text-sm right-0 cursor-pointer' onClick={() => setOpenModal(false)}/>

        <div className='mb-4 items-start flex justify-between'>
          <div className='flex flex-col'>
            <h2 className="font-bold text-[18px] items-start flex">Unit Information</h2>
            <p className='text-[8px]'>Provide the necessary Unit's information</p>
          </div>

          <div className="ml-3 flex-1">
            {success && <p className="text-green-500 font-bold text-[12px] bg-green-50 rounded-2xl p-2">{success}</p>}
            {loading && <p className="text-gray-500 font-bold text-[12px] bg-gray-50 rounded-2xl p-2">Submitting...</p>}
            {fetchingData && <p className="text-gray-500 font-bold text-[12px] bg-gray-50 rounded-2xl p-2">Fetching properties...</p>}
            {errors.general && <p className="text-red-500 font-bold text-[12px] bg-red-50 rounded-2xl p-2">{errors.general}</p>}
          </div>
        </div>

        <form action="" method='POST'  onSubmit={handleSubmit}  className='space-y-3 w-full flex flex-col'>
          {fields.map(({ name, label, type, options }) => (
            <div key={name} className='flex'>
               <label htmlFor={name} className='flex text-[10px] items-start w-24 text-start font-bold'>{label}</label>

              {type === 'select' ? (
                <select
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className='border-b cursor-pointer border-gray-300 text-gray-400 dark:text-gray-400 text-[9px] dark:border-gray-700 outline-none rounded-[7px] px-1 py-1 flex-1 w-full'>
                    <option value='' className='font-bold'>Select {label}</option>
                    {name === 'property' ? 
                      property.map((items) => (
                        <option key={items.id} value={items.id}>{items.landlordName}</option>
                      ))
                      :options?.map((items) =>(
                      <option key={items.value} value={items.value}>{items.label}</option>
                    ))}

                </select>
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={name}
                className='border-b border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-700 text-[10px] outline-none rounded-[7px] px-2 py-1 flex-1 w-full'/>)}
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

export default UnitModal
