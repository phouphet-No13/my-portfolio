"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useGsapReveal } from "../../hooks/useGsapReveal";

function Process() {
  const processes = [
    {
      title: "Discover & Research",
      description:
        "I start by understanding the problem, user needs, and project goals. I research similar products and gather inspiration to define a clear direction.",
      icon: "/home/icon/section4/iconoir_brain-research.svg",
    },
    {
      title: "Design & Prototype",
      description:
        "I create wireframes and high-fidelity designs in Figma, then build interactive prototypes to test user flows and improve usability.",
      icon: "/home/icon/section4/fluent_design-ideas-16-regular.svg",
    },
    {
      title: "Develop",
      description:
        "I turn designs into responsive websites using Next.js, Tailwind CSS, and modern frontend tools, focusing on performance and clean code.",
      icon: "/home/icon/section4/hugeicons_developer.svg",
    },
    {
      title: "Test & Improve",
      description:
        "I test usability, fix bugs, and refine details based on feedback to ensure the best user experience.",
      icon: "/home/icon/section4/hugeicons_test-tube.svg",
    },
    {
      title: "Launch & Support",
      description:
        "After deployment, I monitor performance and provide updates or improvements when needed.",
      icon: "/home/icon/section4/fluent_person-support-28-regular.svg",
    },
  ];

  const headerRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 30,
  });
  const cardsRef = useGsapReveal<HTMLDivElement>({
    stagger: 0,
    distance: 40,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video autoplay failed:", err);
      });
    }
  }, []);

  return (
    <section className="relative w-full text-white py-24 lg:py-32 overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/home/video/section4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient over video */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-black z-10" />
      </div>

      {/* Glowing backdrop effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[150px] z-0 pointer-events-none" />

      <div className="container relative z-20 px-4 md:px-6 mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center gap-6 text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-gray-300 uppercase tracking-wider text-[13px] font-medium">
              Work Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-white">My work process. </span>{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              I hopefully it
            </span>{" "}
            <span className="relative inline-block">
              will be
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full opacity-40"></span>
            </span>{" "}
            help you.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mt-2">
            I follow a structured approach to transform complex ideas into
            seamless digital experiences, ensuring every project is delivered
            with precision and purpose.
          </p>
        </div>

        {/* Process Cards */}
        <div
          ref={cardsRef}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        >
          {processes.map((process, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] overflow-hidden h-full"
            >
              {/* Step Number Background */}
              <div className="absolute -top-4 -right-4 text-[120px] font-black leading-none text-white/5 group-hover:text-cyan-500/10 transition-colors duration-500 pointer-events-none select-none">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="relative mb-8 p-5 rounded-2xl border border-white/10 bg-black/40 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-colors duration-500 z-10 w-20 h-20 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <Image
                  src={process.icon}
                  alt={process.title}
                  width={32}
                  height={32}
                  className="object-contain brightness-0 invert group-hover:opacity-90 transition-opacity duration-300 relative z-10"
                />
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col grow">
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {process.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 grow">
                  {process.description}
                </p>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
