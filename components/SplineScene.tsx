"use client";

import Spline from "@splinetool/react-spline";

export default function SplineScene({ className }: { className?: string }) {
  return (
    <div className={`h-full w-full ${className || ""}`}>
      {/* The div ensures the scene has space to render */}
      <Spline
        className="w-2.5 w-2xl"
        scene="https://prod.spline.design/ndiXwrt2LVtmURnA/scene.splinecode"
      />
    </div>
  );
}
