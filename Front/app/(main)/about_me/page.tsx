"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGsapReveal } from "../../hooks/useGsapReveal";

function About() {
  const heroRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 40,
  });
  const skillsRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.1,
    distance: 30,
  });
  const statsRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.1,
    distance: 30,
  });
  const ctaRef = useGsapReveal<HTMLDivElement>({ distance: 50 });

  return (
    <div className="w-full bg-black text-white overflow-hidden pb-10 relative">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      {/* About Content Section */}
      <section className="relative w-full py-24 lg:py-32 px-4">
        <div
          ref={heroRef}
          className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10"
        >
          {/* Left - Content */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span className="text-gray-300 uppercase tracking-wider text-[13px] font-medium">
                  About Me
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                  Designing
                </span>{" "}
                with Purpose,
                <br />
                Building with <span className="text-white">Passion</span>.
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                I'm a multidisciplinary designer and developer based in San
                Francisco, specializing in creating stunning digital experiences
                that combine beautiful aesthetics with flawless functionality.
                My approach is rooted in empathy, research, and a deep
                understanding of user behavior.
              </p>
            </div>

            {/* Quick Stats/Highlights */}
            <div className="flex gap-8 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-3xl font-black text-white">5+</p>
                <p className="text-sm font-medium tracking-wider text-cyan-400 uppercase">
                  Years Exp
                </p>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-white">50+</p>
                <p className="text-sm font-medium tracking-wider text-cyan-400 uppercase">
                  Projects
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="order-1 lg:order-2 relative group w-full max-w-md mx-auto lg:max-w-none">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50"></div>

            <div className="relative rounded-3xl overflow-hidden aspect-4/5 lg:aspect-square border border-white/10 shadow-2xl">
              <Image
                src="/home/image/Rectangle 8-1.png"
                alt="Portrait"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-semibold text-lg">
                  Always learning, always creating.
                </p>
                <p className="text-gray-400 text-sm mt-1">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-24 px-4 border-t border-white/5 bg-white/1">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 lg:gap-24">
            {/* Left - Skills (Bars) */}
            <div ref={skillsRef} className="flex flex-col gap-10">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold">
                  Technical <span className="text-cyan-400">Expertise</span>
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  A breakdown of my core competencies. I constantly push myself
                  to learn new tools and refine my existing skills to deliver
                  the best possible results.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {[
                  { name: "UI/UX Design", value: 95 },
                  { name: "Frontend Development", value: 90 },
                  { name: "Motion & Animation", value: 85 },
                ].map((skill, index) => (
                  <div key={index} className="space-y-3 group">
                    <div className="flex justify-between items-end">
                      <span className="font-semibold text-gray-200 tracking-wide">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 font-mono text-sm group-hover:text-cyan-300 transition-colors">
                        {skill.value}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full relative"
                        style={{ width: `${skill.value}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -translate-x-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-24 px-4 overflow-hidden">
        {/* Glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div ref={ctaRef} className="container mx-auto max-w-5xl relative z-10">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src="/home/image/Rectangle 8-1.png"
                alt="Collaboration"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-12 md:p-20 text-center gap-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-cyan-300 uppercase tracking-wider text-[13px] font-bold">
                  Available for hire
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-tight">
                Let's Build Something{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  Extraordinary
                </span>{" "}
                Together
              </h2>

              <Link
                href="/contact_me"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black transition-all duration-300 bg-white rounded-full hover:bg-cyan-400 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] overflow-hidden hover:-translate-y-1 mt-4"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Start a Project
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
