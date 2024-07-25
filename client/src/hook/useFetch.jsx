import { useEffect, useState } from "react";
import axios from 'axios'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(()=>{
        setLoading(true)
        axios.get(url)
        .then((data) => {
            setData(data)
            setLoading(false)
        }).catch((err) =>{
            setError(err.messages)
            setLoading(false)
        })
    }, [url])

    return [data, loading, error]
}
 
export default useFetch;