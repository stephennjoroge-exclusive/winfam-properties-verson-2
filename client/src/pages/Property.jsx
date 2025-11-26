import React from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import PropertyData from '../components/data/PropertyData';
import {useState, useEffect} from 'react'
import PropertyModal from '../components/modals/PropertyModal';
import axios from 'axios'
import useDynamicAPI from './useDynamicAPI';

const property = () => {
  const [openModal, setOpenModal]  = useState(false)
  const [landlord, setLandlord] = useState([])
  const [property, setProperty] = useState([])
  const [fetchingLandlords, setFetchingLandlords] = useState(false);
  const [loading, setLoading] = useState(true)
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    landlord: '',
    location: '',
    total_units: ''
  }) 
const {deleteAPi, postAPI, getAPI } = useDynamicAPI()
  
  const fetchData = async (url = '/property/') => {
    try{
      setLoading(true)
      const params = new URLSearchParams();

      const finalUrl = `${url}${params.toString()? `?${params.toString()}`: ''}` ;
      const response = await getAPI(finalUrl);

      setProperty(Array.isArray(response.results) ? response.results : [])
      setNext(response.next)
      setPrevious(response.previous)
      setCount(response.count)

      const paramPage = params.get('page') ? parseInt(params.get('page')) : 1;
      setCurrentPage(paramPage)
    } catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  useEffect(() => {
    try{
      const response = getAPI('/landlords/')
      setLandlord(response.results)
    }catch(error){
      console.log(error)
    }
  },[])

  const handleEdit = (id) => {
    const propertyEdit = property.find(items => items.id === id)
    if (!propertyEdit) return;
    setFormData(propertyEdit)
    setOpenModal(true)
  }

  const handleDelete = async (id) => {
    try{
      const response = await deleteAPi(`/property/${id}/`);
      setProperty(prev => prev.filter(items => items.id !== id))
    }catch(error){
      console.log(error)
    }
  }

  return (
      <>
        <div className='flex flex-col p-3 text-gray-700 bg-gray-50 rounded mb-2 dark:bg-gray-900 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Properties</p>
            </div>
            <div className='items-center flex w-[70%]} mx-2'>
              <div className='flex m-3 items-center cursor-pointer'>
                <IoPrintSharp className='mr-1' />
                <a href="" className='text-[10px]'>Print</a>
              </div>
              <div className='flex m-3 items-center cursor-pointer' >
                <TiExportOutline className='mr-1'/>
                <a href="" className='text-[10px]'>Export</a>
              </div>
              <div className='flex items-center cursor-pointer bg-blue-600 dark:bg-blue-800 dark:text-gray-300 px-3 py-1 rounded text-[12px] text-white'>
                <FaPlus className='mr-2 cursor-pointer '/>
                <button className='cursor-pointer' onClick={() =>setOpenModal(true)}>Add Property</button>
              </div>

            </div>
          </div>

          <div className='flex justify-between w-[90%] items-center text-[10px] mt-3'>

            <div className='rounded px-2 py-1 flex items-center border shadow border-gray-100 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
              <RiSearchLine  className='mr-2 text-sm' />
              <input type="text" placeholder="Search..." className='w-[100%] text-[12px] focus:border-transparent outline-none hidden md:block' />
            </div>

          </div>
        </div>

        {openModal && <PropertyModal openModal={openModal} fetchData={fetchData} fetchingLandlords={fetchingLandlords} setOpenModal={setOpenModal} landlord={landlord} setLandlord={setLandlord} formData={formData} setFormData={setFormData}/>}
      
        <div className='text-[10px] mt-2'>
          <PropertyData 
            property={property} 
            setProperty={setProperty} 
            loading={loading} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit}
            count={count}
            pageSize={pageSize}
            next={next}
            previous={previous}
            fetchData={fetchData}
            currentPage={currentPage}
          />
        </div>
      </>
  )
}

export default property


