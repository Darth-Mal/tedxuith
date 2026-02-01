"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
            ? "top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg py-3 px-6"
            : "top-0 left-0 w-full bg-transparent py-6 px-6 md:px-12"
        }`}
      >
        {/* Logo */}
        <a href="/" className="h-10 w-32 flex items-center">
          <img
            className="h-full object-contain"
            src="/logo-white.png"
            alt="TEDxUITH Ilorin logo"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex w-[40%] justify-evenly items-center text-white">
          {["About", "Speakers", "Attend", "Sponsors", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="hover:text-gray-300 transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-0 z-40 bg-black/90 backdrop-blur-md transition-all duration-300 ease-in-out
        ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="pt-24 pb-8 flex flex-col items-center space-y-6 text-white text-lg">
          {["About", "Speakers", "Attend", "Sponsors", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-300 transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
