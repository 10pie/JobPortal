import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Badge } from '../ui/badge'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_ENDPOINT } from '@/utils/Constant'
import axios from 'axios'

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_ENDPOINT}/status/${id}`, { status }, { withCredentials: true });
            
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-gray-500">No applicants found</div>
                                        <div className="text-sm text-gray-400">
                                            No one has applied for this job yet
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            applicants?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            item?.applicant?.profile?.resume ? 
                                            <a 
                                                className="text-blue-600 cursor-pointer hover:underline" 
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName || 'View Resume'}
                                            </a> : 
                                            <span className="text-gray-400">No Resume</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={
                                                item?.status === 'accepted' ? 'default' : 
                                                item?.status === 'rejected' ? 'destructive' : 
                                                'secondary'
                                            }
                                            className="capitalize"
                                        >
                                            {item?.status || 'pending'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 bg-white border rounded-md shadow-lg p-2">
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div 
                                                                onClick={() => statusHandler(status, item?._id)} 
                                                                key={index} 
                                                                className='flex w-fit items-center my-2 cursor-pointer p-2 hover:bg-gray-100 rounded'
                                                            >
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
