import React from 'react'

const useDynamicAPI = () => {
    const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');

    const getAPI = async (endpoint) => {
        const url = endpoint.startsWith('/') ? `${API}${endpoint}` : `${API}/${endpoint}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`GET ${endpoint} Failed`);
        return response.json();
    };

    const postAPI = async (endpoint, body) => {
        const url = endpoint.startsWith('/') ? `${API.replace(/\/$/, '')}${endpoint}` : `${API.replace(/\/$/, '')}/${endpoint}`;
        const response = await fetch(url, {
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
        const url = endpoint.startsWith('/') ? `${API.replace(/\/$/, '')}${endpoint}` : `${API.replace(/\/$/, '')}/${endpoint}`;
        const response = await fetch(url, {method: 'DELETE',})
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


