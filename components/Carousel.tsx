"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = () => {
  // 1. Added "name" to items to display text
  const items = [
    {
      id: 1,
      color: "bg-gray-500",
      img: "/carousel images/tech.jpg",
      name: "Technology",
    },
    {
      id: 2,
      color: "bg-gray-500",
      img: "/carousel images/edu.jpg",
      name: "Education",
    },
    {
      id: 3,
      color: "bg-gray-500",
      img: "/carousel images/entertainment.jpg",
      name: "Entertainment",
    },
    {
      id: 4,
      color: "bg-gray-500",
      img: "/carousel images/social.jpg",
      name: "Social Impact",
    },
    {
      id: 5,
      color: "bg-gray-500",
      img: "/carousel images/business.jpg",
      name: "Business and Entrepreneurship",
    },
    {
      id: 6,
      color: "bg-gray-500",
      img: "/carousel images/creativity.jpg",
      name: "Creativity and Content Creation",
    },
  ];

  const itemWidth = 400;
  const gap = 10; // Increased slightly for breathing room
  const count = items.length;
  const theta = 360 / count;
  const radius = Math.round(
    (itemWidth + gap) / (2 * Math.tan(Math.PI / count))
  );

  // 2. State to track the current position
  const [currIndex, setCurrIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 3. Automatic Rotation Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrIndex((prev) => prev + 1);
    }, 3000); // Rotates every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Calculate current active item
  // We use modulo (%) to wrap the index back to 0-5
  const activeItemIndex = currIndex % count;
  const activeItem = items[activeItemIndex];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center translate-y-10">
      <h1 className="text-4xl">Our Coordinates</h1>
      <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
        {/* Container with Perspective */}
        <div
          className="relative w-[100px] h-[100px] perspective-[1000px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="absolute w-full h-full [transform-style:preserve-3d] flex items-center justify-center"
            style={{ transform: "rotateX(-8deg)" }} // The tilt
          >
            {/* The Rotating Slider 
             Instead of animation-spin, we use a calculated transform based on currIndex 
          */}
            <div
              className="absolute w-30 h-40 [transform-style:preserve-3d] transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transform: `rotateY(${-currIndex * theta}deg)`,
              }}
            >
              {items.map((item, index) => {
                const itemRotation = theta * index;
                return (
                  <div
                    key={item.id}
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl font-bold opacity-99 border-0 border-white rounded-lg ${item.color} [backface-visibility:visible] overflow-hidden`}
                    style={{
                      // We keep your original positioning logic
                      transform: `rotateY(${itemRotation}deg) translateZ(${radius}px)`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <span className="absolute inset-0 flex items-center justify-center">
                        {/* Note: Ensure these images exist in your public folder */}
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Active Text Display */}
        <div className="mt-32 text-center transition-all duration-500">
          <h3 className="text-3xl font-bold text-white mt-10">
            {activeItem.name}
          </h3>
          {/* <div className="flex justify-center gap-1 mt-4">
            {items.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 w-1 rounded-full transition-all duration-300 ${
                  idx === activeItemIndex ? "bg-primary w-3" : "bg-gray-300"
                }`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
