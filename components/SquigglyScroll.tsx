"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SquigglyScroll() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return;

    const path = pathRef.current;

    // Get full path length
    const length = path.getTotalLength();

    // Hide path initially
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate drawing on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 20%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
      {/* Extra scroll space */}

      <div className="flex justify-center items-center py-50">
        <svg
          ref={svgRef}
          viewBox="0 0 595.28 841.89"
          width="800"
          className="max-w-full"
        >
          <path
            ref={pathRef}
            d="M129.35,53.38c68.33-16.92,312.01-68.14,263.44,75.94c-56.36,167.2,41.33,56.36,69.51,71.39
			c28.18,15.03,10.33,53.54-31.94,86.42s-272.41,76.09-263.95,2.82c8.45-73.27,112.72,35.69,142.78,126.81
			c30.06,91.12,131.51-17.85,152.17,24.42c20.67,42.27-148.42,188.81-279.92,142.78s-83.6,59.18,27.24,68.57s165.32-39.45,209.47,31
			c41.87,66.82,91.35,51.67,69.89,116.46"
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            stroke-miterlimit="10"
            stroke-dasharray="12"
            // strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
