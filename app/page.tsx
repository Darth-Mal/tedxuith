"use client";

import SplineScene from "@/components/SplineScene";

export default function Home() {
  const themes: string[] = ["C", "O", "M", "P", "A", "S", "S"];

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden">
        {/* Background image */}
        <img
          src="/tunnel.jpg"
          alt=""
          className="absolute -z-10 w-full scale-x-130  opacity-80"
        />

        <div className="relative flex items-center justify-center w-full h-full">
          {/* C — in front */}
          <h1 className="text-white text-[10rem] font-bold z-30 -mr-6">C</h1>

          {/* Compass (the O) */}
          <div className="relative h-full w-[260px] z-20 pointer-events-auto">
            <SplineScene className="absolute inset-0 scale-50" />
          </div>

          {/* M — behind */}
          <h1 className="text-white text-[10rem] font-bold z-10 -ml-6">M</h1>

          <h1 className="text-white text-[10rem] font-bold">P</h1>
          <h1 className="text-white text-[10rem] font-bold">A</h1>
          <h1 className="text-white text-[10rem] font-bold">S</h1>
          <h1 className="text-white text-[10rem] font-bold">S</h1>
        </div>
      </section>

      <div className="text-white h-[500]">Hmmmm</div>
    </>
  );
}
