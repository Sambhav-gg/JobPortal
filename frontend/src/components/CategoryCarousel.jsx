import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="my-20">
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-6 py-3 border-2 border-purple-500 text-purple-500 
                hover:scale-105 hover:bg-gradient-to-r from-purple-600 to-blue-600 hover:text-white 
                transition-transform duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
