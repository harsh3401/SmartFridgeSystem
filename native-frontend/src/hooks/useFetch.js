import {useState, useEffect} from 'react'

const useFetch = (url='', initialState) =>{
    const [data, setData] = useState(initialState)
    const [error, setError] = useState(null)
    useEffect(()=>{
        fetch(url)
        .then(response => response.json())    
        .then(data => setData(data))    
        .catch(error => setError(error.message))
    }, [url]) 
    return [error, data]
}

export default useFetch