import Image from "next/image";
import Countdown from "@/components/Timer";

const AttendPage = () => {
  return (
    <>
      <section className="relative flex w-full centered pt-[80px] overflow-hidden">
        <Image
          className="h-[400px] w-[400px]"
          src={"/newflyer.jpg"}
          width={100}
          height={100}
          alt="flyer"
        ></Image>

        <div className="relative centered">
          <div className="absolute z-11 bottom-0 text-[8px] font-light h-10 py-2 px-2 bg-primary centered font-sans text-nowrap  rotate-4 shadow-sm">
            TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS • ATTEND
            COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS •
            ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT
            DETAILS • ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS •
            EVENT DETAILS • ATTEND COMPASS
          </div>{" "}
          <div className="absolute z-10 bottom-0 text-[8px] font-light h-10 py-2 px-2 bg-[#dadada] text-black centered font-sans text-nowrap -rotate-4">
            TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS • ATTEND
            COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT DETAILS •
            ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS • EVENT
            DETAILS • ATTEND COMPASS • TEDxUITHILORIN • MAIN EVENT • COMPASS •
            EVENT DETAILS • ATTEND COMPASS
          </div>
          {/* <div className=" absolute bg-orange-600 w-screen h-1"></div> */}
        </div>

        <div className="h-screen bg-primary w-full h-screen grid grid-cols-[1fr_auto_1fr] gap-4 py-15 px-[72px]">
          <div className="grid grid-rows-3-[1fr_auto_1fr] h-[80%]">
            <h1 className="text-[70px] text-left m-0 leading-20">
              Tedx <br /> UITHILORIN:
            </h1>
            <div className="bg-white h-[1px] w-full m-0"></div>
            <h1 className=" m-0 text-[70px] text-left font-main-italic leading-none">
              Compass{" "}
            </h1>
          </div>
          <div className="bg-white h-full w-[1px]"></div>
          <div className="grid grid-rows-5 gap-5">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              minus, voluptas optio numquam
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="gap-[9px]">
                <h3 className="font-main-italic text-left m-0">Date</h3>
                <div className="w-full h-[1px] bg-white"></div>
                <p>Wednesday, April 18, 2026</p>
              </div>
              <div className="gap-[9px]">
                <h3 className="font-main-italic text-left m-0">Time</h3>
                <div className="w-full h-[1px] bg-white"></div>
                <p>2:00PM</p>
              </div>
            </div>
            <div>
              <h3 className="font-main-italic text-left m-0">Venue</h3>
              <div className="w-full h-[1px] bg-white"></div>
              <p>Multipurpose Hall, Univerisity of Ilorin</p>
            </div>

            <div>
              <h3 className="font-main-italic text-left m-0">Event Schedule</h3>
              <div className="w-full h-[1px] bg-white"></div>
              <p>View </p>
            </div>
            <button className="w-[90%] text-primary hover:text-black hover:bg-gray-100 transition-colors duration-300 rounded-[50px] h-15 text-4xl flex flex-col items-center justify-center shadow-lg">
              <h3 className="font-main-italic m-0 text-4xl ">Register</h3>
            </button>
          </div>
          <div className="absolute z-11 left-0 bottom-0 text-[8px] font-light h-10 py-2 px-2 bg-primary centered font-sans text-nowrap shadow-sm">
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN • COUNTDOWN •
            COUNTDOWN
          </div>{" "}
        </div>
      </section>
      <section>
        <div>
          <Countdown></Countdown>
        </div>
      </section>

      {/* <section className="h-screen bg-amber-800 m"></section> */}
    </>
  );
};
export default AttendPage;
