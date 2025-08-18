import React, { useEffect } from 'react'
import Navbar from './ui/shared/navbar'
import Job from './Job'
import FilterCard from './FilterCard';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import useSearchJobs from '@/hooks/useSearchJobs';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/JobSlice';
import usegetAllJobs from '@/hooks/usegetAllJobs';

const Jobs = () => {
    const { allJobs, searchJobByText } = useSelector(store => store.job);
    const { searchJobs } = useSearchJobs();
    const dispatch = useDispatch();
    
    // Load all jobs when component mounts
    usegetAllJobs();

    const handleShowAllJobs = async () => {
        dispatch(setSearchJobByText(""));
        await searchJobs("");
    };

    const getJobsHeader = () => {
        if (searchJobByText) {
            return (
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className='text-2xl font-bold'>
                            Search Results for: <span className='text-[#6A38C2]'>"{searchJobByText}"</span>
                        </h1>
                        <p className='text-gray-600 mt-1'>Found {allJobs.length} job(s)</p>
                    </div>
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
            <div className="mb-4">
                <h1 className='text-2xl font-bold'>
                    <span className='text-[#6A38C2]'>All</span> Available Jobs
                </h1>
                <p className='text-gray-600 mt-1'>Browse {allJobs.length} job opportunities</p>
            </div>
        );
    };

    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/4'>
                        <FilterCard/>
                    </div>
                    <div className='flex-1'>
                        {getJobsHeader()}
                        {
                            allJobs.length <= 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {searchJobByText 
                                                ? `No jobs found for "${searchJobByText}"`
                                                : "No Jobs Available"
                                            }
                                        </h3>
                                        <p className="text-sm">
                                            {searchJobByText 
                                                ? "Try adjusting your search criteria or clear filters"
                                                : "Check back later for new opportunities"
                                            }
                                        </p>
                                        {searchJobByText && (
                                            <Button 
                                                onClick={handleShowAllJobs}
                                                variant="outline"
                                                className="mt-4"
                                            >
                                                View All Jobs
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className='h-[88vh] overflow-y-auto pb-5'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        {
                                            allJobs.map((job, index) => (
                                                <Job job={job} key={job?._id}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
