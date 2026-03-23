"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TeamCarousel from "@/components/TeamCarousel";
import TeamModal from "@/components/TeamModal";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const mission2Ref = useRef<HTMLDivElement>(null);
  const missionDivRef = useRef<HTMLDivElement>(null);

  // --- STATE FOR MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamName, setSelectedTeamName] = useState("");

  // Handler for when a team card button is clicked
  const handleOpenModal = (member: any) => {
    // We can use the member data to set the title
    // e.g. "Web Development Team" or "Design Team" based on their role
    setSelectedTeamName(`${member.role} Team`);
    setIsModalOpen(true);
  };

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
      <div className="centered h-screen flex flex-col items-center justify-center">
        <h1 className="text-[60px] font-main font-light">
          About
          <span className="text-primary font-extrabold"> TEDx</span>
        </h1>
        <p className="font-sans text-xl text-center sm:max-w-1/2 max-w-[90%]">
          <span className="text-primary font-bold">TEDx</span> is a global
          program of independently organized events inspired by TED’s mission of
          ideas worth spreading. TEDx events bring people together to share
          ideas, spark conversation, and inspire meaningful change at the local
          level.
        </p>
      </div>

      <div
        ref={bgRef}
        className="centered h-screen flex flex-col items-center justify-center"
      >
        <div
          ref={textRef}
          className="centered flex flex-col items-center justify-center"
        >
          <h1 className="text-[55px] font-main font-light text-black sm:max-w-1/2 max-w-[90%]">
            About
            <span className="text-primary font-extrabold"> TEDx</span>UITHIlorin
          </h1>
          <p className="font-sans text-center text-xl sm:max-w-1/2 max-w-[90%] text-black ">
            <span className="text-primary font-bold ">TEDx</span>
            UITHIlorin was born from a simple belief; that some of the most
            powerful ideas in the world are sitting right here, in the minds of
            the people around us. Students figuring out their next step,
            professionals who’ve learned something the textbooks never taught,
            creatives who see problems differently. We built this space for all
            of them! To gather every curious, passionate, and quietly brilliant
            mind from Ilorin and beyond, and give their ideas room to breathe,
            collide, and grow into something that truly matters.
          </p>
        </div>
      </div>

      <section ref={missionDivRef} className="relative h-[50vh] bg-black flex">
        <div className="absolute inset-0 bg-[url('/dots.svg')] bg-repeat opacity-35" />

        <div className="relative overflow-hidden z-10 sm:flex flex flex-col items-center justify-center w-screen h-[50vh]">
          <div className="  w-full sm:items-start min-w-[50%] flex items-center justify-center sm:flex-col  sm:pl-10 gap-4">
            <h1 className="m-0 max-md:text-5xl  sm:translate-y-15 text-white">
              MISSION
            </h1>
            <h1 ref={mission2Ref} className="m-0 text-primary max-md:text-5xl ">
              <i>MISSION</i>
            </h1>
            <h1 className="m-0 sm:-translate-y-15 text-white max-md:text-5xl">
              MISSION
            </h1>
          </div>
          <div
            ref={missionRef}
            className=" max-md:mt-6 sm:pe-5 text-center sm:max-w-1/2 max-w-[85%] text-white sm:w-[50%] flex justify-center items-center sm:block"
          >
            <p className="text-lg">
              Although not easy, our mission is simple; to create a room where
              people leave thinking differently than when they walked in. At
              <span className="text-primary font-bold"> TEDx</span>UITHIlorin,
              we believe that curiosity is contagious, that one honest
              conversation can shift a perspective, and that the right idea,
              heard at the right moment, can change the entire direction of a
              life. We’re here to start those conversations; for the UITH
              community, for Ilorin, and for everyone brave enough to show up
              with an open mind!
            </p>
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <TeamCarousel onMemberClick={handleOpenModal} />

      {/* POPUP MODAL */}
      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamName={selectedTeamName}
      />
    </>
  );
};
export default Page;
