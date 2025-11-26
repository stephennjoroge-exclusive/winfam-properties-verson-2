import React from 'react'
import {useState, useEffect} from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import TenantsData from '../components/data/TenantsData';
import TenantModal from '../components/modals/TenantModal'
import SingleTenant from '../components/data/singletenant/SingleTenant';
import { IoFilter } from "react-icons/io5";
import useDynamicAPI from './useDynamicAPI';


const Tenants = () => {
  const [openModal, setOpenModal] = useState(false)
  const [property, setProperty] = useState([])
  const [unit, setUnit] = useState([])
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const [rentSelected, setRentSelected] = useState('')
  const [unitSelected, setUnitSelected] = useState('')
  const [openRentFilter, setOpenRentFilter] = useState(false)
  const [openUnitFilter, setOpenUnitFilter] = useState(false)
  const [next, setNext] = useState(null)
  const [errors, setErrors] = useState({})
  const [previous, setPrevious] = useState(null)
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)
  const [infoModal, setInfoModal] = useState(false)
  const [filterData, setFilterData] = useState({
    rent_status: '',
    unit_status: '', 
    property: ''
  })
  const [formData, setFormData] =useState({
      first_name: "",
      last_name: "",
      id_number: "",
      phone: "",
      email: "",
      property: "",
      unit: "",
      move_in_date: "", 
  })
  const [selectedPropertyId, setSelectedPropertyId] = useState(formData.property || '');
  const {getAPI, postAPI, deleteAPI} = useDynamicAPI();

  const fetchData = async (url = '/tenants/') => {
  try{

    setLoading(true)
    const params = new URLSearchParams();
    params.delete('unit_status');
    params.delete('rent_status');
    params.delete('property');

    if(filterData.unit_status) params.set('unit_status', filterData.unit_status.toLowerCase());
    if(filterData.rent_status) params.set('rent_status', filterData.rent_status.toLowerCase());
    if(filterData.property) params.set('property', filterData.property.toLowerCase());

    params.delete('paid')
    params.delete('overdue')
    params.delete('vacant')

    if(filterData.paid) params.set('paid', filterData.paid.toLowerCase());
    if(filterData.overdue) params.set('overdue', filterData.overdue.toLowerCase());
    if(filterData.vacant) params.set('vacant', filterData.vacant.toLowerCase());

    const finalUrl = `${url}${params.toString() ? `?${params.toString()}` : ''}`;
    const data = await getAPI(finalUrl)

    setTenants(Array.isArray(data) ? data : (data.results || []));
    setNext(data.next)
    setPrevious(data.previous)
    setCount(data.count)

    const paramPage = params.get('page') ? parseInt(params.get('page')) : 1;
    setCurrentPage(paramPage)
  } catch(error){
    console.log('Fetch error', error)
  }finally{
    setLoading(false)
  }

}
  useEffect(() => {
    fetchData();
  },[filterData, unitSelected, rentSelected])


