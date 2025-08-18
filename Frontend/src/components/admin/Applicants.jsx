import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_ENDPOINT } from '@/utils/Constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/ApplicationSlice'
import axios from 'axios'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/applied/${params.id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.AllApplicants));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants
