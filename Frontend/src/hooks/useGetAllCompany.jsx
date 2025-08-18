// import Companies from '@/components/admin/Companies';
import { setCompanies } from '@/redux/CompanySlice';
import store from '@/redux/store'
import { APPLICATION_API_ENDPOINT, COMPANY_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllCompany = () => {
    const company = useSelector((store) => store.company.companies);
    const dispatch = useDispatch();
    
    const fetchAllCompany = useCallback(async () => {
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {withCredentials: true});
            console.log("Fetching companies:", res);
            if(res.data.success) {
                dispatch(setCompanies(res.data.company));
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchAllCompany();
    }, [fetchAllCompany]);

    return { company, refetch: fetchAllCompany };
}

export default useGetAllCompany
