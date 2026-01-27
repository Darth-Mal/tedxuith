"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Ensure you are using this component

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed z-50 flex items-center justify-between transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? // STYLES WHEN SCROLLED (Floating, blurred, curved, narrower)
              "top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg py-3 px-8"
            : // STYLES AT TOP (Full width, transparent, no borders)
              "top-0 left-0 w-full bg-transparent py-6 px-12"
        }`}
      >
        {/* Logo Container */}
        <div className="relative h-10 w-32 flex items-center justify-center">
          {/* Switched to standard html img tag for simplicity based on your snippet, 
              but consider using <Image /> with width/height for optimization */}
          <a href="/">
            {" "}
            <img
              className="h-full object-contain"
              src="/logo-white.png"
              alt="TEDxUITH Ilorin logo"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex w-[40%] justify-evenly items-center text-white">
          <div className="cursor-pointer hover:text-gray-300 transition-colors">
            <a href="/about">
              <p>About</p>
            </a>
          </div>

          <div className="cursor-pointer hover:text-gray-300 transition-colors">
            <a href="/speakers">
              {" "}
              <p>Speakers</p>
            </a>
          </div>
          <div className="cursor-pointer hover:text-gray-300 transition-colors">
            <a href="/attend">
              {" "}
              <p>Attend</p>
            </a>
          </div>
          <div className="cursor-pointer hover:text-gray-300 transition-colors">
            <a href="/sponsors">
              <p>Sponsors</p>
            </a>
          </div>
          {/* CTA Button Example */}
          <div className="cursor-pointer hover:text-gray-300 transition-colors">
            <a href="/contact">
              <p>Contact</p>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
