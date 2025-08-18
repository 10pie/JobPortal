import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/Constant'
import { setUser } from '@/redux/AuthSlice'
import { clearCompanies } from '@/redux/CompanySlice'
import { clearAllJobs } from '@/redux/JobSlice'
import { toast } from 'sonner'
const Navbar = () => {
  // const User=false;
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { User} = useSelector(store => store.auth);
  const logOutHandler= async()=>{
    try{
const res= await axios.post(`${USER_API_ENDPOINT}/logout`,{withCredentials:true});
    if(res.data.success){
      dispatch(setUser(null));
      dispatch(clearCompanies()); // Clear company data on logout
      dispatch(clearAllJobs()); // Clear job data on logout
      navigate("/");
      toast.success(res.data.message);
    }
    }
    catch(error){
      console.log(error);
            toast.error(error.response.data.message);
    }
   

  }
       
  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
      <div> <h1 className='text-2xl font-bold cursor-pointer'  ><Link to="/">Job</Link><span className='text-[#F83002]'><Link to="/">Portal</Link></span></h1></div>
        <div className='flex items-center gap-12 '>
            <ul className='flex font-medium items-center gap-5'>
              {
                User && User.role === "recruiter" ? (
                  <>
                    <li><Link to="/">Companies</Link></li>
                    <li><Link to="/admin/jobs">Jobs</Link></li>
                  </>
                ):(
                  <>
                  <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/browse">Browse</Link></li>
                  </>
                   
                )
              }
             
            </ul>
            {
                !User ? (
                    <div className='flex items-centre gap-2'>
                        <Link to="/login">  <Button variant="outline" className="cursor-pointer">Login</Button></Link>
                        <Link to="/signup"> <Button  variant="outline" className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer text-white">SignUp</Button></Link>
                      
                       
                        </div>
                ):(
                                <Popover>
  <PopoverTrigger>
    <Avatar className='cursor-pointer '>
  <AvatarImage src={User?.profile?.profilePhoto} alt='@shadcn' className='h-10 w-10 rounded-full'/>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  </PopoverTrigger>
  <PopoverContent>
    <div className='flex gap-2 space-y-2'>
     <Avatar className='cursor-pointer '>
  <AvatarImage src={User?.profile?.profilePhoto} alt='@shadcn' className='h-10 w-10 rounded-full'/>
  <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <div>
    <h4 className='font-medium'>{User?.fullname}</h4>
  <p className='text-sm text-muted-foreground'>{User?.Profile?.bio}</p>
  </div>
    </div>
      

    {
    User && User.role=="recruiter" ? (
      <>
          <div  className='flex w-fit items-centre gap-2 cursor-pointer'>
    <LogOut/>
<Button variant="link" onClick={logOutHandler} className="cursor-pointer" >Logout</Button>
</div>
      </>

    ):(
      <>
    <div className='flex flex-col text-gray-600 my-2'>
<div className='flex w-fit items-centre gap-2 cursor-pointer'>
    <User2/>
     <Button variant="link"><Link to="/profile">View Profile</Link></Button>
</div>
<div  className='flex w-fit items-centre gap-2 cursor-pointer'>
    <LogOut/>
<Button variant="link" onClick={logOutHandler} className="cursor-pointer" >Logout</Button>
</div> 
  </div>
      </>
    )
  }
  </PopoverContent>
</Popover> 
                )
            }
  
        </div>
    
        </div>
   
    </div>
   
  )
}

export default Navbar
