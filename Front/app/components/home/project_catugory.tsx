"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGsapReveal } from "../../hooks/useGsapReveal";

const PROJECTS = [
  {
    id: 1,
    href: "#",
    image: "/home/image/Rectangle 8-1.png",
    category: "Website",
    title: "E-Commerce Platform",
    description: "A responsive e-commerce website with modern UI/UX design.",
    tags: ["Next.js", "Figma", "Tailwind CSS"],
  },
  {
    id: 2,
    href: "#",
    image: "/home/image/Rectangle 8-1.png",
    category: "Mobile App",
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with real-time transactions.",
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    id: 3,
    href: "#",
    image: "/home/image/Rectangle 8-1.png",
    category: "Branding",
    title: "Brand Identity",
    description: "Complete brand identity design for tech startup.",
    tags: ["Figma", "Adobe XD", "Illustration"],
  },
  {
    id: 4,
    href: "#",
    image: "/home/image/Rectangle 8-1.png",
    category: "Website",
    title: "SaaS Dashboard",
    description: "Analytics dashboard for data visualization and management.",
    tags: ["React", "Chart.js", "Node.js"],
  },
];

function ProjectCard({
  href,
  image,
  category,
  title,
  description,
  tags,
}: (typeof PROJECTS)[0]) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-3xl overflow-hidden hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500 bg-white/2 border border-white/10 backdrop-blur-sm hover:-translate-y-2 h-full"
    >
      {/* Image container */}
      <div className="relative h-60 overflow-hidden bg-gray-900 border-b border-white/5">
        <Image
          src={image}
          alt={title}
          width={500}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover arrow indicator */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(34,211,238,0.6)]">
          <svg
            className="w-5 h-5 -rotate-45"
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
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col grow gap-4 relative z-10">
        <div>
          <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-2">
            {category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium rounded-full text-gray-300 border border-white/10 bg-black/40 backdrop-blur-md transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-linear-to-tr from-blue-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/10 pointer-events-none transition-all duration-500" />
    </Link>
  );
}

function Project() {
  const headerRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 30,
  });
  const gridRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 50,
  });

  return (
    <section
      id="projects"
      className="relative w-full bg-black text-white flex justify-center py-24 lg:py-32 overflow-hidden"
    >
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container relative z-10 flex flex-col w-full gap-16 items-center px-4 md:px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center gap-6 text-center max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-gray-300 uppercase tracking-wider text-[13px] font-medium">
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Designing
            </span>{" "}
            Impactful{" "}
            <span className="relative inline-block">
              Online
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full opacity-50"></span>
            </span>{" "}
            Experiences
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mt-2 max-w-2xl px-4">
            A selection of my recent work across branding, web design, and
            UI/UX. Each project is crafted with a focus on usability,
            aesthetics, and business goals.
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-12 w-full mt-4">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full"
          >
            {PROJECTS.map((project) => (
              <div key={project.id} className="h-full">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="/my_project"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent border border-white/20 rounded-full hover:bg-white/5 hover:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Projects
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 h-full w-full bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project;
