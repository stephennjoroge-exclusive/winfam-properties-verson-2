import React from 'react'
import {useState, useEffect} from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import PaymentsData from '../components/data/PaymentsData';
import PaymentModal from '../components/modals/PaymentModal'
import axios from 'axios'
import useDynamicAPI from './useDynamicAPI';

const Payments = () => {
  const [openModal, setOpenModal] = useState(false)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const [methodSelected, setMethodSelected] = useState('')
  const [openMethodFilter, setOpenMethodFilter] = useState(false)
  const [rentSelected, setRentSelected] = useState('')
  const [openRentFilter, setOpenRentFilter] = useState(false)
  const [unitSelected, setUnitSelected] = useState('')
  const [openUnitFilter, setOpenUnitFilter] = useState(false)

  const [filterData, setFilterData] = useState({
    payment_method: '',
    rent_status: '',
    unit_status: '',
    search: ''
  })
  const [formData, setFormData] = useState({
    tenant: '',
    property: '',
    unit: '',
    rent_payable: '',
    rent: '',
    payment_method: '',
    rent_status: '',
    balance_brought_forward: '',
    balance_carry_forward: '',
    deposit: '',
    date_issued: '',
  })
  const {deleteAPI, postAPI, getAPI} = useDynamicAPI();

  const fetchData = async (url = '/payments/') => {
    try{
      setLoading(true)

      const params = new URLSearchParams();

      params.delete('payment_method')
      if(filterData.payment_method) params.set('payment_method', filterData.payment_method.toLowerCase())

      params.delete('rent_status')
      if(filterData.rent_status) params.set('rent_status', filterData.rent_status.toLowerCase())

      params.delete('unit_status')
      if(filterData.unit_status) params.set('unit_status', filterData.unit_status.toLowerCase())

      params.delete('search')
      if(filterData.search) params.set('search', filterData.search.toLowerCase())

      const finalUrl = `${url}${toString() ? `?${toString()}` : ''}`
      const response = await getAPI(finalUrl)

      setPayments(Array.isArray(response) ? response : (response.results || []))
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
    fetchData();
  },[methodSelected, unitSelected, rentSelected, filterData])

  const handleEdit = (id) =>{
    const paymentEdit = payments.find(items => items.id === id);
    if(!paymentEdit) return;
    setFormData(paymentEdit);
    setOpenModal(true);
  }

  const handleDelete = async (id) => {
    try {
      await deleteAPI(`http://localhost:8000/payments/${id}/`);
      setPayments(prev => prev.filter(items => items.id !== id));
    } catch(error){
      console.log(error);
    }
  }

  return (
      <>
        <div className='flex flex-col p-3 text-gray-700 bg-gray-50 rounded mb-2 dark:bg-gray-900 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Payments</p>
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
              <div className='flex items-center cursor-pointer bg-blue-600 dark:bg-blue-800 dark:text-gray-300 px-3 py-1 rounded text-[12px] text-white' onClick={() =>setOpenModal(true)}>
                <FaPlus className='mr-2 cursor-pointer '/>
                <button className='cursor-pointer'>Add Payment</button>
              </div>

            </div>
          </div>

          <div className='flex justify-between w-[90%] items-center text-[10px] mt-3'>

            <div className='rounded px-2 py-1 flex shadow items-center border border-gray-100 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
              <RiSearchLine  className='mr-2 text-sm' />
              <input type="text" placeholder="Search..." value={filterData.search || ''}
              onChange={(e) => setFilterData({...filterData, search: e.target.value})}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  e.preventDefault();
                  fetchData();
                }
              }} 
              className='w-[100%] text-[12px] focus:border-transparent outline-none sm:block hidden' />
            </div>

            <div className='group flex '>
              <div className='flex relative w-[160px] border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenMethodFilter(prev => !prev)} >
                <FiFilter className='mr-1'/>
                <div className='flex flex-1 w-full'>
                 {methodSelected || 'All Payment Methods'}
                </div>
                <IoIosArrowDown className={`${openMethodFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                {openMethodFilter && (
                  <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'>
                    <div onClick={(e) => {e.stopPropagation(); setMethodSelected(''); setFilterData({...filterData, payment_method: ''}); setOpenMethodFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Payment Methods</div>
                    <div onClick={(e) => {e.stopPropagation(); setMethodSelected('mpesa'); setFilterData({...filterData, payment_method: 'mpesa'}); setOpenMethodFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Mpesa</div>
                    <div onClick={(e) => {e.stopPropagation(); setMethodSelected('equity'); setFilterData({...filterData, payment_method: 'equity'}); setOpenMethodFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Equity</div>
                    <div onClick={(e) => {e.stopPropagation(); setMethodSelected('cash'); setFilterData({...filterData, payment_method: 'cash'}); setOpenMethodFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Cash</div>
                  </div>
                )}
              </div>
              
              <div className='flex border w-[130px]  relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenUnitFilter(prev => !prev)} >
                <FiFilter className='mr-1'/>
                <div className='flex items-center flex-1 mr-5'>
                  {unitSelected || 'All Unit Status'}
                </div>
                <IoIosArrowDown className={`${openUnitFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                {openUnitFilter && (
                  <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected(''); setFilterData({...filterData, unit_status: ''}); setOpenUnitFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Unit Status</div>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('occupied'); setFilterData({...filterData, unit_status: 'occupied'}); setOpenUnitFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Occupied</div>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('vacant'); setFilterData({...filterData, unit_status: 'vacant'}); setOpenUnitFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Vacant</div>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('maintenance'); setFilterData({...filterData, unit_status: 'maintenance'}); setOpenUnitFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Maintenance</div>
                  </div>
                )}
              </div>
              
              <div className='flex relative w-[130px] border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenRentFilter(prev => !prev)} >
                <FiFilter className='mr-1'/>
                <div className='flex items-center mr-5 flex-1'>
                  {rentSelected || 'All Rent Status'}
                </div>
                <IoIosArrowDown className={`${openRentFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                {openRentFilter && (
                  <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'> 
                    <div onClick={(e) => {e.stopPropagation(); setRentSelected(''); setFilterData({...filterData, rent_status: ''}); setOpenRentFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Rent Status</div>
                    <div onClick={(e) => {e.stopPropagation(); setRentSelected('paid'); setFilterData({...filterData, rent_status: 'paid'}); setOpenRentFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Paid</div>
                    <div onClick={(e) => {e.stopPropagation(); setRentSelected('overdue'); setFilterData({...filterData, rent_status: 'overdue'}); setOpenRentFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Overdue</div>
                    <div onClick={(e) => {e.stopPropagation(); setRentSelected('vacant'); setFilterData({...filterData, rent_status: 'vacant'}); setOpenRentFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Vacant</div>
                  </div>
                )}
              </div>

              <div className='flex border cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2'>
                <FiFilter className='mr-1'/>
                <div className='flex items-center mr-5'>
                  Date Range
                </div>
                <IoIosArrowDown/>
              </div>
              
            </div>
          </div>
        </div>

        {openModal && <PaymentModal openModal={openModal} fetchData={fetchData} setOpenModal={setOpenModal} formData={formData} setFormData={setFormData}/>}

        <div className='text-[10px] mt-2'>
          <PaymentsData 
            payments={payments} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            setPayments={setPayments} 
            loading={loading} 
            setLoading={setLoading} 
            count={count}
            previous={previous}
            next={next}
            pageSize={pageSize}
            currentPage={currentPage}
            fetchData={fetchData}
          />
        </div>
      
      
      </>
  )
}

export default Payments

