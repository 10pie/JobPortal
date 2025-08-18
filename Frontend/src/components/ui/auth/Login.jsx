import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { RadioGroup} from "@/components/ui/radio-group"
import { Button } from '../button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/Constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading, setUser } from '@/redux/AuthSlice'
import { Loader2 } from 'lucide-react'
const Login = () => {
  const navigate=useNavigate();
   const dispatch = useDispatch();
    const { loading} = useSelector(store => store.auth);
  const [input,setInput]=useState({
    email:"",
    Password:"",
    role:"",
  });
  const ChangeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const SubmitHandler=async(e)=>{
    e.preventDefault();
    // console.log(input);
        try {
           dispatch(setLoading(true));
            const res=await axios.post(`${USER_API_ENDPOINT}/login`,input,{
              headers:{
                // "Content-Type":"application/json"
              },
              withCredentials:true,
            });
            if(res.data.success){
                dispatch(setUser(res.data.User));
                navigate("/");
              toast.success(res.data.message);
            }
        } catch (error) {
          // console.log(error);
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
        finally {
            dispatch(setLoading(false));
        }
  };
  return (
    <div>
     <Navbar/>
     <div className='flex items-center justify-center max-w-7xl mx-auto'>
       <form onSubmit={SubmitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
       <h1 className='font-bold text-xl mb-5'>Login</h1>
           <div className='my-2'>
             <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={ChangeEventHandler}
                            placeholder="xyz@gmail.com"
                        />
          </div>
             <div className='my-2'>
             <Label>Password</Label>
                        <Input
                            type="Password"
                            name="Password"
                            value={input.Password}
                            onChange={ChangeEventHandler}
                            placeholder=""
                        />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className='flex items-center space-x-2'>
                <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role=="student"}
                onChange={ChangeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
                <div className='flex items-center space-x-2'>
                <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role=="recruiter"}
                onChange={ChangeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    } 
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>SignUp</Link></span>
       </form>
     </div>
    </div>
  )
}

export default Login
