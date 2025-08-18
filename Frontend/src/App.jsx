import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/ui/shared/navbar'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Description from './components/Description'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'
const appRouter= createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },{
    path:"/login",
    element:<Login/>
  },{
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
    {
    path:"/profile",
    element:<Profile/>
  },
     {
    path:"/profile",
    element:<Profile/>
  },
     {
    path:"/description/:id",
    element:<Description/>
  },
  //for admin
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
     path:"/admin/companies/create",
    element:<CreateCompany/>
  },
    {
     path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
    {
    path:"/admin/jobs/create",
    element:<CreateJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  }
])
function App() {
  return (
    <>
  <RouterProvider router={appRouter}/>
    </>
    
  )
}

export default App
