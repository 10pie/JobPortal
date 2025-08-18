import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { RadioGroup} from "@/components/ui/radio-group"
import { Button } from '../button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/Constant'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/AuthSlice'
const Signup = () => {
  const navigate=useNavigate();
  const {loading} = useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const [input,setInput]=useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    Password:"",
    file:"",
    role:""
  });
  const ChangeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const ChangeFileHandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]})
  }
  const SubmitHandler=async(e)=>{
    e.preventDefault();
    // console.log(input);
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    // console.log(input.fullname);
     formData.append("email",input.email);
      formData.append("phoneNumber",input.phoneNumber);
       formData.append("Password",input.Password);
        formData.append("role",input.role);
        if(input.file){
          formData.append("file",input.file);
        }
        try {
          dispatch(setLoading(true));
            const res=await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
              headers:{
            
              },
              withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
              toast.success(res.data.message);
            }
        } catch (error) {
          console.log(error);
        }
        finally{
          dispatch(setLoading(false));
        }
  };
  return (
    <div>
     <Navbar/>
     <div className='flex items-center justify-center max-w-7xl mx-auto'>
       <form onSubmit={SubmitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
       <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2'>
             <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={ChangeEventHandler}
                            placeholder="xyz"
                        />
          </div>
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
             <Label>Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={ChangeEventHandler}
                            placeholder="9xxxxxxxx"
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
                checked={input.role=='student'}
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
                 checked={input.role=='recruiter'}
                onChange={ChangeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
            <Label>Profile</Label>
            <Input
            accept="image/*"
            type="file"
            onChange={ChangeFileHandler}
             className="cursor-pointer"
            />
            </div>
          </div>
           {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">SignUp</Button>
                    }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
       </form>
     </div>
    </div>
  )
}

export default Signup
