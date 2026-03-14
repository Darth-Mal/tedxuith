"use client";

import Image from "next/image";
import SquigglyScroll from "@/components/SquigglyScroll";

type Speaker = {
  id: number;
  name: string;
  title: string;
  bio: string;
  img?: string;
};

const speakers = () => {
  const speaker: Speaker[] = [
    { id: 1, name: "John Doe", title: "Advisor", bio: "", img: "/team/1.jpg" },
    { id: 2, name: "John Doe", title: "Advisor", bio: "", img: "/team/2.jpg" },
    { id: 3, name: "John Doe", title: "Advisor", bio: "", img: "/team/3.jpg" },
    { id: 4, name: "John Doe", title: "Advisor", bio: "", img: "/team/1.jpg" },
    { id: 5, name: "John Doe", title: "Advisor", bio: "", img: "/team/2.jpg" },
    { id: 6, name: "John Doe", title: "Advisor", bio: "", img: "/team/3.jpg" },
    { id: 7, name: "John Doe", title: "Advisor", bio: "", img: "/team/1.jpg" },
    { id: 8, name: "John Doe", title: "Advisor", bio: "", img: "/team/2.jpg" },
    { id: 9, name: "John Doe", title: "Advisor", bio: "", img: "/team/3.jpg" },
    { id: 10, name: "John Doe", title: "Advisor", bio: "", img: "/team/1.jpg" },
  ];

  const cardLayout = [
    { top: 200, side: "left" },
    { top: 500, side: "right" },
    { top: 850, side: "left" },
    { top: 1150, side: "right" },
    { top: 1500, side: "left" },
    { top: 1850, side: "right" },
    { top: 2200, side: "left" },
    { top: 2550, side: "right" },
    { top: 2900, side: "left" },
    { top: 3250, side: "right" },
  ];

  return (
    <div className="relative">
      {/* Speaker Cards */}
      {speaker.map((sp, i) => {
        const layout = cardLayout[i];

        return (
          <section
            key={sp.id}
            className={`absolute h-[300px] z-30 ${
              layout.side === "left" ? "left-[10%]" : "right-[10%]"
            }`}
            style={{ top: `${layout.top}px` }}
          >
            <div className="h-[200px] aspect-[3/4] flex flex-col items-center">
              {/* Image */}
              <div className="relative w-full h-[200px] overflow-hidden bg-cyan-800">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${sp.img})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>

              {/* Info box */}
              <div className="w-full bg-white p-3 shadow-2xl">
                <h3 className="text-[16px] font-bold text-black font-main text-left mb-0">
                  {sp.name}
                </h3>

                <div className="flex justify-between items-center">
                  <div className="flex items-center h-[14px]">
                    <div className="mr-1 w-[2px] h-full bg-primary"></div>
                    <p className="font-[400] text-black text-xs">{sp.title}</p>
                  </div>

                  <Image
                    src="/logo-black.png"
                    width={45}
                    height={45}
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Squiggly Scroll Line */}
      <SquigglyScroll />
    </div>
  );
};

export default speakers;
