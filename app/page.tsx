"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "@/components/SplineScene";
import CurvedLoop from "@/components/CurvedLoop";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer2HeadingRef = useRef<HTMLHeadingElement>(null);
  const layer2BodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !bgRef.current ||
      !layer1Ref.current ||
      !layer2Ref.current ||
      !layer3Ref.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: "labels", // Snaps to [0, 0.35, 0.7, 1]
          duration: { min: 0.2, max: 0.8 },
          delay: 0,
          ease: "power2.inOut",
        },
      },
    });

    // Constants for timing
    const STEP_DURATION = 0.35; // Total time for one full transition step
    const HALF_STEP = STEP_DURATION / 2; // Split time for exit/enter sequence

    /* =========================================================
      TIMELINE MAPPING (Sequential)
      0.00 -> Stage 1
      0.175 -> Gap (Layer 1 gone, Layer 2 not yet here)
      0.35 -> Stage 2
      0.525 -> Gap (Layer 2 gone, Layer 3 not yet here)
      0.70 -> Stage 3 (Arrival)
      1.00 -> End
  ========================================================= */

    // === START: STAGE 1 ===
    tl.addLabel("stage1", 0);

    /* --- TRANSITION 1 -> 2 (0.0 to 0.35) --- */

    // 1. BG Zoom (Continuous through the whole transition)
    tl.to(
      bgRef.current,
      {
        scale: 1.4,
        duration: STEP_DURATION,
        ease: "power2.inOut",
      },
      0
    );

    // 2. Layer 1 Exits FIRST (0.0 to 0.175)
    // Finishes completely before Layer 2 starts
    tl.to(
      layer1Ref.current,
      {
        scale: 2.5,
        opacity: 0,
        y: -150,
        duration: HALF_STEP,
        ease: "power2.in",
      },
      0
    );

    // 3. Layer 2 heading enters FIRST
    tl.fromTo(
      layer2HeadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      HALF_STEP
    );

    // 4. Layer 2 body enters SECOND (slightly after heading)
    tl.fromTo(
      layer2BodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      HALF_STEP + 0.15 // small stagger after heading
    );

    // === MIDDLE: STAGE 2 ===
    tl.addLabel("stage2", STEP_DURATION);

    /* --- TRANSITION 2 -> 3 (0.35 to 0.70) --- */

    // 1. BG Zoom (Continuous)
    tl.to(
      bgRef.current,
      {
        scale: 1.8,
        duration: STEP_DURATION,
        ease: "power2.inOut",
      },
      STEP_DURATION
    );

    // 2. Layer 2 Exits FIRST (0.35 to 0.525)
    tl.to(
      layer2Ref.current,
      {
        scale: 2.5,
        opacity: 0,
        y: -150,
        duration: HALF_STEP,
        ease: "power2.in",
      },
      STEP_DURATION
    );

    // 3. Layer 3 Enters SECOND (0.525 to 0.70)
    tl.fromTo(
      layer3Ref.current,
      { scale: 0.5, opacity: 0, y: 150 },
      { scale: 1, opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      STEP_DURATION + HALF_STEP // <--- Start time delayed
    );

    // === ARRIVAL: STAGE 3 ===
    tl.addLabel("stage3", 0.7);

    // === PERSIST ZONE (0.7 to 1.0) ===
    tl.to({}, { duration: 0.3 });

    // === FINAL EXIT POINT ===
    tl.addLabel("end", 1.0);
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-screen h-screen overflow-hidden bg-black"
      >
        {/* BACKGROUND */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-[url('/tunnel.jpg')] bg-cover bg-center will-change-transform"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* LAYER 1: COMPASS */}
        <div
          ref={layer1Ref}
          className="absolute h-screen w-screen inset-0 z-10 flex flex-col items-center justify-center text-white will-change-transform"
        >
          <div className="flex justify-center items-center">
            <h1 className=" text-white translate-x-16 text-frosted">C</h1>
            <div className=" text-white h-[290px] w-[300px] scale-40">
              <SplineScene />
            </div>

            <h1 className=" text-white -translate-x-16 text-frosted">MPASS</h1>
            {/* <h1 className=" text-white -translate-x-12">P</h1>
            <h1 className="text-white  -translate-x-12">A</h1>
            <h1 className="text-white  -translate-x-12">S</h1>
            <h1 className=" text-white -translate-x-12">S</h1> */}
          </div>
          <p className=" -translate-y-12 tracking-widest uppercase">
            Finding direction in ideas worth spreading
          </p>
        </div>

        {/* LAYER 2: DISCOVERY */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 will-change-transform text-center"
        >
          <h3 ref={layer2HeadingRef} className="text-[2rem]">
            COMPASS
          </h3>

          <p ref={layer2BodyRef} className="text-xl text-bold">
            A tool for finding{" "}
            <span>
              <i className="text-primary">direction</i>
            </span>{" "}
            <br />
            when the path is unclear. <br /> <br /> Not to tell you where to go,{" "}
            <br />
            but to help you decide{" "}
            <span>
              <i className="text-primary">why.</i>
            </span>{" "}
            <br /> <br />
            Guidng you to ideas that spark curiosity and <br />{" "}
            <i className="text-primary text-700">shape the future.</i>
          </p>
        </div>

        {/* LAYER 3: IDEAS */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 z-10 flex items-center justify-center text-white text-6xl font-bold opacity-0 will-change-transform"
        >
          Ideas Worth Spreading
        </div>
      </section>

      <section className="h-[800px] bg-neutral-900 text-white flex items-center justify-center">
        Next section
      </section>
      <div className="bg-black h-screen w-screen">
        <CurvedLoop />
      </div>
    </>
  );
}
