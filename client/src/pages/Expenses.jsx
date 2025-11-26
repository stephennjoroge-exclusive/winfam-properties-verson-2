import React from 'react'
import {useState, useEffect} from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import ExpensesData from '../components/data/ExpensesData';
import ExpensesModal from '../components/modals/ExpensesModal';
import axios from 'axios'
import useDynamicAPI from './useDynamicAPI';

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const [property, setProperty] = useState([])
  const [unit, setUnit] = useState([])
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    property: '',
    unit: '',
    expense_name: '',
    cost: '',
    description: '',
    date: ''
  })
  const {postAPI, deleteAPI, getAPI} = useDynamicAPI()

  const fetchData = async(url = '/expenses/') => {
    try{
      setLoading(true)
      const params = new URLSearchParams();

      const finalUrl = `${url}${toString() ? `?${toString()}` : ''}`
      const response = await getAPI(finalUrl);

      setExpenses(Array.isArray(response.results) ? response.results : [])
      setNext(response.next)
      setPrevious(response.previous)
      setCount(response.count)

      const paramPage = params.get('page') ? parseInt(params.get('page')) : 1;
      setCurrentPage(paramPage)
    } catch(error){
      console.log('Fetch error', error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
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

        setProperty(propertyResponse.data.results || []);
        setUnit(unitResponse.data.results || []);
        console.log(propertyResponse.data.results)
      } catch(error) {
        console.log(error)
        setErrors({general: 'There was an error'})
      } finally{
        setTimeout(() => setFetchingData(false), 2000)
      }
    }
    fetchDetails();
  }, [openModal])

  const handleEdit = (id) => {
    const expensesEdit = expenses.find(items => items.id === id)
    if(!expensesEdit) return;
    setFormData(expensesEdit)
    setOpenModal(true)
  }

  const handleDelete = async (id) =>{
    try{
      await deleteAPI(`expenses/${id}/`)
      setExpenses(prev => prev.filter(items => items.id !== id))
    }catch(error){
      console.log(error)
    }
  }

  return (
      <>
        <div className='flex flex-col p-3 text-gray-700 bg-gray-50 rounded mb-2 dark:bg-gray-900 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Expenses</p>
            </div>
            <div className='items-center flex mx-2'>
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
                <button onClick={() => setOpenModal(true)} className='cursor-pointer'>Add Expenses</button>
              </div>

            </div>
          </div>

          <div className='flex justify-between w-[90%] items-center text-[10px] mt-3'>

            <div className='rounded shadow px-2 py-1 flex items-center border border-gray-100 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
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


        <div className='bg-gray-50 mb-2 text-[11px] font-bold text-gray-700 rounded items-center dark:bg-gray-900'>
          <div className='flex mx-3 mb-2'>
            <div className='px-3 py-1 border-b-2 rounded dark:text-gray-400 dark:hover:bg-gray-800 border-gray-50 hover:bg-blue-50 duration-300 dark:border-gray-900 dark:hover:border-gray-400 hover:border-blue-800 cursor-pointer'>
              <p>All Units</p>
            </div> 
            <div className='px-3 py-1 border-b-2 rounded dark:text-gray-400 dark:hover:bg-gray-800 border-gray-50 hover:bg-blue-50 duration-300 dark:border-gray-900 dark:hover:border-gray-400 hover:border-blue-800 cursor-pointer'>
              <p>All Units</p>
            </div>
            <div className='px-3 py-1 border-b-2 rounded dark:text-gray-400 dark:hover:bg-gray-800 border-gray-50 hover:bg-blue-50 duration-300 dark:border-gray-900 dark:hover:border-gray-400 hover:border-blue-800 cursor-pointer'>
              <p>All Units</p>
            </div>
          </div>
        </div>

        {openModal && <ExpensesModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          formData={formData}
          setFormData={setFormData}
          property={property}
          unit={unit}
          setFetchingData={setFetchingData}
          fetchingData={fetchingData}
          next={next}
          previous = {previous}
          pageSize={pageSize}
          count={count}
          fetchData={fetchData}
          currentPage={currentPage}
        />}


        <div className='text-[10px] mt-2'>
          <ExpensesData loading={loading} expenses={expenses}/>
        </div>
      
      
      </>
  )
}

export default Expenses


