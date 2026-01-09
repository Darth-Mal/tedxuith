export function WindBlob() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    >
      <defs>
        <linearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="0.25" />
          <stop offset="55%" stopColor="white" stopOpacity="0.4" />
          <stop offset="75%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path fill="url(#windGradient)" filter="blur(30px)">
        <animate
          attributeName="d"
          dur="4s"
          repeatCount="indefinite"
          values="
            M0 200 C 200 120, 400 280, 600 200 S 1000 120, 1200 200 V400 H0 Z;
            M0 220 C 250 180, 350 300, 650 240 S 950 160, 1200 220 V400 H0 Z;
            M0 190 C 180 140, 420 260, 620 180 S 980 260, 1200 190 V400 H0 Z;
            M0 200 C 200 120, 400 280, 600 200 S 1000 120, 1200 200 V400 H0 Z
          "
        />
      </path>
    </svg>
  );
}
