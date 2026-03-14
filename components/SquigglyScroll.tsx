"use client";

import { useEffect, forwardRef, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SquigglyScroll = forwardRef<SVGPathElement>((props, ref) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const pathD = `
    M70 200
    C 500 350, 100 600, 400 800
    S 550 1100, 200 1300
    S 500 1600, 250 1900
    S 100 2200, 450 2500
    S 350 2800, 500 3100
    S 150 3400, 420 3700
    S 520 4000, 300 4300
  `;

  const svgHeight = 4500;
  const svgWidth = 600;

  useEffect(() => {
    const path = (ref as React.RefObject<SVGPathElement>)?.current;
    if (!path || !svgRef.current) return;

    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
      },
    });
  }, [ref]);

  return (
    <div className="relative w-full h-[6500px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full absolute top-0 left-0 z-0"
      >
        <path
          ref={ref}
          d={pathD}
          fill="none"
          stroke="#eb0028"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-90 drop-shadow-[0_0_12px_rgba(235,0,40,0.9)]"
        />
      </svg>
    </div>
  );
});

export default SquigglyScroll;
