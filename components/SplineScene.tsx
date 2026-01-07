"use client";

import Spline from "@splinetool/react-spline";

export default function SplineScene() {
  return (
    <div className="h-screen w-full">
      {/* The div ensures the scene has space to render */}
      <Spline scene="https://prod.spline.design/ndiXwrt2LVtmURnA/scene.splinecode" />
    </div>
  );
}
