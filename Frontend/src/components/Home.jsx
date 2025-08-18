import React, { useEffect } from 'react'
import Navbar from './ui/shared/navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './ui/shared/Footer'
import usegetAllJobs from '@/hooks/usegetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const Home = () => {
  usegetAllJobs();
  const { User } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(User?.role=="recruiter"){
      navigate("/admin/companies");
    }
  },[]);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJob/>
      <Footer/>
    </div>
  )
}

export default Home
