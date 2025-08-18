import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({job}) => {
  console.log("Job data in LatestJobCards:", job);
  console.log("Company data:", job?.companyID);
  console.log("Position:", job?.position);
  console.log("Job Type:", job?.jobType);
  console.log("Location:", job?.location);
  
  return (
    <div>
       <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.companyID?.companyName}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position || 'No Position'}
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType || 'No Job Type'}
                </Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">
                    {job?.salary || 0}LPA
                </Badge>
            </div>

        </div>
    </div>
  )
}

export default LatestJobCards
