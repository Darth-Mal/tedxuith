"use client";

import Image from "next/image";
import Countdown from "@/components/Timer";
import TicketModal from "@/components/BuyTickets";
import { useState } from "react";

const AttendPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative flex w-full centered pt-[80px] overflow-hidden">
        <Image
          className="h-[400px] w-[400px]"
          src={"/COMPASS-LAUNCH1.jpg"}
          width={100}
          height={100}
          alt="flyer"
        />

        <div className="relative centered w-screen">
          <div className=" w-full absolute z-11 bottom-0 text-[10px] font-light h-10 py-2 px-2 bg-primary centered font-sans text-nowrap  rotate-4 shadow-sm">
            TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS • ATTEND
            COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS •
            ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT
            DETAILS • ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS •
            EVENT DETAILS • ATTEND COMPASS
          </div>
          <div className=" w-full absolute z-10 bottom-0 text-[10px] font-light h-10 py-2 px-2 bg-[#dadada] text-black centered font-sans text-nowrap -rotate-4">
            TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS • ATTEND
            COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS •
            ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT
            DETAILS • ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS •
            EVENT DETAILS • ATTEND COMPASS
          </div>
        </div>

        <div className="h-screen bg-primary w-full sm:grid sm:grid-cols-[1fr_auto_1fr] gap-4 py-15 sm:px-[72px] flex flex-col px-10">
          <div className="grid grid-rows-3-[1fr_auto_1fr] h-[80%] w-[90%] gap-4">
            <h1 className="text-[50px] text-left m-0 leading-15 sm:text-[70px]">
              TEDx <br /> UITHILORIN:
            </h1>
            <div className="bg-white h-[1px] w-full m-0"></div>
            <h1 className=" m-0 text-[80px] text-left font-main-italic leading-none">
              Compass{" "}
            </h1>
          </div>
          <div className="bg-white h-full w-[1px]"></div>
          <div className="grid grid-rows-5 gap-5">
            <p>
              Every great journey starts with direction. <br />
              Don’t just hear about it. Be in the room. <br />
              Secure your seat now and be part of something unforgettable.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="gap-[9px]">
                <h3 className="font-main-italic text-left m-0">Date</h3>
                <div className="w-full h-[1px] bg-white"></div>
                <p>Saturday, April 18, 2026</p>
              </div>
              <div className="gap-[9px]">
                <h3 className="font-main-italic text-left m-0">Time</h3>
                <div className="w-full h-[1px] bg-white"></div>
                <p>To Be Announced</p>
              </div>
            </div>
            <div>
              <h3 className="font-main-italic text-left m-0">Venue</h3>
              <div className="w-full h-[1px] bg-white"></div>
              <p>To Be Announced</p>
            </div>

            {/* REGISTER BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-[90%] bg-primary  text-white hover:text-primary hover:bg-gray-100 transition-colors duration-300 rounded-[50px] h-15 text-4xl flex flex-col items-center justify-center shadow-lg"
            >
              <h3 className="text-inherit font-main-italic m-0 text-4xl ">
                Register
              </h3>
            </button>
          </div>

          <div className="absolute z-11 left-0 bottom-0 text-[10px] font-light h-10 py-2 px-2 bg-primary centered font-sans text-nowrap shadow-sm">
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div>
          <Countdown></Countdown>
        </div>
      </section>

      {/* TICKET MODAL */}
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AttendPage;
