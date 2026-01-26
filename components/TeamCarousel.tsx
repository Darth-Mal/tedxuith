"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const team = [
  {
    id: 1,
    name: "Malomo Victor Ayooluwa",
    role: "Web Development Team Lead",
    color: "#E10600",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Design Lead",
    color: "#444444",
  },
  {
    id: 3,
    name: "John Smith",
    role: "Content Lead",
    color: "#777777",
  },
  {
    id: 4,
    name: "Sarah Ade",
    role: "Logistics Lead",
    color: "#999999",
  },
];

export default function TeamCarousel() {
  const cardsRef = useRef([]);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  const radius = 420;
  const arc = Math.PI; // true semicircle (180deg)

  const positionCards = (centerIndex) => {
    const visibleCount = team.length;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // distribute evenly across -90deg to +90deg
      const t = i / (visibleCount - 1); // 0 → 1
      const angle = -arc / 2 + t * arc; // -90° → +90°

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const offset = i - centerIndex;

      gsap.to(card, {
        x,
        y,
        rotation: offset * 4,
        scale: offset === 0 ? 1.05 : 0.85,
        opacity: offset === 0 ? 1 : 0.4,
        // zIndex: 10 - Math.abs(offset),
        duration: 0.6,
        ease: "power3.out",
      });
    });
  };

  const restartAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5000);
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % team.length);
    restartAutoplay();
  };

  const goPrev = () => {
    setActive((prev) => (prev - 1 + team.length) % team.length);
    restartAutoplay();
  };

  // autoplay
  useEffect(() => {
    intervalRef.current = setInterval(goNext, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // animate on change
  useEffect(() => {
    positionCards(active);
  }, [active]);

  // pause on hover
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const pause = () => clearInterval(intervalRef.current);
    const resume = () => restartAutoplay();

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  // mobile swipe
  useEffect(() => {
    let startX = 0;
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) goPrev();
      if (diff < -50) goNext();
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Cards */}
      {team.map((member, i) => (
        <div
          key={member.id}
          ref={(el) => (cardsRef.current[i] = el)}
          onClick={() => {
            setActive(i);
            restartAutoplay();
          }}
          className="absolute w-[220px] h-[280px] rounded-xl cursor-pointer flex items-center justify-center text-white text-center select-none"
          style={{ backgroundColor: member.color }}
        >
          <div className="px-4">
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm opacity-80">{member.role}</p>
          </div>
        </div>
      ))}

      {/* Info Card */}
      <div className="absolute bottom-28 bg-white rounded-2xl shadow-xl px-6 py-4 w-[360px]">
        <h3 className="text-lg font-semibold text-black">
          {team[active].name}
        </h3>
        <p className="text-sm text-gray-600">{team[active].role}</p>
        <button className="mt-3 inline-flex items-center gap-2 text-sm bg-red-600 text-white px-4 py-2 rounded-full">
          Team →
        </button>
      </div>

      {/* Controls */}
      <button
        onClick={goPrev}
        className="absolute left-10 text-white text-4xl select-none"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute right-10 text-white text-4xl select-none"
      >
        ›
      </button>
    </section>
  );
}
