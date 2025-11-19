import React from 'react'
import{useState, useEffect} from 'react'
import { IoPrintSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiExportOutline } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import UnitsData from '../components/data/UnitData';
import UnitModal from '../components/modals/UnitModal'
import axios from 'axios'
import useDynamicAPI from './useDynamicAPI'


const Units = () => {
  const [openModal, setOpenModal] = useState(false)
  const [unit, setUnit] = useState([])
  const [loading, setLoading] = useState(true)
  const [property, setProperty] = useState([])
  const [openBuildFilter, setOpenBuildFilter] = useState(false)
  const [buildSelected, setBuildSelected] = useState('')
  const [openTypeFilter, setOpenTypeFilter] = useState(false)
  const [typeSelected, setTypeSelected] = useState('')
  const [openUnitFilter, setOpenUnitFilter] = useState(false)
  const [unitSelected, setUnitSelected] = useState('')
  const [openRentFilter, setOpenRentFilter] = useState(false)
  const [rentSelected, setRentSelected] = useState('')
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(13);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState({
    unit_type: '',
    unit_build: '',
    unit_status: '',
    rent_status:'',
    search: ''
  })
  const [formData, setFormData] = useState({
    unit_number: '',
    property: '',
    unit_type: '',
    unit_build: '',
    rent_amount: '',
    unit_status: '',
  })

  const {getAPI, postAPI, deleteAPI} = useDynamicAPI()

  useEffect(() =>{
    const fetchData = async () =>{
      try{
        const response = await getAPI(`/units/`)
          setUnit(response.data.results || [])
     }catch(error){
      console.log('There was an error', error)
     }finally{
      setLoading(false)
     }
    }
    fetchData()
  },[])

    const handleEdit = (id) => {
      const unitEdit = unit.find(items => items.id === id)
      if(!unitEdit) return;
      setFormData(unitEdit)
      setOpenModal(true);
    }

    const handleDelete = async (id) => {
      try {
        await deleteAPI(`/units/${id}/`);
        setUnit(prev => prev.filter(items => items.id !== id));
      } catch (error) {
        console.log(error)
      }
    }

    
    const fetchData = async (url = "/units/") => {
      try {
        const urlObj = new URL(url, import.meta.env.VITE_API_URL);
        const params = new URLSearchParams(urlObj.search);
  
        params.delete("unit_type");
        if (filterData.unit_type) params.set("unit_type", filterData.unit_type.toLowerCase());

        params.delete('unit_paid')
        if(filterData.unit_type) params.set('unit_type', filterData.unit_type.toLowerCase());

        params.delete('unit_status')
        if(filterData.unit_status) params.set('unit_status', filterData.unit_status.toLowerCase());

        params.delete('unit_build')
        if(filterData.unit_build) params.set('unit_build', filterData.unit_build.toLowerCase());

        params.delete('rent_status')
        if(filterData.rent_status) params.set('rent_status', filterData.rent_status.toLowerCase());

        params.delete('search')
        if(filterData.search) params.set('search', filterData.search.toLowerCase())
  
        const finalUrl = `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
  
        const response = await getAPI(finalUrl);
  
        setUnit(response.data.results || []);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setCount(response.data.count);
  
        const paramPage = params.get("page") ? parseInt(params.get("page")) : 1;
        setCurrentPage(paramPage);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
  
  
    useEffect(() => {
      fetchData()
    },[filterData, buildSelected, typeSelected, unitSelected, rentSelected,getAPI])

    const export_data = () => {
      const params = new URLSearchParams(filterData).toString();
      window.open(`${import.meta.env.VITE_API_URL}/units/export/?${params}`);
    }
    


  return (
      <>
        <div className='flex flex-col p-3 text-gray-700 bg-gray-50 rounded dark:bg-gray-900 mb-3 dark:text-gray-400'>
          <div className='flex justify-between'>
            <div className='items-center flex '>
              <p className='text-2xl font-bold flex'>Units</p>
            </div>

            <div className='items-center flex text-[10px] mx-2'>
              <div className='flex m-3 items-center cursor-pointer'>
                <IoPrintSharp className='mr-1' />
                <a href="" className='text-[10px]'>Print</a>
              </div>
              <div className='flex m-3 items-center cursor-pointer'onClick={() => export_data()} >
                <TiExportOutline className='mr-1'/>
                <a href="" className='text-[10px]'>Export</a>
              </div>
              <div className='flex items-center cursor-pointer bg-blue-600 dark:bg-blue-800 dark:text-gray-300 px-3 py-1 rounded text-[12px] text-white' onClick={() => setOpenModal(true)}>
                <FaPlus className='mr-2 cursor-pointer '/>
                <button className='cursor-pointer'>Add Unit</button>
              </div>

            </div>
          </div>

          <div className='flex w-[90%] justify-between items-center text-[10px] mt-3'>

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
                className='w-[100%] text-[12px] focus:border-transparent outline-none sm:block hidden' />
            </div>

             <div className='group flex '>
                <div className='flex border relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenTypeFilter(prev => !prev)} >
                  <FiFilter className='mr-1'/>
                  <div className='flex items-center mr-5 flex-1 w-full'>
                    {typeSelected || 'All Unit Types'}
                  </div>
                  <IoIosArrowDown className={`${openTypeFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                  {openTypeFilter && (
                    <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'>
                      <div onClick={(e) => {e.stopPropagation(); setTypeSelected(''); setFilterData({...filterData, unit_type: ''}); setOpenTypeFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Unit Types</div>
                      <div onClick={(e) => {e.stopPropagation(); setTypeSelected('single'); setFilterData({...filterData, unit_type: 'single'}); setOpenTypeFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Single</div>
                      <div onClick={(e) => {e.stopPropagation(); setTypeSelected('double_room'); setFilterData({...filterData, unit_type: 'double_room'}); setOpenTypeFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Double Room</div>
                      <div onClick={(e) => {e.stopPropagation(); setTypeSelected('bedsitter'); setFilterData({...filterData, unit_type: 'bedsitter'}); setOpenTypeFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Bedsitter</div>
                      <div onClick={(e) => {e.stopPropagation(); setTypeSelected('one_bedroom'); setFilterData({...filterData, unit_type: 'one_bedroom'}); setOpenTypeFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>One Bedroom</div>
                      <div onClick={(e) => {e.stopPropagation(); setTypeSelected('two_bedroom'); setFilterData({...filterData, unit_type: 'two_bedroom'}); setOpenTypeFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Two Bedroom</div>
                    </div>
                  )}
                </div>
              
                <div className='flex border relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenBuildFilter(prev => !prev)} >
                  <FiFilter className='mr-1'/>
                  <div className='flex items-center mr-5 flex-1 w-full'>
                    {buildSelected|| 'All Build Status'}
                  </div>
                  <IoIosArrowDown className={`${openBuildFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                  {openBuildFilter && (
                    <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'>
                      <div onClick={(e) => {e.stopPropagation(); setBuildSelected(''); setFilterData({...filterData, unit_build: ''}); setOpenBuildFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Build Status</div>
                      <div onClick={(e) => {e.stopPropagation(); setBuildSelected('mabati'); setFilterData({...filterData, unit_build: 'mabati'}); setOpenBuildFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Mabati</div>
                      <div onClick={(e) => {e.stopPropagation(); setBuildSelected('block'); setFilterData({...filterData, unit_build: 'block'}); setOpenBuildFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Block</div>
                    </div>
                  )}
                </div>
              
              <div className='flex border relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenUnitFilter(prev => !prev)} >
                <FiFilter className='mr-1'/>
                <div className='flex items-center mr-5 flex-1 w-full'>
                  {unitSelected || 'All Unit Status'}
                </div>
                <IoIosArrowDown className={`${openUnitFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                {openUnitFilter && (
                  <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected(''); setFilterData({...filterData, unit_status: ''}); setOpenUnitFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Units Status</div>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('occupied'); setFilterData({...filterData, unit_status: 'occupied'}); setOpenUnitFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Occupied</div>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('maintenance'); setFilterData({...filterData, unit_status: 'maintenance'}); setOpenUnitFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Maintenance</div>
                    <div onClick={(e) => {e.stopPropagation(); setUnitSelected('vacant'); setFilterData({...filterData, unit_status: 'vacant'}); setOpenUnitFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Vacant</div>
                  </div>
                )}
              </div>

              <div className='flex border relative cursor-pointer justify-between items-center px-2 py-1 dark:border-gray-700 border-gray-200 rounded mx-2' onClick={() => setOpenRentFilter(prev => !prev)} >
                  <FiFilter className='mr-1'/>
                  <div className='flex items-center mr-5 flex-1 w-full'>
                    {rentSelected || 'All Rent Status'}
                  </div>
                  <IoIosArrowDown className={`${openRentFilter ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`}/>

                  {openRentFilter && (
                    <div className='dropdown-list p-2 border-b-3 border-blue-600 dark:bg-gray-900 dark:shadow-gray-700 dark:border-blue-800 z-50 shadow shadow-blue-200 absolute w-full top-6 left-0 right-0 rounded bg-gray-100'>
                      <div onClick={(e) => {e.stopPropagation(); setRentSelected(''); setFilterData({...filterData, rent_status: ''}); setOpenRentFilter(false)}} className='px-2 py-1 dark:hover:bg-gray-800 rounded text-left cursor-pointer hover:bg-gray-200'>All Units Status</div>
                      <div onClick={(e) => {e.stopPropagation(); setRentSelected('paid'); setFilterData({...filterData, rent_status: 'paid'}); setOpenRentFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Paid</div>
                      <div onClick={(e) => {e.stopPropagation(); setRentSelected('overdue'); setFilterData({...filterData, rent_status: 'overdue'}); setOpenRentFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Overdue</div>
                      <div onClick={(e) => {e.stopPropagation(); setRentSelected('vacant'); setFilterData({...filterData, rent_status: 'vacant'}); setOpenRentFilter(false)}} className='text-left dark:hover:bg-gray-800 rounded px-2 py-1 hover:bg-gray-200'>Vacant</div>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        {openModal && <UnitModal onClose={() => setOpenModal(false)}
           openModal={openModal} 
           setOpenModal={setOpenModal} 
           formData={formData} 
           setFormData={setFormData} 
           property={property} 
           setProperty={setProperty}
           fetchData={fetchData}
           
           />}


        <div className='text-[10px] mt-2'>
          <UnitsData 
            unit={unit}
            handleEdit={handleEdit}
            handleDelete={handleDelete} 
            loading={loading} 
            setUnit={setUnit} 
            next={next}
            previous = {previous}
            pageSize={pageSize}
            count={count}
            fetchData={fetchData}
            currentPage={currentPage}/>
        </div>
      
      
      </>
  )
}

export default Units


