import { setAllJobs } from '@/redux/JobSlice';
import { JOB_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const useAdvancedSearch = () => {
    const dispatch = useDispatch();
    
    const searchJobsWithFilters = async (filters = {}) => {
        try {
            const { keyword = "", salaryRange = "" } = filters;
            
            // Build query parameters
            const params = new URLSearchParams();
            if (keyword) params.append('keyword', keyword);
            if (salaryRange) params.append('salaryRange', salaryRange);
            
            const queryString = params.toString();
            const url = `${JOB_API_ENDPOINT}/get-jobs${queryString ? `?${queryString}` : ''}`;
            
            console.log("Advanced search URL:", url);
            
            const res = await axios.get(url, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log("Error in advanced search:", error);
        }
    };

    return { searchJobsWithFilters };
};

export default useAdvancedSearch;
