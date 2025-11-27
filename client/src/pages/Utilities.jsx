import React from 'react'
import {useState, useEffect} from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import axios from  'axios'
import UtilitiesData from '../components/data/UtilitiesData';
import UtilitiesModal from '../components/modals/UtilitiesModal';
import useDynamicAPI from './useDynamicAPI';

const Invoice = () => {
  const [openModal, setOpenModal] = useState(false)
  const [utilities, setUtilities] = useState([])
  const [unit, setUnit] = useState([])
  const [property, setProperty] = useState([])
  const [count, setCount] = useState(0)
  const [fetchingData, setFetchingData] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [next, setNext] = useState(null)
  const [loading, setLoading] = useState(false)
  const [previous, setPrevious] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    property: '',
    unit: '',
    item: '',
    previous_reading: '',
    current_reading: '',
    date: ''
  })
  const {getAPI, postAPI, deleteAPI} = useDynamicAPI();

 const fetchData = async (url = '/utilities/') => {
  try {
    setLoading(true)
    const params = new URLSearchParams();
    const finalUrl = `${url}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await getAPI(finalUrl);

    // Normalize data
    const data = Array.isArray(response) ? response : response.results || [];
    setUtilities(data);
    setNext(response.next || null);
    setPrevious(response.previous || null);
    setCount(response.count || data.length);

    const paramPage = params.get('page') ? parseInt(params.get('page')) : 1;
    setCurrentPage(paramPage)
  } catch(error) {
    console.log('fetch error', error)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    fetchData();
  },[])

  useEffect(() =>{
    if(!openModal) return;
    setFetchingData(true);
    const fetchDetails = async() =>{
      try{
        const [propertyResponse, unitResponse] = await Promise.all([
          getAPI('/property/'),
          getAPI('/units/'),
        ]);

        setProperty(propertyResponse.results || []);
        setUnit(unitResponse.results || []);
      } catch(error) {
        setErrors({general: 'There was an error'})
      } finally{
        setTimeout(() => setFetchingData(false), 2000)
      }
    }
    fetchDetails();
  }, [openModal])


  useEffect(() => {
   try{
      const response = getAPI('/utilities/');
      setUtilities(response.results || [])
   }catch(error){
    console.log('There was an error fetching the utilities', error)
   }
  },[])


  const handleEdit = (id) => {
    const utilitiesEdit = utilities.find(items => items.id === id)
    if(!utilitiesEdit) return;
    setFormData(utilitiesEdit)
    setOpenModal(true);
  }

  const handleDelete = async (id) => {
    try {
      await deleteAPI(`/utilities/${id}/`)
      setUtilities(prev => prev.filter(items => items.id !== id))
    }catch(error){
      console.log(error)
    }
  }

  return (
      <>
        <div className='flex flex-col p-3 text-gray-700 bg-gray-50 rounded mb-2 dark:bg-gray-900 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Utilities</p>
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
                <button className='cursor-pointer'onClick={() => setOpenModal(true)}>Add Utilities</button>
              </div>

            </div>
          </div>

          <div className='flex justify-between w-[90%] items-center text-[10px] mt-3'>

            <div className='rounded px-2 py-1 flex items-center border border-gray-100 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
              <RiSearchLine  className='mr-2 text-sm' />
              <input type="text" placeholder="Search..." className='w-[100%] text-[12px] focus:border-transparent outline-none hidden md:block' />
            </div>

            <div className='group flex '>
              <div className='flex border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Property</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
              <div className='flex border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Status</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
              <div className='flex border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Unit Type</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
              <div className='flex border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Date Range</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
              <div className='flex border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Rent Amount</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
            </div>
          </div>
        </div>

        {openModal && <UtilitiesModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          fetchData={fetchData}
          formData={formData}
          setFormData={setFormData}
          utilities={utilities}
          setUtilities={setUtilities}
          fetchingData={fetchingData}
          setFetchingData={setFetchingData}
          unit={unit}
          property={property}
          loading={loading}
          setLoading={setLoading}
        />}


        <div className='text-[10px] mt-2'>
          <UtilitiesData 
            utilities={utilities} 
            next={next} 
            previous={previous} 
            count={count}
            pageSize={pageSize}
            currentPage={currentPage}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      
      
      </>
  )
}

export default Invoice


