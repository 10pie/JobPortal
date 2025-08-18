import React, { useState } from 'react'
import Navbar from './ui/shared/navbar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import AppliedJobTable from './AppliedJobTable';
import { Badge } from './ui/badge';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;
const Profile = () => {
  const [open, setOpen] = useState(false);
  const {User} = useSelector(store=>store.auth);
  console.log(User);
  return (
    <div>
      <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={User?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{User?.fullname}</h1>
                            <p>{User?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline" onClick={() => setOpen(true)}><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{User?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{User?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-xl'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            User?.profile?.skills.length !== 0 ? User?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={User?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{User?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable/>
                
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
