import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import useSearchJobs from '@/hooks/useSearchJobs'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/JobSlice'

const HeroSection = () => {
    const [searchInput, setSearchInput] = useState("");
    const { searchJobs } = useSearchJobs();
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmedInput = searchInput.trim();
        
        // Update Redux state with search text
        dispatch(setSearchJobByText(trimmedInput));
        
        // Call search API with the input (empty string will return all jobs)
        await searchJobs(trimmedInput);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        
        // If user clears the input completely, show all jobs
        if (e.target.value.trim() === "") {
            dispatch(setSearchJobByText(""));
            searchJobs("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Discover thousands of opportunities across top companies. Build your career with ease by searching, applying, and landing your dream job today.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyUp={handleKeyPress}
                    />
                    <Button 
                        onClick={handleSearch}
                        className="rounded-r-full bg-[#6A38C2] hover:bg-[#5a2ba6] transition-colors"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection