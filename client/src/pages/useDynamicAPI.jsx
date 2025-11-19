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


