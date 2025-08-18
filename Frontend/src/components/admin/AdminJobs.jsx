import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import AdminJobsTable from './AdminJobsTable'
import { setSearchJobByText } from '@/redux/JobSlice'

const AdminJobs = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs } = useSelector(store => store.job);
    
    const { refetch } = useGetAllAdminJobs();
    
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    // Refetch jobs when component mounts (when user navigates back)
    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by job title"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} className="cursor-pointer">
                        New Job
                    </Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs
