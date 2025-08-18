import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import useSearchJobs from '@/hooks/useSearchJobs';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/JobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const { searchJobs } = useSearchJobs();
    const dispatch = useDispatch();

    const handleCategoryClick = async (categoryText) => {
        dispatch(setSearchJobByText(categoryText));
        await searchJobs(categoryText);
    };

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Button 
                                    onClick={() => handleCategoryClick(cat)}
                                    variant="outline" 
                                    className="rounded-full hover:bg-[#6A38C2] hover:text-white transition-colors"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel