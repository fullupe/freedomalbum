"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerSlide } from "@/types";
import { cn } from "@/lib/utils";

const slides: BannerSlide[] = [
  {
    id: 1,
    image_url: "https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg",
    title: "Our Special Day"
  },
  {
    id: 2,
    image_url: "https://images.pexels.com/photos/1573007/pexels-photo-1573007.jpeg",
    title: "Forever & Always"
  },
  {
    id: 3,
    image_url: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
    title: "The Beginning of Our Journey"
  },
  {
    id: 3,
    image_url: "https://res.cloudinary.com/dtho1iv7d/image/upload/v1747335807/PHOTO-2025-05-15-16-44-02_uirdk0.jpg",
    title: "The Beginning of Our Journey"
  },
  {
    id: 4,
    image_url: "https://res.cloudinary.com/dtho1iv7d/image/upload/v1747312572/banner1_akan4b.jpg",
    title: "The Beginning of Our Journey"
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  return (
    <div className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image_url}
            alt={slide.title || "Wedding photo"}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-cormorant text-4xl font-semibold text-white md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-4" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}