useEffect(() => {
  if (!selectedPropertyId) return;

  const fetchUnits = async () => {
    try {
      const response = await getAPI(`/units/?property_id=${selectedPropertyId}`
      );
      setUnit(response.data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

    fetchUnits();
  }, [selectedPropertyId]);


  const handleEdit = (id) => {
    const tenantEdit = tenants.find(items => items.id === id)
    if(!tenantEdit) return;
    setFormData(tenantEdit);
    setOpenModal(true)
  }


  const handleDelete = async (id) => {
    try{
      deleteAPI(`/tenants/${id}/`)
      setTenants(prev => prev.filter(items => items.id !== id))
    } catch(error){
      console.log(error)
    }
  }

  const export_data = () => {
    const params = new URLSearchParams(filterData).toString();
    window.open(`${import.meta.env.VITE_API_URL}/tenants/export/?${params}`);
  }


  return (
      <>
        <div className='flex flex-col p-3 text-gray-700 bg-gray-50 rounded mb-2 dark:bg-gray-900 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Tenants</p>
            </div>
            <div className='items-center flex w-[70%]} mx-2'>
              <div className='flex m-3 items-center cursor-pointer'>
                <IoPrintSharp className='mr-1' />
                <a href="" className='text-[10px]'>Print</a>
              </div>
              <div className='flex m-3 items-center cursor-pointer' onClick={() => export_data()} >
                <TiExportOutline className='mr-1'/>
                <a href="" className='text-[10px]'>Export</a>
              </div>
              <div className='flex items-center cursor-pointer bg-blue-600 dark:bg-blue-800 dark:text-gray-300 px-3 py-1 rounded text-[12px] text-white'onClick={() => setOpenModal(true)}>
                <FaPlus className='mr-2 cursor-pointer '/>
                <button onClick={() =>setOpenModal(true)} className='cursor-pointer'>Add Tenant</button>
              </div>

            </div>
          </div>

          <div className='flex justify-between w-[90%] items-center text-[10px] mt-3'>

            <div className='rounded px-2 py-1 flex items-center border border-gray-100 bg-gray-100 shadow dark:bg-gray-800 dark:text-gray-500 dark:border-none'>
              <RiSearchLine  className='mr-2 text-sm' />
              <input type="text" placeholder="Search..." className='w-[100%] text-[12px] focus:border-transparent outline-none hidden md:block' />
            </div>

            <div className='group flex '>
              <div className={`flex border w-[130px] relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2`} onClick={() => setOpenUnitFilter(prev => !prev)} >
                <IoFilter className='mr-1'/>
                <div className='flex items-center mr-5 flex-1 w-full'>
                  {unitSelected || 'All Unit Status'}
                </div>
                <IoIosArrowDown className={`${openUnitFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                {openUnitFilter && (
                  <div className='dropdown-list absolute w-full top-6 left-0 right-0 rounded bg-gray-100 border border-gray-200'>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected(''); setFilterData({...filterData, unit_status: ''}); setOpenUnitFilter(false)}}
                      className='px-2 py-1 text-left cursor-pointer hover:bg-gray-200'>All Unit Status</div>

                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('occupied'); setFilterData({...filterData, unit_status: 'occupied'}); setOpenUnitFilter(false)}}
                      className='px-2 py-1 text-left cursor-pointer hover:bg-gray-200'>Ocuppied</div>

                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('vacant'); setFilterData({...filterData, unit_status: 'vacant'}); setOpenUnitFilter(false)}}
                      className='px-2 py-1 text-left cursor-pointer hover:bg-gray-200'>Vacant</div>

                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('maintenance'); setFilterData({...filterData, unit_status: 'maintenance'}); setOpenUnitFilter(false)}}
                      className='px-2 py-1 text-left cursor-pointer hover:bg-gray-200'>Maintenance</div>
                  </div>
                )}


              </div>
              
              <div className='flex border w-[130px] relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenRentFilter(prev => !prev)} >
                <IoFilter className='mr-1'/>
                <div className='flex items-center mr-5 w-full flex-1'>
                  {rentSelected || 'All rent status'}
                </div>
                <IoIosArrowDown className={`${openRentFilter ? 'rotate-180 duration-300': 'rotate-0 duration-300'}`}/>

                {openRentFilter && (
                  <div className='dropdown-list absolute w-full top-6 left-0 right-0 rounded bg-gray-100 border border-gray-200'>
                    <div onClick={(e) =>{ e.stopPropagation(); setRentSelected('');setFilterData({...filterData, rent_status: ''}); setOpenRentFilter(false) }}
                      className='text-left px-2 py-1 hover:bg-gray-200'>All rent status</div>

                    <div onClick={(e) =>{ e.stopPropagation(); setRentSelected('paid');setFilterData({...filterData, rent_status: 'paid'}); setOpenRentFilter(false) }}
                      className='text-left px-2 py-1 hover:bg-gray-200'>Paid</div>

                    <div onClick={(e) =>{ e.stopPropagation(); setRentSelected('overdue');setFilterData({...filterData, rent_status: 'overdue'}); setOpenRentFilter(false) }}
                      className='text-left px-2 py-1 hover:bg-gray-200'>Overdue</div>
                    
                    <div onClick={(e) =>{ e.stopPropagation(); setRentSelected('vacant');setFilterData({...filterData, rent_status: 'vacant'}); setOpenRentFilter(false) }}
                      className='text-left px-2 py-1 hover:bg-gray-200'>Vacant</div>
                    
                  </div>
                )}
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
        
        {openModal && <TenantModal selectedPropertyId={selectedPropertyId} setSelectedPropertyId={setSelectedPropertyId} openModal={openModal} fetchData={fetchData} setOpenModal={setOpenModal} setTenants={setTenants} property={property} unit={unit} fetchingData={fetchingData} formData={formData} setFormData={setFormData}/>}


        <div className='text-[10px] mt-2'>
          <TenantsData
            tenants={tenants}
            formData={formData} 
            loading={loading} 
            setTenants={setTenants} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            filterData={filterData} 
            unitSelected={unitSelected} 
            rentSelected={rentSelected}
            count={count}
            pageSize={pageSize}
            next={next}
            previous={previous}
            currentPage={currentPage}
            fetchData={fetchData}
            setInfoModal={setInfoModal}
          />
        </div>

       {infoModal && <SingleTenant id = {infoModal} setInfoModal = {setInfoModal} tenants = {tenants} setTenants = {setTenants} />}
      
      
      </>
  )
}

export default Tenants
