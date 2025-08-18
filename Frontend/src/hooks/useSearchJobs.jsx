import { setAllJobs } from '@/redux/JobSlice';
import { JOB_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const useSearchJobs = () => {
    const dispatch = useDispatch();
    
    const searchJobs = async (keyword = "") => {
        try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/get-jobs?keyword=${encodeURIComponent(keyword)}`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log("Error searching jobs:", error);
        }
    };

    return { searchJobs };
};

export default useSearchJobs;
