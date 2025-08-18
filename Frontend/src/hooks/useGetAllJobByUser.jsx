import { setAppliedJobs } from "@/redux/ApplicationSlice";
import { APPLICATION_API_ENDPOINT }  from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

const useGetAllJobsByUser= ()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
    const fetchAllJobsByUser = async()=>{
        try{
            const res=await axios.get(`${APPLICATION_API_ENDPOINT}/applied`,{withCredentials:true});
            console.log(res);
            
            if(res.data.success){
                dispatch(setAppliedJobs(res.data.AppliedJobs));
                // Reset search text when loading all jobs
            }
        }
        catch(error){
            console.log(error);
        }
    }
    fetchAllJobsByUser();
},[])
return;
}
export default useGetAllJobsByUser;
