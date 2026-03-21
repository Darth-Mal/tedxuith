"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "@/components/SplineScene";
import CurvedLoop from "@/components/CurvedLoop";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import TextLoader from "@/components/TextLoader";

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

  const scrollCueRef = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);

  // Lock scroll until everything is loaded
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  // Wait for SplineScene + loader animation before setting loaded
  useEffect(() => {
    let loaderTimeout: NodeJS.Timeout;
    const handleLoad = () => {
      // Ensure loader has time to fade out (adjust 1000ms as needed)
      loaderTimeout = setTimeout(() => setLoaded(true), 1000);
    };

    // We can also attach this to SplineScene onLoad
    return () => clearTimeout(loaderTimeout);
  }, []);

  // GSAP scroll animations
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
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 0.8 },
          delay: 0,
          ease: "power2.inOut",
        },
      },
    });

    const STEP_DURATION = 0.35;
    const HALF_STEP = STEP_DURATION / 2;

    tl.addLabel("stage1", 0);

    tl.to(
      bgRef.current,
      { scale: 1.4, duration: STEP_DURATION, ease: "power2.inOut" },
      0,
    );
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

    tl.fromTo(
      layer2HeadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      HALF_STEP,
    );
    tl.fromTo(
      layer2BodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      HALF_STEP + 0.01,
    );

    tl.addLabel("stage2", STEP_DURATION);
    tl.to(
      bgRef.current,
      { scale: 1.8, duration: STEP_DURATION, ease: "power2.inOut" },
      STEP_DURATION,
    );
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
    tl.fromTo(
      layer3Ref.current,
      { scale: 0.5, opacity: 0, y: 150 },
      { scale: 1, opacity: 1, y: 0, duration: HALF_STEP, ease: "power2.out" },
      STEP_DURATION + HALF_STEP,
    );

    tl.addLabel("stage3", 0.7);
    tl.to({}, { duration: 0.3 });
    tl.addLabel("end", 1.0);

    gsap.set(journeyRef.current, { opacity: 0, x: 80 });

    ScrollTrigger.create({
      trigger: journeySectionRef.current,
      start: "top 80%",
      onEnter: () =>
        gsap.to(journeyRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
        }),
      onLeaveBack: () =>
        gsap.to(journeyRef.current, {
          opacity: 0,
          x: 120,
          duration: 0.6,
          ease: "power2.in",
        }),
    });
  }, []);

  // Scroll cue animation after loaded
  useEffect(() => {
    if (!loaded || !scrollCueRef.current) return;

    gsap.to(scrollCueRef.current, {
      y: 5,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
    });

    if (coordinatesRef.current) {
      ScrollTrigger.create({
        trigger: coordinatesRef.current,
        start: "top 80%",
        onEnter: () =>
          gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.5 }),
        onLeaveBack: () =>
          gsap.to(scrollCueRef.current, { opacity: 0.8, duration: 0.5 }),
      });
    }
  }, [loaded]);

  return (
    <>
      <TextLoader done={loaded} />

      <section
        ref={heroRef}
        className="relative w-screen h-screen overflow-hidden bg-black"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 bg-[url('/tunnel.jpg')] bg-size-[100vh_100vh] bg-no-repeat sm:bg-cover bg-center will-change-transform opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div
          ref={layer1Ref}
          className="absolute h-screen w-screen inset-0 z-10 flex flex-col items-center justify-center text-white will-change-transform"
        >
          <div className=" flex justify-center items-center">
            <h1 className=" text-white sm:translate-x-22 translate-x-28 text-frosted text-7xl sm:text-[8rem] mt-0">
              C
            </h1>
            <div className=" text-white h-[300px] w-[300px] scale-20 sm:scale-35">
              <SplineScene
                onLoad={() => {
                  // Wait for loader + spline to finish
                  setTimeout(() => setLoaded(true), 1500);
                }}
                className="absolute inset-0"
              />
            </div>
            <h1 className=" text-white sm:-translate-x-22 -translate-x-28 text-frosted font-heading-italic text-7xl sm:text-[8rem] mt-0">
              MPASS{" "}
            </h1>
          </div>
          <p className=" tracking-widest uppercase text-[12px] -translate-y-10 sm:translate-y-0 sm:text-sm">
            Finding direction in ideas worth spreading
          </p>
        </div>

        <div
          ref={layer2Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center will-change-transform text-center"
        >
          <h3
            ref={layer2HeadingRef}
            className="text-[3rem] opacity-0 font-main-italic"
          >
            Compass
          </h3>
          <p
            ref={layer2BodyRef}
            className="sm:text-xl text-2xl text-bold opacity-0"
          >
            We’ve all been there — uncertainty, curiousity, standing at the edge
            of a decision that feels bigger than we’re ready for. <br /> This
            isn’t an event that hands you a map. <br /> It’s an experience that
            embraces uncertainty, offering ideas, stories, and connections that
            make moving forward feel less intimidating. You’re not lost. <br />
            <span className="text-primary font-extrabold">
              You’re just finding your true north.
            </span>
          </p>
        </div>

        <div
          ref={layer3Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 will-change-transform"
        >
          <p className="sm:text-xl text-2xl text-center w-[80vw]">
            <span className="text-primary font-extrabold">TEDx</span>UITHIlorin
            is where ideas meet action. <br />
            <br />
            We gather bold thinkers, innovators, and storytellers to inspire,
            challenge, <br />
            and spark conversations that move communities forward. <br />
            <br />
            Every talk, every idea, every connection is a step toward
            discovering <br />
            <i className="text-primary">your true north.</i>
          </p>
          <button className="mt-12 hover:bg-white hover:text-black transition-colors duration-300">
            <a href="/about">Read More</a>
          </button>
        </div>
      </section>

      <section
        ref={coordinatesRef}
        className=" relative w-full h-[90vh] sm:h-screen bg-black text-white flex items-center justify-center overflow-hidden"
      >
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

      {loaded && (
        <div
          ref={scrollCueRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white opacity-90 pointer-events-none"
        >
          <p className="text-[10px] mt-2 tracking-widest uppercase">SCROLL ↓</p>
        </div>
      )}
    </>
  );
}
