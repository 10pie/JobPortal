import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import { toast } from 'sonner';
import { setSingleJob } from '@/redux/JobSlice';

const Description = () => {
  const { User } = useSelector(store => store.auth);
  const params = useParams();
  const dispatch = useDispatch();
  
  // Local state for this specific job
  const [currentJob, setCurrentJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const jobId = params.id;

  console.log("IsApplied:- ", isApplied);
  console.log("Current job:", currentJob);

  // Fetch job data when component mounts or jobId changes
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        console.log("Fetching job with ID:", jobId);
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
        console.log("Single job response:", res.data);
        
        if (res.data.success) {
          const jobData = res.data.jobs;
          setCurrentJob(jobData);
          
          // Check if user has already applied to THIS specific job
          const hasApplied = jobData.applications?.some(
            application => String(application.applicant) === String(User?._id)
          );
          setIsApplied(hasApplied);
          
          // Optionally update Redux store for this specific job
          dispatch(setSingleJob(jobData));
        }
      } catch (error) {
        console.error("Error fetching single job:", error);
      }
    };

    if (jobId && User?._id) {
      fetchSingleJob();
    }
  }, [jobId, User?._id, dispatch]);

  const applyJobHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`, 
        {}, 
        { withCredentials: true }
      );
      
      console.log(res);
      if (res.data.success) {
        // Update local state immediately
        setIsApplied(true);
        
        // Update local job data
        const updatedJob = {
          ...currentJob,
          applications: [...(currentJob.applications || []), { applicant: User?._id }]
        };
        setCurrentJob(updatedJob);
        
        // Update Redux only for this specific job
        dispatch(setSingleJob(updatedJob));
        
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Application failed');
    } finally {
      setLoading(false);
    }
  };
  // Don't render until we have job data
  if (!currentJob) {
    return (
      <div className='max-w-7xl mx-auto my-10 flex justify-center'>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
       <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{currentJob?.title || 'Job Title'}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{currentJob?.position || 0} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{currentJob?.jobType || 'Full Time'}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{currentJob?.salary || '0'} LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied || loading}
                    onClick={isApplied ? null : applyJobHandler}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {loading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{currentJob?.title || 'N/A'}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{currentJob?.location || 'N/A'}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{currentJob?.description || 'N/A'}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{currentJob?.experience || 0} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{currentJob?.salary || 0} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{currentJob?.applications?.length || 0}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{currentJob?.createdAt ? new Date(currentJob.createdAt).toLocaleDateString() : 'N/A'}</span></h1>
            </div>
        </div>
  )
}

export default Description
