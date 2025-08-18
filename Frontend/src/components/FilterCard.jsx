import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useSearchJobs from '@/hooks/useSearchJobs'
import { setSearchJobByText } from '@/redux/JobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
]

const FilterCard = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const { searchJobs } = useSearchJobs();
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmedInput = searchInput.trim();
        
        dispatch(setSearchJobByText(trimmedInput));
        await searchJobs(trimmedInput);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        
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

    const handleRadioChange = async (value) => {
        setSelectedFilter(value);
        dispatch(setSearchJobByText(value));
        await searchJobs(value);
    };

    const handleClearFilters = async () => {
        setSearchInput("");
        setSelectedFilter("");
        dispatch(setSearchJobByText(""));
        await searchJobs("");
    };

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            
            {/* Search Input */}
            <div className='my-4'>
                <h2 className='font-semibold text-md mb-2'>Search Jobs</h2>
                <div className='flex shadow-sm border border-gray-200 rounded-md items-center'>
                    <input
                        type="text"
                        placeholder='Search by title, company...'
                        className='outline-none border-none w-full p-2 text-sm'
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <Button 
                        onClick={handleSearch}
                        className="rounded-r-md bg-[#6A38C2] hover:bg-[#5a2ba6] px-3"
                        size="sm"
                    >
                        <Search className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            {/* Clear Filters Button */}
            <div className='my-4'>
                <Button 
                    onClick={handleClearFilters}
                    variant="outline"
                    className="w-full text-sm"
                >
                    Clear All Filters
                </Button>
            </div>

            <RadioGroup value={selectedFilter} onValueChange={handleRadioChange}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, itemIndex) => {
                                    return (
                                        <div key={itemIndex} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={`${index}-${itemIndex}`}/>
                                            <Label htmlFor={`${index}-${itemIndex}`} className="cursor-pointer">{item}</Label>
                                        </div>  
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
