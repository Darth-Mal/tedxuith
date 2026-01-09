"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "@/components/SplineScene";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      heroRef.current &&
      bgRef.current &&
      compassRef.current &&
      lettersRef.current &&
      subtitleRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1000", // scroll distance in pixels to zoom
          scrub: true,
          pin: true, // pins the hero section while zooming
        },
      });

      // Zoom the background and compass forward
      tl.to(bgRef.current, { scale: 2, ease: "power1.out" }, 0);
      tl.to(
        compassRef.current,
        { scale: 2, opacity: 0, ease: "power1.out" },
        0
      );

      // Letters fade/move slightly
      tl.to(
        lettersRef.current,
        { opacity: 0.5, y: -50, ease: "power1.out" },
        0
      );

      // Subtitle fades in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power1.out" },
        0.5
      );
    }
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-screen h-screen overflow-hidden flex flex-col"
      >
        {/* Background */}
        <div
          ref={bgRef}
          className="absolute -z-10 w-full h-full bg-[url('/tunnel.jpg')] bg-cover bg-center"
        />

        {/* Letters + Compass */}
        <div className="relative flex flex-col items-center justify-center h-full">
          <div
            ref={lettersRef}
            className="relative flex items-center justify-center w-full"
          >
            <h1 className="text-white text-[10rem] translate-x-16 font-bold z-30 -mr-6">
              C
            </h1>
            <div
              ref={compassRef}
              className="relative h-[260px] w-[260px] z-20 pointer-events-auto"
            >
              <SplineScene className="absolute inset-0 scale-50" />
            </div>
            <h1 className="text-white text-[10rem] -translate-x-16 font-bold z-10 -ml-6">
              M
            </h1>
            <h1 className="text-white text-[10rem] -translate-x-16 font-bold">
              P
            </h1>
            <h1 className="text-white text-[10rem] -translate-x-16 font-bold">
              A
            </h1>
            <h1 className="text-white text-[10rem] -translate-x-16 font-bold">
              S
            </h1>
            <h1 className="text-white text-[10rem] -translate-x-16 font-bold">
              S
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-white w-full text-center text-sm opacity-0 -translate-y-11"
          >
            Finding direction in ideas worth spreading
          </p>
        </div>
      </section>

      <section className="h-[500px] flex items-center justify-center text-white text-4xl">
        Next Section
      </section>
    </>
  );
}
