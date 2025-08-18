import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/CompanySlice'
import useGetAllCompany from '@/hooks/useGetAllCompany'

const Companies = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { refetch } = useGetAllCompany(); // Get refetch function
    
    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    // Refetch companies when component mounts (when user navigates back)
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
                        placeholder="Filter by name"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className="cursor-pointer">New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies
