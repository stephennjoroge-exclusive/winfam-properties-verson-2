import { useState } from 'react';
const useDynamicAPI = () => {
     const API = (import.meta.env.VITE_API_URL || 'https://winfam-properties-verson-2-p7uj9uihf.vercel.app.com').replace(/\/$/, '');

    const getAPI = async (endpoint) => {
        const url = endpoint.startsWith('http') ? endpoint : `${API}${endpoint}`;
        const response = await fetch(url, {
            headers: { "Accept": "application/json",}
        })
        if (!response.ok) throw new Error(`GET ${endpoint} Failed`);
        return response.json()
    }

    const postAPI = async(endpoint, body) => {
       const url = endpoint.startsWith('http') ? endpoint : `${API}${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(body)
        })
        if (!response.ok) throw new Error(`POST ${endpoint} Failed`);
        return response.json();
    }

    const deleteAPI = async (endpoint) => {
       const url = endpoint.startsWith('http') ? endpoint : `${API}${endpoint}`;
        const response = await fetch(url, {method: 'DELETE'});
        if (!response.ok) throw new Error(`DELETE ${endpoint} Failed`);
        try {
            return response.json();
        }catch(error) {
           return {}
        }
    }

    return {getAPI, postAPI, deleteAPI};
}

export default useDynamicAPI




   // At the top of Tenants.jsx (or in a utils file for reuse)
//    const API_BASE = import.meta.env.VITE_API_URL || 'https://fallback-api.com';

//    // In fetchData
//    const fetchData = async (url = '/tenants/') => {
//      try {
//        setLoading(true);
//        const params = new URLSearchParams();
//        // ... your existing param logic ...
//        const finalUrl = `${API_BASE}${url}${params.toString() ? `?${params.toString()}` : ''}`;
//        console.log(finalUrl);
       
//        const response = await fetch(finalUrl);
//        if (!response.ok) throw new Error(`HTTP ${response.status}`);
//        const data = await response.json();
       
//        setTenants(Array.isArray(data) ? data : (data.results || []));
//        setNext(data.next);
//        setPrevious(data.previous);
//        setCount(data.count);
//        const paramPage = params.get('page') ? parseInt(params.get('page')) : 1;
//        setCurrentPage(paramPage);
//      } catch (error) {
//        console.error('Fetch error:', error);
//        setErrors({ fetch: 'Failed to load tenants.' });  // Add error state if needed
//      } finally {
//        setLoading(false);
//      }
//    };

//    // In handleDelete
//    const handleDelete = async (id) => {
//      try {
//        const response = await fetch(`${API_BASE}/tenants/${id}/`, { method: 'DELETE' });
//        if (!response.ok) throw new Error(`HTTP ${response.status}`);
//        setTenants(prev => prev.filter(items => items.id !== id));
//      } catch (error) {
//        console.error('Delete error:', error);
//        // Optionally show user error
//      }
//    };

//    // export_data remains the same
//    const export_data = () => {
//      const params = new URLSearchParams(filterData).toString();
//      window.open(`${API_BASE}/tenants/export/?${params}`);
//    };

//    // For units fetch (in useEffect)
//    const fetchUnits = async () => {
//      try {
//        const response = await fetch(`${API_BASE}/units/?property_id=${selectedPropertyId}`);
//        if (!response.ok) throw new Error(`HTTP ${response.status}`);
//        const data = await response.json();
//        setUnit(data.results || []);
//      } catch (error) {
//        console.error('Units fetch error:', error);
//      }
//    };
   