import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, Link2, MoreHorizontal } from 'lucide-react'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { Link, useNavigate } from 'react-router-dom'
import Companies from './Companies'
import { useSelector } from 'react-redux'
// import {useGetAllCompany} from '@hooks/useGetAllCompany'
const CompaniesTable = () => {
    const {companies,searchCompanyByText}=useSelector(store=>store.company);
    const [filterCompany,setFilterCompany]=useState(companies);
    console.log(companies);
    const navigate=useNavigate();
    useEffect(()=>{
      const filteredCompany = companies.length >=0 && companies.filter((companies)=>{
        if(!searchCompanyByText){
            return true;
        }
        return companies?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
      setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((filterCompany) => (
                            <TableRow key={filterCompany._id}>
                                <TableCell>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={filterCompany?.logo} alt={filterCompany?.companyName}/>
                                        <AvatarFallback>
                                            {filterCompany?.companyName?.charAt(0)?.toUpperCase() || 'C'}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{filterCompany?.companyName}</TableCell>
                                <TableCell>{new Date(filterCompany?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className='cursor-pointer'/></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span><Link onClick={()=>navigate(`/admin/companies/${filterCompany?._id}`)}>Edit</Link></span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
    </div>
  )
}

export default CompaniesTable
