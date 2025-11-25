import React from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import LandlordData from '../components/data/LandlordData';
import {useState, useEffect} from 'react'
import LandlordModel from '../components/modals/LandlordModel';
import DeleteModalPage from '../components/modals/DeleteModalPage';
import axios from 'axios'
import useDynamicAPI from './useDynamicAPI';

const Landlord = () => {
  const [openModal, setOpenModal] = useState(false)
  const [landlord, setLandlord] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(14)
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    
  })
  const [filterData, setFilterData] = useState({
    search: ''
  })
  const {getAPI, deleteAPI, postAPI} = useDynamicAPI();

  
  const fetchData = async (url = '/landlords/') =>{
   try{
    setLoading(true)

    const params = new URLSearchParams();

    params.delete('search')
    if(filterData.search) params.set('search', filterData.search.toLowerCase())

    const finalUrl = `${url}${params.toString() ? `?${params.toString()}` : ''}`
    console.log(finalUrl)
    const response = await getAPI(finalUrl);

    setLandlord(Array.isArray(response.results) ? response.results : []);
    setNext(response.next)
    setPrevious(response.previous)
    setCount(response.count)

    const paramPage = params.get('page') ? parseInt(params.get('page')) : 1;
    setCurrentPage(paramPage)
   } catch(error){
    console.log("Fetch error", error)
   }
  }

  useEffect(() => {
    fetchData()
  },[])

  const handleEdit = (id) =>{
    const landlordEdit = landlord.find(items => items.id === id)
    if (!landlordEdit) return;
    setFormData(landlordEdit);
    setOpenModal(true);
    
  }

  return (
      <>
        <div className='flex flex-col p-2 text-gray-700 bg-gray-50 rounded mb-2 dark:bg-gray-900 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Landlords</p>
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
                <button onClick={() => setOpenModal(true)} className='cursor-pointer dark:text-gray-200 text-white'>Add Landlord</button>
              </div>

            </div>
          </div>

          <div className='flex justify-between w-[90%] items-center text-[10px] mt-3'>

            <div className='rounded px-2 py-1 flex items-center border border-gray-100 bg-gray-100 shadow dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
              <RiSearchLine  className='mr-2 text-sm' />
              <input type="text" placeholder="Search..." value={filterData.search || ''} 
                onChange={(e) => setFilterData({...filterData, search: e.target.value})}
                onKeyDown={(e) =>{
                  if(e.key === 'Enter'){
                    e.preventDefault();
                    fetchData();
                  }
                }}
               className='w-[100%] text-[12px] focus:border-transparent outline-none hidden md:block' />
            </div>

            <div className='group flex '>
              <div className='flex cursor-pointer justify-between items-center p-4 shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Total Number of Landlords</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
              <div className='flex shadow-[-4px_-4px_6px_white,_4px_4px_6px_rgba(94,104,121,0.15)] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)] cursor-pointer justify-between items-center px-2 py-1 rounded mx-2' >
                <div className='flex items-center mr-5'>
                  <FaRegCalendarAlt className='mr-1'/>
                  <a href="" className=''>Total Number of units</a>
                </div>
                <IoIosArrowDown/>
              </div>
              
            </div>
          </div>
        </div>

        {openModal && <LandlordModel openModal={openModal} fetchData={fetchData} setOpenModal={setOpenModal} formData={formData} setFormData={setFormData}/>}


        <div className='text-[10px] mt-2'>
          <LandlordData 
            handleEdit={handleEdit} 
            loading={loading} 
            setLoading={setLoading} 
            landlord={landlord} 
            setLandlord={setLandlord}
            next={next}
            previous={previous}
            pageSize={pageSize}
            currentPage={currentPage}
            count={count}
            fetchData={fetchData}
            setDeleteModal={setDeleteModal}
          />
        </div>

        {deleteModal && <DeleteModalPage id={deleteModal} setDeleteModal={setDeleteModal} landlord={landlord} setLandlord={setLandlord} />}

      
      
      </>
  )
}

export default Landlord


