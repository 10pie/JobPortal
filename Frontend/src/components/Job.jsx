import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    console.log("Job data:", job);
    console.log("Company logo URL:", job?.companyID?.logo);
    console.log("Company name:", job?.companyID?.companyName);
    
    const navigate=useNavigate();

    // Helper function to check if URL is valid
    const isValidImageUrl = (url) => {
        return url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'));
    };

    const daysAgoFunction = (mongodbTime) =>{
        const createdAt= new Date(mongodbTime);
        const currentTime= new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
// const id="ajhfdsohe";
  return (
    <div>
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>  {daysAgoFunction(job?.createdAt)==0 ? "Today" : `${daysAgoFunction(job?.createdAt)}`} days ago </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <div className="flex-shrink-0">
                    <Avatar className="w-12 h-12 border-2 border-gray-200">
                        {isValidImageUrl(job?.companyID?.logo) ? (
                            <AvatarImage 
                                src={job?.companyID?.logo} 
                                alt={job?.companyID?.companyName}
                                onError={(e) => {
                                    console.log("Image failed to load:", job?.companyID?.logo);
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Logo</span>
                            </div>
                        )}
                        <AvatarFallback className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {job?.companyID?.companyName?.charAt(0)?.toUpperCase() || 'C'}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-medium text-lg'>{job?.companyID?.companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
               <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position || 'No Position'}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType || 'No Job Type'}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary || 0}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button  variant="outline" onClick={()=> navigate(`/description/${job?._id}`)}> Details </Button>
                <Button disabled className="bg-[#7209c9]" >Verfied By JobPortal</Button>
            </div>
        </div>
    </div>
  )
}

export default Job
