import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                   job?.companyID?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !filterJobs || filterJobs?.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="text-gray-500">No jobs found</div>
                                        <div className="text-sm text-gray-400">
                                            Create your first job to get started
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterJobs?.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>
                                        {job?.companyID?.companyName || 'N/A'}
                                    </TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{formatDate(job?.createdAt)}</TableCell>
                                    <TableCell>{job?.location}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            ₹{job?.salary} LPA
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {job?.applications?.length || 0}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='cursor-pointer' />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 bg-white border rounded-md shadow-lg p-2">
                                                <div className='flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded' 
                                                     onClick={() => navigate(`/admin/jobs/${job?._id}`)}>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div className='flex items-center gap-2 w-fit cursor-pointer p-2 hover:bg-gray-100 rounded'
                                                     onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)}>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
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

export default AdminJobsTable
