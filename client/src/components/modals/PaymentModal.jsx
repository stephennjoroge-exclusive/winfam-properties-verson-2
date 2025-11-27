import {useState, useEffect} from 'react'
import axios from 'axios'
import {IoMdClose} from 'react-icons/io';
import useDynamicAPI from '../../pages/useDynamicAPI';

const PaymentModal = ({openModal, setOpenModal, formData, setFormData, fetchData}) => {
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [unit, setUnit] = useState([])
  const [property, setProperty] = useState([])
  const [tenant, setTenant] = useState([])
  const [fetchingData, setFetchingData] = useState(false)
  const {postAPI, putAPI, getAPI} = useDynamicAPI();

  const handleSubmit = async (e, action) =>{
    e.preventDefault()
    setSuccess('')
    setLoading(true)
    setErrors({})

   try {
      if (formData.id) {
        await putAPI(`/payments/${formData.id}/`, formData);
      } else {
        await postAPI('/payments/',formData);
      }
      await fetchData()
      setSuccess('Payment created successfully!')

      if(action === 'exit'){
        setTimeout(() => setOpenModal(false), 2000)
      } else if (action === 'new'){
        setFormData({
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
      }
    } catch(error) {
      if(error.response && error.response.data){
        setErrors(error.response.data)
      } else {
        setErrors({general: 'Something went wrong!'})
      }
    } finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    if(!openModal) return null;
    setFetchingData(true)
    const fetchData = async ()  =>{
      try{
        const [unitResponse, tenantResponse, propertyResponse] = await Promise.all([
          getAPI('/units/'),
          getAPI('/tenants/'),
          getAPI('/property/'),
        ]);
        setTenant(tenantResponse.results || []);
        setUnit(unitResponse.results || []);
        setProperty(propertyResponse.results || []);

      } catch(error){
        console.log(error)
        setErrors({general: 'There was an error'})
      } finally{
        setFetchingData(false)
      }
    }
    fetchData()

  }, [openModal])

  const fields = [
    {name: 'tenant', label: 'Tenant', type: 'select'},
    {name: 'property', label: 'Property', type: 'select'},
    {name: 'unit', label: 'Unit', type: 'select'},
    {name: 'rent_payable', label: 'Rent Payable', type: 'number'},
    {name: 'rent', label: 'Rent', type: 'number'},
    {name: 'payment_method', label: 'Payment Method', type: 'select',
      options: [
        {value: 'mpesa', label: 'Mpesa'},
        {value: 'equity', label: 'Equity'},
        {value: 'cash', label: 'Cash'},
      ]},
    {name: 'rent_status', label: 'Rent Status', type: 'select',
      options: [
        {value: 'paid', label: 'Paid'},
        {value: 'overdue', label: 'Overdue'},
        {value: 'vacant', label: 'Vacant'},
      ]},
    {name: 'balance_brought_forward', label: 'Balance (B/F)', type: 'number'},
    {name: 'balance_carry_forward', label: 'Balance (B/C)', type: 'number'},
    {name: 'deposit', label: 'Deposit', type: 'number'},
    {name: 'date_issued', label: 'Date Issued', type: 'date'},
  ] 

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData(prev => ({...prev,[name]: value}) )
  }

  return (
     <div className='flex z-50 fixed justify-center items-center inset-0 bg-black/15'>
        <div className="bg-white relative dark:border dark:border-gray-700 text-gray-700 dark:bg-gray-900 text-[10px] dark:text-gray-400 p-6 rounded-lg w-[600px] dark:shadow-[-4px_-4px_6px_rgba(255,255,255,0.04),4px_4px_6px_rgba(0,0,0,0.5)]">
          <IoMdClose className='absolute top-0 m-2 text-sm right-0 cursor-pointer' onClick={() => setOpenModal(false)}/>

          <div className='items-start flex justify-between'>
            <div className='flex flex-col'>
              <h2 className="font-bold text-[18px] items-start flex">Payment Information</h2>
              <p className='text-[8px]'>Provide the necessary Payment's information</p>
            </div>

            <div className="ml-3 flex-1">
              {success && <p className="text-green-500 font-bold text-[12px] bg-green-50 rounded-2xl p-2">{success}</p>}
              {loading && <p className="text-gray-500 font-bold text-[12px] bg-gray-50 rounded-2xl p-2">Submitting...</p>}
              {errors.general && <p className="text-red-500 font-bold text-[12px] bg-red-50 rounded-2xl p-2">{errors.general}</p>}
            </div>
          </div>

          <form method="POST" onSubmit={handleSubmit}>
            {fields.map(({name, label, type, options}) => (
              <div key={name} className='flex'>
                <label htmlFor={label} className='flex text-[10px] items-start w-30 text-start font-bold mt-5'>{label}</label>
                {type === 'select' ? (
                  <select
                    id={name}
                    name = {name}
                    value = {formData[name]}
                    onChange={handleChange}
                    className='border-b cursor-pointer border-gray-300 text-gray-400 dark:text-gray-400 text-[9px] dark:border-gray-700 outline-none rounded-[7px] px-1 py-1 flex-1 w-full'>
                      <option className='font-bold'>Select {label}</option>
                      {name === 'property' ? 
                        property.map((items) => (
                          <option key={items.id} value={items.id}>{items.landlord_detail?.first_name} {items.landlord_detail?.last_name}</option>
                        )): ''}
                      
                      {name === 'unit' ? 
                        unit.map((items) =>(
                          <option key={items.id} value={items.id}>{items?.unit_number}</option>
                        )): ''}

                      {name === 'tenant' ?
                        tenant.map((items) => (
                          <option  key={items.id} value={items.id}>{items?.first_name} {items?.last_name}</option>
                        )): ''}

                      {options?.map((items) => (
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
                  placeholder={label}
                  className="border-b border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-700 text-[10px] outline-none rounded-[7px] px-2 py-1 flex-1 w-full"/>)}
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

export default PaymentModal
