"use client";

import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";

function HeroSection() {
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(taglineRef.current, { opacity: 0, y: -30, duration: 0.7 })
        .from(titleRef.current, { opacity: 0, y: 40, duration: 0.9 }, "-=0.3")
        .from(
          subtitleRef.current,
          { opacity: 0, y: 30, duration: 0.8 },
          "-=0.4",
        )
        .from(scrollRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");

      // Subtle float animation for the text container
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          className="w-full h-full scale-[0.8] md:scale-100 z-0"
          scene="https://prod.spline.design/6e42bvjAKcxxRdXI/scene.splinecode"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black pointer-events-none" />
      </div>

      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-blue-500/20 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-cyan-500/20 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="container relative z-10 text-center mt-32 sm:mt-40 md:mt-60 flex justify-center px-4">
        <div className="flex flex-col items-center gap-4 md:gap-4 w-fit h-fit bg-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            <span className="text-cyan-400 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
              Hello, I Am Meow Designer
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-white mix-blend-lighten drop-shadow-2xl">
            Creating{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-gradient-x">
                digital experiences
              </span>
            </span>{" "}
            that matter.
          </h1>

          <p className="text-gray-300 text-base md:text-lg lg:text-lg max-w-2xl leading-relaxed font-light">
            I am a UI/UX Designer &amp; Creative Developer based in Laos. I build minimal, clean, and accessible web solutions.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-medium group-hover:text-cyan-400 transition-colors duration-300">
          Scroll Down
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 group-hover:border-white/50 transition-colors duration-300 relative overflow-hidden">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-scroll shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
