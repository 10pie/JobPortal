import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector, useDispatch } from 'react-redux';
import store from '@/redux/store';
import { Button } from './ui/button';
import useSearchJobs from '@/hooks/useSearchJobs';
import { setSearchJobByText } from '@/redux/JobSlice';

const LatestJob = () => {
  const { allJobs, searchJobByText } = useSelector(store => store.job);
  console.log(allJobs);
  const { searchJobs } = useSearchJobs();
  const dispatch = useDispatch();
  
  const handleShowAllJobs = async () => {
    dispatch(setSearchJobByText(""));
    await searchJobs("");
  };

  const getTitle = () => {
    if (searchJobByText) {
      return (
        <div className="flex items-center justify-between">
          <h1 className='text-4xl font-bold'>
            <span className='text-[#6A38C2]'>"{searchJobByText}" </span> 
            Job Openings
          </h1>
          <Button 
            onClick={handleShowAllJobs}
            variant="outline"
            className="hover:bg-[#6A38C2] hover:text-white"
          >
            Show All Jobs
          </Button>
        </div>
      );
    }
    return (
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top </span> 
        Job Openings
      </h1>
    );
  };

  return (
    <div className='max-w-7xl mx-auto my-20'>
      {getTitle()}
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length <= 0 ? (
            <div className="col-span-3 text-center py-8">
              <span className="text-gray-500 text-lg">
                {searchJobByText 
                  ? `No jobs found for "${searchJobByText}". Try a different category.`
                  : "No Job Available"
                }
              </span>
            </div>
          ) : (
            allJobs?.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default LatestJob
