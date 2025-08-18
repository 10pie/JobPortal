import { setAllAdminJobs } from '@/redux/JobSlice'
import { JOB_API_ENDPOINT } from '@/utils/Constant'
import axios from 'axios'
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    
    const fetchAdminJobs = useCallback(async () => {
        try {
            console.log("Fetching admin jobs..."); // Debug log
            const res = await axios.get(`${JOB_API_ENDPOINT}/get-myjobs`, {
                withCredentials: true
            });
            console.log("Admin jobs response:", res.data); // Debug log
            if (res.data.success) {
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log("Error fetching admin jobs:", error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        }
    }, [dispatch]);
    
    useEffect(() => {
        fetchAdminJobs();
    }, [fetchAdminJobs]);

    return { refetch: fetchAdminJobs };
}

export default useGetAllAdminJobs