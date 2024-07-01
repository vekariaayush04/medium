import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config/config'

const useBlog = () => {
    const [loding,setLoading] = useState(true)
    const [blog,setBlog] = useState([{
        content : "",
        title : "",
        id : "",
        author : {
            name : ""
        }
    }])

    const token = localStorage.getItem('token')

    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{
            headers:{
                Authorization:token
            }
        })
        .then((response) =>{
            const data = response.data
            setBlog(data)
            setLoading(false)
        })
    },[])

    return{
        loding,
        blog
    }
}

export default useBlog
