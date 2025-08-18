import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import useGetAllJobsByUser from '@/hooks/useGetAllJobByUser';

const AppliedJobTable = () => {
    useGetAllJobsByUser();
    const {appliedJobs}=useSelector(store=>store.application);
    // const appliedJobs=[1,2,3,4,56,7];
console.log(appliedJobs);
  return (
    <div>
       <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : appliedJobs.map((appliedJob) => (
                            <TableRow >
                                <TableCell>11-08-2025</TableCell>
                                <TableCell>{appliedJob?.jobPosition?.title}</TableCell>
                                <TableCell>{appliedJob?.jobPosition?.companyID?.companyName}</TableCell>
                                <TableCell className="text-right"><Badge>{appliedJob?.status}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
    </div>
  )
}

export default AppliedJobTable
