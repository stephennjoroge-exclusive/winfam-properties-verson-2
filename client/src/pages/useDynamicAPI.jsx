import React from 'react'

const useDynamicAPI = () => {
    const API = import.meta.env.VITE_API_URL;

    const getAPI = async (endpoint) => {
        const response = await fetch(`${API}${endpoint}`)
        if (!response.ok) {
            throw new Error(`GET ${endpoint} Failed`)
        } 
        return response.json();
    }

    const postAPI = async (endpoint, body) => {
        const response = await fetch(`${API}${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            throw new Error(`POST ${endpoint} Failed`)
        } 
        return response.json();
    }
    const deleteAPI = async (endpoint) => {
        const response = await fetch(`${API}${endpoint}`, {method: 'DELETE',})
        if (!response.ok) {
            throw new Error(`DELETE ${endpoint} Failed`)
        } 

        try {
            return response.json();
        }catch {
            return {}
        }
       
    }


  return ({getAPI, deleteAPI, postAPI})
}

export default useDynamicAPI


// import React, { useState, useEffect } from 'react';
// import { IoPrintSharp } from "react-icons/io5";
// import { FaPlus, FaRegCalendarAlt } from "react-icons/fa";
// import { TiExportOutline } from "react-icons/ti";
// import { RiSearchLine } from "react-icons/ri";
// import { IoIosArrowDown } from "react-icons/io";
// import { IoFilter } from "react-icons/io5";

// import TenantsData from '../components/data/TenantsData';
// import TenantModal from '../components/modals/TenantModal';
// import SingleTenant from '../components/data/singletenant/SingleTenant';
// import useDynamicAPI from '../hooks/useDynamicAPI'; // <-- your hook

// const Tenants = () => {
//   const { getAPI, postAPI, deleteAPI } = useDynamicAPI(); // use hook here

//   const [openModal, setOpenModal] = useState(false);
//   const [property, setProperty] = useState([]);
//   const [unit, setUnit] = useState([]);
//   const [tenants, setTenants] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [rentSelected, setRentSelected] = useState('');
//   const [unitSelected, setUnitSelected] = useState('');
//   const [openRentFilter, setOpenRentFilter] = useState(false);
//   const [openUnitFilter, setOpenUnitFilter] = useState(false);
//   const [next, setNext] = useState(null);
//   const [previous, setPrevious] = useState(null);
//   const [count, setCount] = useState(0);
//   const [pageSize] = useState(15);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [infoModal, setInfoModal] = useState(false);
//   const [filterData, setFilterData] = useState({
//     rent_status: '',
//     unit_status: '', 
//     property: ''
//   });
//   const [formData, setFormData] = useState({
//       first_name: "",
//       last_name: "",
//       id_number: "",
//       phone: "",
//       email: "",
//       property: "",
//       unit: "",
//       move_in_date: "", 
//   });
//   const [selectedPropertyId, setSelectedPropertyId] = useState(formData.property || '');

//   // Fetch Tenants using hook
//   const fetchData = async (url = '/tenants/') => {
//     setLoading(true);
//     try {
//       let query = new URLSearchParams();
//       if(filterData.unit_status) query.set('unit_status', filterData.unit_status.toLowerCase());
//       if(filterData.rent_status) query.set('rent_status', filterData.rent_status.toLowerCase());
//       if(filterData.property) query.set('property', filterData.property.toLowerCase());

//       const finalUrl = `${url}?${query.toString()}`;
//       const data = await getAPI(finalUrl);
//       setTenants(data.results || []);
//       setNext(data.next);
//       setPrevious(data.previous);
//       setCount(data.count);

//       const paramPage = query.get('page') ? parseInt(query.get('page')) : 1;
//       setCurrentPage(paramPage);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch Units when property changes
//   useEffect(() => {
//     if (!selectedPropertyId) return;

//     const fetchUnits = async () => {
//       try {
//         const data = await getAPI(`/units/?property_id=${selectedPropertyId}`);
//         setUnit(data.results || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUnits();
//   }, [selectedPropertyId, getAPI]);

//   useEffect(() => {
//     fetchData();
//   }, [filterData, unitSelected, rentSelected]);

//   // Edit Tenant
//   const handleEdit = (id) => {
//     const tenantEdit = tenants.find(items => items.id === id);
//     if(!tenantEdit) return;
//     setFormData(tenantEdit);
//     setOpenModal(true);
//   };

//   // Delete Tenant using hook
//   const handleDelete = async (id) => {
//     try {
//       await deleteAPI(`/tenants/${id}/`);
//       setTenants(prev => prev.filter(item => item.id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Export Tenants
//   const export_data = () => {
//     const params = new URLSearchParams(filterData).toString();
//     window.open(`${import.meta.env.VITE_API_URL}/tenants/export/?${params}`);
//   };

//   return (
//     <>
//       {/* ... all your JSX remains mostly unchanged ... */}
//       {/* pass fetchData, handleEdit, handleDelete, etc., as props */}
//       {openModal && <TenantModal 
//         selectedPropertyId={selectedPropertyId}
//         setSelectedPropertyId={setSelectedPropertyId}
//         openModal={openModal}
//         fetchData={fetchData}
//         setOpenModal={setOpenModal}
//         setTenants={setTenants}
//         property={property}
//         unit={unit}
//         formData={formData}
//         setFormData={setFormData}
//       />}

//       <TenantsData
//         tenants={tenants}
//         formData={formData}
//         loading={loading}
//         setTenants={setTenants}
//         handleDelete={handleDelete}
//         handleEdit={handleEdit}
//         filterData={filterData}
//         unitSelected={unitSelected}
//         rentSelected={rentSelected}
//         count={count}
//         pageSize={pageSize}
//         next={next}
//         previous={previous}
//         currentPage={currentPage}
//         fetchData={fetchData}
//         setInfoModal={setInfoModal}
//       />

//       {infoModal && <SingleTenant
//         id={infoModal}
//         setInfoModal={setInfoModal}
//         tenants={tenants}
//         setTenants={setTenants}
//       />}
//     </>
//   );
// };

// export default Tenants;

// import { useState, useEffect } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import useDynamicAPI from '../hooks/useDynamicAPI'; // import your hook

// const PaymentModal = ({ openModal, setOpenModal, formData, setFormData, fetchData }) => {
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [unit, setUnit] = useState([]);
//   const [property, setProperty] = useState([]);
//   const [tenant, setTenant] = useState([]);
//   const [fetchingData, setFetchingData] = useState(false);

//   const { getAPI, postAPI, deleteAPI } = useDynamicAPI(); // use your hook

//   const handleSubmit = async (e, action) => {
//     e.preventDefault();
//     setSuccess('');
//     setLoading(true);
//     setErrors({});

//     try {
//       if (formData.id) {
//         await postAPI(`payments/${formData.id}/`, formData); // update via postAPI or create a separate putAPI in your hook
//       } else {
//         await postAPI('payments/', formData);
//       }

//       await fetchData();
//       setSuccess('Payment created successfully!');

//       if (action === 'exit') {
//         setTimeout(() => setOpenModal(false), 2000);
//       } else if (action === 'new') {
//         setFormData({
//           tenant: '',
//           property: '',
//           unit: '',
//           rent_payable: '',
//           rent: '',
//           payment_method: '',
//           rent_status: '',
//           balance_brought_forward: '',
//           balance_carry_forward: '',
//           deposit: '',
//           date_issued: '',
//         });
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrors(error.response.data);
//       } else {
//         setErrors({ general: 'Something went wrong!' });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!openModal) return;
//     setFetchingData(true);

//     const fetchAllData = async () => {
//       try {
//         const [unitResponse, tenantResponse, propertyResponse] = await Promise.all([
//           getAPI('units/'),
//           getAPI('tenants/'),
//           getAPI('property/'),
//         ]);

//         setTenant(tenantResponse.results || tenantResponse);
//         setUnit(unitResponse.results || unitResponse);
//         setProperty(propertyResponse.results || propertyResponse);
//       } catch (error) {
//         console.log(error);
//         setErrors({ general: 'There was an error' });
//       } finally {
//         setFetchingData(false);
//       }
//     };

//     fetchAllData();
//   }, [openModal, getAPI]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // rest of your JSX remains the same
//   return (
//     <div className='flex z-50 fixed justify-center items-center inset-0 bg-black/15'>
//       {/* ...your modal JSX */}
//     </div>
//   );
// };

// export default PaymentModal;






