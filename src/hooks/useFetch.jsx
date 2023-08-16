import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../Utils/api";

const useFetch = (url)=>{
    const [data, setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)

    useEffect(() => {
      
        setLoading("Loading...")
        setData(null)
        setError(null)

        fetchDataFromApi(url)
        .then(res=>{
            setLoading(false)
            setData(res)
        })
        .catch(err =>{
            setLoading(false)
            setError("Something went wrong...!!")

        })

       
    }, [url])
    return {data,error,loading};

}

export default useFetch