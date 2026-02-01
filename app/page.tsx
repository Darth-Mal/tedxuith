"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "@/components/SplineScene";
import CurvedLoop from "@/components/CurvedLoop";
import Carousel from "@/components/Carousel";
// import ScrollFade from "@/components/MotivationPage";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer2HeadingRef = useRef<HTMLHeadingElement>(null);
  const layer2BodyRef = useRef<HTMLParagraphElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !bgRef.current ||
      !layer1Ref.current ||
      !layer2Ref.current ||
      !layer2HeadingRef.current ||
      !layer2BodyRef.current ||
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
        // toggleActions: "play none none reverse",
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
      0,
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
      0,
    );

    // 3. Layer 2 heading enters FIRST
    tl.fromTo(
      layer2HeadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      HALF_STEP,
    );

    // 4. Layer 2 body enters SECOND (slightly after heading)
    tl.fromTo(
      layer2BodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      HALF_STEP + 0.01, // small stagger after heading
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
      STEP_DURATION,
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
      STEP_DURATION,
    );

    // 3. Layer 3 Enters SECOND (0.525 to 0.70)
    tl.fromTo(
      layer3Ref.current,
      { scale: 0.5, opacity: 0, y: 150 },
      { scale: 1, opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      STEP_DURATION + HALF_STEP, // <--- Start time delayed
    );

    // === ARRIVAL: STAGE 3 ===
    tl.addLabel("stage3", 0.7);

    // === PERSIST ZONE (0.7 to 1.0) ===
    tl.to({}, { duration: 0.3 });

    // === FINAL EXIT POINT ===
    tl.addLabel("end", 1.0);

    // Hide initially (GSAP owns visibility — not Tailwind)
    gsap.set(journeyRef.current, { opacity: 0, x: 80 });

    // Viewport-based trigger (works with pinned sections)
    ScrollTrigger.create({
      trigger: journeySectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(journeyRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(journeyRef.current, {
          opacity: 0,
          x: 120,
          duration: 0.6,
          ease: "power2.in",
        });
      },
    });
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
          className="absolute inset-0 bg-[url('/tunnel.jpg')] bg-cover bg-center will-change-transform opacity-90"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* LAYER 1: COMPASS */}
        <div
          ref={layer1Ref}
          className="absolute h-screen w-screen inset-0 z-10 flex flex-col items-center justify-center text-white will-change-transform"
        >
          <div className=" flex justify-center items-center">
            <h1 className=" text-white sm:translate-x-22 translate-x-28 text-frosted text-6xl sm:text-[8rem] mt-0">
              C
            </h1>
            <div className=" text-white h-[300px] w-[300px] scale-20 sm:scale-35">
              <SplineScene />
            </div>
            <h1 className=" text-white sm:-translate-x-22 -translate-x-28 text-frosted font-heading-italic text-6xl sm:text-[8rem] mt-0">
              MPASS{" "}
            </h1>
          </div>
          <p className=" tracking-widest uppercase text-[12px] -translate-y-10 sm:translate-y-0 sm:text-sm">
            Finding direction in ideas worth spreading
          </p>
        </div>

        {/* LAYER 2: DISCOVERY */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center will-change-transform text-center"
        >
          <h3
            ref={layer2HeadingRef}
            className="text-[2rem] opacity-0 font-main-italic"
          >
            Compass
          </h3>

          <p ref={layer2BodyRef} className="text-xl text-bold opacity-0">
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
            Guidng you to ideas that
            <br /> spark curiosity and <br />
            <i className="text-primary font-bold"> shape the future.</i>
          </p>
        </div>

        {/* LAYER 3: IDEAS */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 will-change-transform"
        >
          <p className="text-lg text-center w-[80vw]">
            <span className="text-primary font-extrabold">TEDx</span>UITHIlorin
            is where ideas meet action. <br /> <br />
            We gather bold thinkers, innovators, and storytellers to inspire,
            challenge, <br /> and spark conversations that move communities
            forward. <br /> <br />
            Every talk, every idea, every connection is a step toward
            discovering <br /> <i className="text-primary">your true north.</i>
          </p>{" "}
          <button className="mt-12 hover:bg-white hover:text-black transition-colors duration-300">
            {" "}
            <a href="/about">Read More</a>{" "}
          </button>
        </div>
      </section>

      <section className=" relative w-full h-[90vh] sm:h-screen  bg-black text-white flex items-center justify-center overflow-hidden">
        <Carousel />
      </section>

      <section
        ref={journeySectionRef}
        className="relative w-full h-[70vh] bg-black text-white flex flex-col items-center justify-center text-center px-12  mb-12"
      >
        <h1
          ref={journeyRef}
          className="font-heading-italic text-6xl sm:text-8xl"
        >
          <i className="text-primary ">One Idea</i>
          <br />
          Can Change <br />
          Your Life
        </h1>
      </section>
    </>
  );
}
