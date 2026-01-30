import Image from "next/image";

const AttendPage = () => {
  return (
    <>
      <section className="relative flex w-full centered pt-[80px] overflow-hidden">
        <Image
          className="h-[400px] w-[400px]"
          src={"/flyer.png"}
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

        <div className="h-screen bg-primary w-full h-screen grid grid-cols-[1fr_auto_1fr] gap-4 py-10 px-6">
          <div className="">
            <h1 className="text-[70px] text-left ">
              Tedx <br /> UITHILORIN
            </h1>
          </div>

          <div className="bg-white h-[70%] w-0.5"></div>
          <div className="grid grid-rows-4">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              minus, voluptas optio numquam minima similique ad doloribus
              fugiat, atque delectus ratione labore cumque corporis iure maxime
              sapiente recusandae pariatur excepturi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              minus, voluptas optio numquam minima similique ad doloribus
              fugiat, atque delectus ratione labore cumque corporis iure maxime
              sapiente recusandae pariatur excepturi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              minus, voluptas optio numquam minima similique ad doloribus
              fugiat, atque delectus ratione labore cumque corporis iure maxime
              sapiente recusandae pariatur excepturi!
            </p>
          </div>
        </div>
      </section>

      {/* <section className="h-screen bg-amber-800 m"></section> */}
    </>
  );
};
export default AttendPage;
