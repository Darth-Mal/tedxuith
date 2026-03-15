"use client";

import Spline from "@splinetool/react-spline";

type Props = {
  className?: string;
  onLoad?: () => void;
};

export default function SplineScene({ className, onLoad }: Props) {
  return (
    <div className={`h-full w-full ${className || ""}`}>
      {/* The div ensures the scene has space to render */}
      <Spline
        className=""
        scene="https://prod.spline.design/ndiXwrt2LVtmURnA/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
