"use client";

import { X, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName?: string;
}

/* TEAM DATA */
const TEAM_DATA: Record<
  string,
  { leadName: string; statement: string; members: { name: string }[] }
> = {
  "Web Development Team": {
    leadName: "Malomo Victor Ayooluwa",
    statement:
      "The idea of TEDxUITH Ilorin came from the desire to bring a distinct level of exposure to our student and young professional community by sharing groundbreaking ideas and encouraging intellectual conversations.",
    members: [
      { name: "John Doe" },
      { name: "Jane Doe" },
      { name: "Samuel Ade" },
      { name: "Fatima Bello" },
    ],
  },
};

/* FALLBACK DATA */
const DEFAULT_TEAM = {
  leadName: "Team Lead",
  statement:
    "Our team is dedicated to bringing ideas worth spreading to the TEDxUITH Ilorin community.",
  members: [],
};

export default function TeamModal({
  isOpen,
  onClose,
  teamName,
}: TeamModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const team = TEAM_DATA[teamName || ""] || DEFAULT_TEAM;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

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
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-white text-black overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="bg-primary text-white px-6 py-2 rounded-full font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Team</span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold absolute left-1/2 -translate-x-1/2 hidden md:block">
            {teamName || "Team"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* TEAM LEAD */}
            <div className="w-full lg:w-[30%] flex flex-col">
              <p className="text-gray-600 leading-relaxed text-justify italic">
                {team.statement}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-primary text-sm font-medium">
                  — {team.leadName}
                </p>
              </div>
            </div>

            {/* TEAM MEMBERS */}
            <div className="w-full lg:w-[70%] bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold mb-6">Team Members</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
                  >
                    <p className="font-semibold text-sm text-black">
                      {member.name}
                    </p>
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
