import React from 'react'
import Job from './Job'
import Navbar from './ui/shared/navbar';
import { useSelector } from 'react-redux';
import Jobs from './Jobs';
// const allJobs=[0,1,2,5,6,77,9];

const Browse = () => {
    const {allJobs}=useSelector(store=>store.job);
  return (
    <div>
       <Navbar/>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                 <Job job={job}  key={job?._id}/>
                            )
                        })
                    }
                </div>

            </div>
    </div>
  )
}

export default Browse
