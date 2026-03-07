"use client";

import Image from "next/image";
import { Users, ArrowRight } from "lucide-react";
import SquigglyScroll from "@/components/SquigglyScroll";

const speakers = () => {
  return (
    <div className="relative">
      <SquigglyScroll />
      <section className="absolute centered border-4 border-white h-screen w-full z-30 top-50 ">
        <div className="grid grid-rows-2 inset-1 h-[300px]">
          <div className="bg-orange h-[75%]"></div>
          <Image
            src={"/logo-black.png"}
            width={100}
            height={100}
            alt="logo"
          />{" "}
        </div>
      </section>
    </div>
  );
};
export default speakers;
