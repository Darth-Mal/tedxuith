"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Users } from "lucide-react";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName?: string;
}

// Mock data for the grid on the right
const TEAM_GRID = [
  { name: "Malomo Victor", role: "Role" },
  { name: "Malomo Victor", role: "Role" },
  { name: "Malomo Victor", role: "Role" },
  { name: "Malomo Victor", role: "Role" },
  { name: "Malomo Victor", role: "Role" },
  { name: "Malomo Victor", role: "Role" },
];

export default function TeamModal({
  isOpen,
  onClose,
  teamName,
}: TeamModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body when modal is open
      document.body.style.overflow = "hidden";

      // Animation In
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
      ></div>

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] bg-white text-black overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="bg-primary text-white px-6 py-2 rounded-full font-medium flex items-center gap-2">
            <div className="flex justify-between items-center gap-1.5">
              <Users className="w-3 h-3 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span>Team</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-sans absolute left-1/2 -translate-x-1/2 hidden md:block">
            {teamName || "Web Development Team"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-10 h-full">
            {/* LEFT COLUMN: Team Lead (Based on your screenshot) */}
            <div className="w-[20%] flex flex-col">
              {/* Red Border Box wrapper for Image */}
              <div className="relative border-8 border-primary w-full aspect-[1] max-w-sm mx-auto lg:mx-0">
                <div className="relative w-full h-full bg-gray-200">
                  {/* REPLACE WITH YOUR REAL IMAGE */}
                  <Image
                    src="/file.svg"
                    alt="Team Lead"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-left w-full">
                <h3 className=" mt-2 text-[18px] font-bold text-black font-main text-left m-0">
                  Malomo Victor Ayooluwa
                </h3>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="h-4 w-1 bg-primary"></div>
                  <p className="text-primary">Team Lead</p>
                </div>

                <p className="text-gray-600 leading-relaxed w-full text-justify">
                  Lorem ipsum dolor sit amet consectetur. Amet egestas hendrerit
                  tempor pharetra suspendisse aliquam hendrerit tempor pharetra.
                  Amet egestas hendrerit tempor pharetra suspendisse aliquam
                  hendrerit tempor pharetra.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Grid of Members */}
            <div className="w-[75%] bg-gray-50 p-6 rounded-xl h-200 ">
              <h4 className="font-bold top-0 bg-gray-50 z-10 py-2">
                Team Members
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pb-10">
                {TEAM_GRID.map((member, idx) => (
                  <div key={idx} className="flex flex-col group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden mb-3">
                      <Image
                        src="/file.svg"
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h5 className="font-bold font-main text-sm">
                      {member.name}
                    </h5>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
