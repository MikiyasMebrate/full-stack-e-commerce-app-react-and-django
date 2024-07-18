import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url, refetch) => {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setPending(true)
        axios.get(url)
        .then((data) =>{
            setData(data.data)
            setPending(false)
            console.log(data.data)
        })
        .catch((err) =>{
            setError(err)
            setPending(false)
        })
    },[url, refetch])

    return [data, pending, error]
}


 
export default useFetch;