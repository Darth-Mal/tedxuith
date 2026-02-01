"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // TARGET DATE: April 18th, 2026 at midnight
    const targetDate = new Date("2026-04-18T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update state with padded numbers
      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`min-h-1/2 bg-black flex justify-center font-main`}>
      {/* TRAPEZOID CONTAINER */}
      {/* The clip-path creates the slanted sides: (TopLeft, TopRight, BottomRight, BottomLeft) */}
      <div className="relative bg-white w-full max-w-5xl pt-24 pb-24 px-4 md:px-12 text-center [clip-path:polygon(0%_0%,100%_0%,95%_100%,5%_100%)]">
        {/* RED MARQUEE STRIP */}

        {/* NUMBERS GRID */}
        <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8 text-black">
          {/* DAYS */}
          <div className="flex flex-col items-center w-24 md:w-32">
            <span className="text-6xl md:text-8xl leading-none">
              {timeLeft.days}
            </span>
            <div className="bg-[#C60000] text-white font-sans text-xs md:text-sm py-2 w-full mt-4 tracking-widest uppercase">
              Days
            </div>
          </div>

          {/* SEPARATOR */}
          <span className="text-5xl md:text-7xl mt-2 hidden sm:block">:</span>

          {/* HOURS */}
          <div className="flex flex-col items-center w-24 md:w-32">
            <span className="text-6xl md:text-8xl leading-none">
              {timeLeft.hours}
            </span>
            <div className="bg-[#C60000] text-white font-sans text-xs md:text-sm py-2 w-full mt-4 tracking-widest uppercase">
              Hours
            </div>
          </div>

          {/* SEPARATOR */}
          <span className="text-5xl md:text-7xl mt-2 hidden sm:block">:</span>

          {/* MINUTES */}
          <div className="flex flex-col items-center w-24 md:w-32">
            <span className="text-6xl md:text-8xl leading-none">
              {timeLeft.minutes}
            </span>
            <div className="bg-[#C60000] text-white font-sans text-xs md:text-sm py-2 w-full mt-4 tracking-widest uppercase">
              Minutes
            </div>
          </div>

          {/* SEPARATOR */}
          <span className="text-5xl md:text-7xl mt-2 hidden sm:block">:</span>

          {/* SECONDS */}
          <div className="flex flex-col items-center w-24 md:w-32">
            <span className="text-6xl md:text-8xl leading-none">
              {timeLeft.seconds}
            </span>
            <div className="bg-[#C60000] text-white font-sans text-xs md:text-sm py-2 w-full mt-4 tracking-widest uppercase">
              Seconds
            </div>
          </div>
        </div>

        {/* VERTICAL LINE (Decorative element from original design) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-black opacity-20"></div>
      </div>
    </main>
  );
}
