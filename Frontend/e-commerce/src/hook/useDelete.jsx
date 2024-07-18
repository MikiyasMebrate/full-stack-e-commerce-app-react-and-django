import axios from "axios";
import { useState, useEffect } from "react";

const useDelete = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    setLoading(true)
    const fetchData =  () => {
        axios.delete(url)
        .then(response => {
            setData(response)
            setLoading(false)
        }).catch(err => {
            setError(err)
            setLoading(false)
        })
    };

    fetchData();
  }, [url]);

  return [ data, loading, error ];
};

export default useDelete;
