"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { Divide } from "lucide-react";
import TeamCarousel from "@/components/TeamCarousel";

gsap.registerPlugin(ScrollTrigger);
const page = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const mission2Ref = useRef<HTMLDivElement>(null);
  const missionDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      backgroundColor: "#ffffff",
      duration: 2,
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(textRef.current, {
      y: 350,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(missionRef.current, {
      x: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: missionDivRef.current,
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(mission2Ref.current, {
      x: -150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: missionDivRef.current,
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <>
      <div className="centered h-screen">
        <h1 className="text-[60px] font-sans font-light">
          {" "}
          About
          <span className="text-primary font-extrabold"> TEDx</span>
        </h1>
        <p className="font-sans text-center sm:max-w-1/2 max-w-[90%]">
          <span className="text-primary font-bold">TEDx</span> is a global
          program of independently organized events inspired by TED’s mission of
          ideas worth spreading. TEDx events bring people together to share
          ideas, spark conversation, and inspire meaningful change at the local
          level.
        </p>
      </div>
      <div ref={bgRef} className="centered h-screen">
        <div ref={textRef} className="centered">
          <h1 className="text-[60px] font-sans font-light text-black ">
            {" "}
            About
            <span className="text-primary font-extrabold"> TEDx</span>UITHIlorin
          </h1>
          <p className="font-sans text-center sm:max-w-1/2 max-w-[90%] text-black ">
            <span className="text-primary font-bold ">TEDx</span>
            UITHIlorin is an independently organized TEDx event based at the
            University of Ilorin Teaching Hospital. It is dedicated to
            showcasing powerful ideas, innovative thinking, and diverse
            perspectives from within the UITH community and beyond. By bringing
            together students, professionals, creatives, and changemakers,
            TEDxUITHIlorin aims to inspire curiosity, encourage dialogue, and
            spark ideas that can shape the future of healthcare, society, and
            innovation.
          </p>
        </div>
      </div>
      <section ref={missionDivRef} className="relative h-[50vh] bg-black flex">
        <div className="absolute inset-0 bg-[url('/dots.svg')] bg-repeat opacity-35" />

        <div className="relative overflow-hidden z-10 flex items-center w-screen h-[50vh]">
          <div className="centered  items-start min-w-[50%]">
            <h1 className="m-0 translate-y-15 ">MISSION</h1>
            <h1 ref={mission2Ref} className="m-0 text-primary ">
              {" "}
              <i>MISSION</i>
            </h1>
            <h1 className="m-0 -translate-y-15 ">MISSION</h1>
          </div>
          <div ref={missionRef} className="pe-5">
            <p>
              Our mission at{" "}
              <span className="text-primary font-bold">TEDx</span>UITHIlorin is
              to ignite curiosity, amplify bold ideas, and bring diverse voices
              together to spark conversation, challenge perspectives, and
              inspire meaningful change—empowering the UITH community and beyond
              to think differently, act boldly, and shape a better future.
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-screen bg-black">
        <div className="relative z-10">{/* your content */}</div>
      </section>

      <TeamCarousel></TeamCarousel>
    </>
  );
};
export default page;
