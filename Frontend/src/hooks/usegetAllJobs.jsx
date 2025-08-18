import { setAllJobs, setSearchJobByText } from '@/redux/JobSlice';
import { JOB_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const usegetAllJobs = () => {
const dispatch = useDispatch();
useEffect(()=>{
    const fetchAllJobs = async()=>{
        try{
            const res=await axios.get(`${JOB_API_ENDPOINT}/get-jobs`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
                dispatch(setSearchJobByText("")); // Reset search text when loading all jobs
            }
        }
        catch(error){
            console.log(error);
        }
    }
    fetchAllJobs();
},[])
}

export default usegetAllJobs;
