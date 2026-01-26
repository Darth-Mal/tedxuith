"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Users, ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Malomo Victor",
    role: "Web Development Team Lead",
    color: "bg-stone-300",
  },
  { name: "Seyi Doe", role: "Designer", color: "bg-blue-300" },
  { name: "John Smith", role: "Manager", color: "bg-green-300" },
  { name: "Jane Auston", role: "Engineer", color: "bg-yellow-300" },
  { name: "Alex Tunde", role: "Content", color: "bg-purple-300" },
  { name: "Sarah Cole", role: "Marketing", color: "bg-pink-300" },
];

export default function TeamCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const angle = useRef(270); // Start at 270 (Top)
  const [dragStart, setDragStart] = useState<number | null>(null);

  const radiusX = 800;
  const radiusY = 200;
  const spread = 15;

  // Duplicate more times to ensure no gaps during fast spins
  const displayCards = [
    ...teamMembers,
    ...teamMembers,
    ...teamMembers,
    ...teamMembers,
    ...teamMembers,
    ...teamMembers,
  ];

  const updatePositions = () => {
    if (!containerRef.current) return;
    const elements = containerRef.current.children;

    Array.from(elements).forEach((el, i) => {
      const indexOffset = i - Math.floor(displayCards.length / 2);
      const currentAngleDeg = angle.current + indexOffset * spread;

      const a = (currentAngleDeg * Math.PI) / 180;

      // 1. Position Math
      const x = radiusX * Math.cos(a);
      const y = radiusY * Math.sin(a);

      // 2. Normalize angle to 0-360 range for calculations
      let normalized = currentAngleDeg % 360;
      if (normalized < 0) normalized += 360;

      // 3. Calculate Distance from Top Center (270)
      // This logic ensures 350deg is considered close to 10deg (wrapping)
      let distFromTop = 270 - normalized;

      // Handle the wrapping boundary (so 0 and 360 connect smoothly)
      if (distFromTop < -180) distFromTop += 360;
      if (distFromTop > 180) distFromTop -= 360;

      // 4. Rotation Logic
      // Now we use 'distFromTop' which is always between -180 and 180.
      // This guarantees the card never flips upside down accidentally.
      const rotation = distFromTop * 0.2; // 0.2 makes the fanning subtle

      // 5. Styles
      // Scale based on how close to top (0 distance)
      const absDist = Math.abs(distFromTop);
      const scale = Math.max(0.4, 1 - absDist / 90);
      const zIndex = Math.round(-y);
      const opacity = Math.max(0, 1 - absDist / 60);
      const grayscale = Math.min(1, absDist / 20);

      const textContent = el.querySelector(".info-box");
      const redBg = el.querySelector(".red-bg");

      gsap.to(el, {
        x: x,
        y: y + radiusY,
        rotation: rotation,
        scale: scale,
        zIndex: zIndex,
        opacity: opacity,
        filter: `grayscale(${grayscale})`,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto", // Prevents GSAP conflicts
      });

      // Active State (strict center check)
      const isCenter = absDist < 8;

      if (textContent) {
        gsap.to(textContent, {
          opacity: isCenter ? 1 : 0,
          y: isCenter ? 0 : 40,
          duration: 0.4,
          pointerEvents: isCenter ? "auto" : "none",
        });
      }

      if (redBg) {
        gsap.to(redBg, {
          opacity: isCenter ? 1 : 0,
          duration: 0.4,
        });
      }
    });
  };

  useEffect(() => {
    updatePositions();
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    const clientX =
      "changedTouches" in e
        ? e.changedTouches[0].clientX
        : (e as React.MouseEvent).clientX;
    const delta = clientX - dragStart;

    if (delta > 40) prev();
    else if (delta < -40) next();

    setDragStart(null);
  };

  const next = () => {
    angle.current -= spread;
    updatePositions();
  };

  const prev = () => {
    angle.current += spread;
    updatePositions();
  };

  // --- NEW CODE START ---
  // Auto-rotate every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if user is currently dragging to avoid conflict
      if (dragStart === null) {
        next();
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [dragStart]); // Reset timer if interaction happens
  // --- NEW CODE END ---

  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden flex flex-col items-center justify-center font-sans">
      <h3 className="absolute top-8 text-white text-5xl font-main-italic z-20 pointer-events-none">
        The Team
      </h3>

      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center touch-pan-y mt-20"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        style={{ cursor: "grab", perspective: "1200px" }}
      >
        {displayCards.map((member, i) => (
          <div
            key={i}
            className="absolute origin-center flex justify-center"
            style={{ width: "200px", height: "300px" }}
          >
            <div className="red-bg absolute -inset-3 bg-primary z-0 opacity-0">
              {" "}
              <div className="absolute z-50 flex w-full overflow-x-hidden">
                <div className=" flex flex-col -translate-x-2 w-full items-start">
                  <h3 className="text-black m-0 font-bold text-[24px] ">X</h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-4">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-8">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-12">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-16">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-20">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-24">
                    {" "}
                    X{" "}
                  </h3>
                </div>
                <div className="flex flex-col translate-x-2 w-full items-end">
                  <h3 className="text-black m-0 font-bold text-[24px] ">X</h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-4">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-8">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-12">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-16">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-20">
                    {" "}
                    X{" "}
                  </h3>
                  <h3 className="text-black m-0 font-bold text-[24px] -translate-y-24">
                    {" "}
                    X{" "}
                  </h3>
                </div>
              </div>
            </div>
            <div
              className={`relative w-full h-[200px] z-10 overflow-hidden bg-cyan-800`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://via.placeholder.com/300)`,
                  mixBlendMode: "normal",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
            <div className="info-box absolute -bottom-1.5  w-[270px] bg-white p-3 shadow-2xl z-20 opacity-0 transition-opacity ">
              <h3 className="text-[16px] font-bold text-black font-main text-left m-0">
                {member.name}
              </h3>
              <div className="flex justify-between h-[14px] items-center">
                <div className="flex items-center h-full">
                  {" "}
                  <div className="mr-1 w-[2px] h-full bg-primary"></div>
                  <p className="font-[400] text-black">{member.role}</p>
                </div>
                <div>
                  <Image
                    src={"/logo-black.png"}
                    width={50}
                    height={50}
                    alt="logo"
                  ></Image>
                </div>
              </div>

              <button className="group relative flex items-center justify-center gap-2 bg-primary hover:bg-#eb0028e6  text-white text-[10px] font-medium tracking-wide py-1.5 px-4 rounded-full transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:pr-3 pl-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3 opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span>Team</span>
                </div>

                <ArrowRight className="w-3 h-3 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 w-full flex justify-between px-10 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          &larr;
        </button>
        <button
          onClick={next}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
