"use client";

import React from "react";
import { useGsapReveal } from "../../hooks/useGsapReveal";

function AboutMe() {
  const textRef = useGsapReveal<HTMLDivElement>({ stagger: 0.2, distance: 40 });
  const videoRef = useGsapReveal<HTMLDivElement>({
    from: "right",
    distance: 60,
  });

  return (
    <section
      id="about"
      className="relative w-full text-white justify-center flex overflow-hidden py-24 lg:py-32"
    >
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-blue-500/20 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-cyan-500/20 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />

      <div className="container relative z-10 flex flex-col lg:flex-row w-full gap-16 lg:gap-24 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        {/* Content */}
        <div ref={textRef} className="flex flex-col w-full lg:w-[55%] gap-8">
          <div className="flex flex-col text-white gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p className="text-[13px] font-medium tracking-wider text-gray-300 uppercase">
                About Me
              </p>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Let&apos;s get to know {" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                each other. {" "}
              </span>
              <span className="relative inline-block mt-2 lg:mt-0">
                I&apos;ll introduce myself.
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full opacity-60"></span>
              </span>
            </h2>
          </div>

          <div className="relative p-6 lg:p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-md shadow-2xl">
            <p className="leading-relaxed text-base lg:text-lg text-gray-300">
              Hi there! I&apos;m{" "}
              <span className="text-white font-semibold">Phouphet CHANTHALUNGSY</span>,Or another name for me is Meow Designer. a
              passionate UI/UX Designer and Creative Developer based in the
              vibrant city of Vientiane, Laos. My heart lies in crafting web solutions
              that are not only user-friendly but also prioritize accessibility
              and simplicity.
            </p>
            <p className="mt-4 leading-relaxed text-base lg:text-lg text-gray-400">
              I thrive on diving deep into the design process, ensuring that
              every project meets user needs while providing a delightful
              experience. Whether I&apos;m working on a sleek website or an intuitive
              app, my mission is to make technology both accessible and
              enjoyable for everyone.
            </p>
            <p className="mt-6 text-sm lg:text-base font-medium text-cyan-400 flex items-center gap-2">
              <span>Let&apos;s create something amazing together!</span>
              <span className="text-lg">✨</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-6 lg:gap-12 items-center mt-2">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">
                4<span className="text-blue-500">+</span>
              </span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Years Exp.
              </span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden lg:block"></div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">
                30<span className="text-cyan-500">+</span>
              </span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Projects
              </span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden lg:block"></div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">
                100<span className="text-blue-500">%</span>
              </span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Commitment
              </span>
            </div>
          </div>
        </div>

        {/* image / video */}
        <div
          ref={videoRef}
          className="w-full lg:w-[45%] relative mt-12 lg:mt-0"
        >
          <div className="relative w-full aspect-square max-w-[400px] lg:max-w-[500px] mx-auto">
            {/* Outer rings for decoration */}
            <div className="absolute inset-0 border border-white/10 rounded-full scale-[1.05] transition-transform duration-700 hover:scale-[1.1]"></div>
            <div className="absolute inset-0 border border-blue-500/20 rounded-full scale-[1.1] transition-transform duration-700 hover:scale-[1.15]"></div>

            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.25)] bg-gray-900 group">
              <video
                src="/home/video/abouthome.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              ></video>

              {/* Overlay glow on hover */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-[10%] -left-4 lg:-left-8 bg-gray-900/80 p-3 lg:p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md hidden md:block">
              <span className="text-2xl lg:text-3xl">🎨</span>
            </div>
            <div className="absolute bottom-[10%] -right-4 lg:-right-8 bg-gray-900/80 px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-2 lg:gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-xs lg:text-sm font-medium text-gray-200">
                Available to work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
