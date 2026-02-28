"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGsapReveal } from "../../hooks/useGsapReveal";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Category = "All" | "Website" | "Mobile App" | "Design" | "Branding";

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  link: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_CATEGORIES: Category[] = [
  "All",
  "Website",
  "Mobile App",
  "Design",
  "Branding",
];

const ALL_TOOLS: string[] = [
  "Next.js",
  "React",
  "React Native",
  "Flutter",
  "Figma",
  "Tailwind CSS",
  "TypeScript",
  "Firebase",
  "Chart.js",
  "Node.js",
  "Adobe XD",
  "Illustration",
  "Design Tokens",
  "Documentation",
  "Health API",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <label className="text-sm font-semibold text-gray-300 group-focus-within:text-cyan-400 transition-colors">
        Search
      </label>
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500 bg-linear-to-r from-cyan-400 to-blue-500/50"></div>
        <input
          type="text"
          placeholder="Search projects..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="relative w-full px-5 py-3 pr-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 outline-none transition-all duration-300"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 pointer-events-none transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}

interface ToolsFilterProps {
  allTools: string[];
  selectedTools: string[];
  onToggle: (tool: string) => void;
}

function ToolsFilter({ allTools, selectedTools, onToggle }: ToolsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const label =
    selectedTools.length === 0
      ? "Select Tools"
      : `${selectedTools.length} tool${selectedTools.length !== 1 ? "s" : ""} selected`;

  return (
    <div
      className="flex flex-col gap-2 w-full group/dropdown relative"
      ref={dropdownRef}
    >
      <label className="text-sm font-semibold text-gray-300 group-focus-within/dropdown:text-cyan-400 transition-colors">
        Filter by Tools
      </label>
      <div className="relative">
        <div
          className={`absolute -inset-0.5 rounded-lg blur transition duration-500 bg-linear-to-r from-cyan-400 to-blue-500/50 ${isOpen ? "opacity-100" : "opacity-0 group-hover/dropdown:opacity-50"}`}
        ></div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-full px-5 py-3 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white text-left flex items-center justify-between transition-all duration-300"
        >
          <span className="text-sm">{label}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20 max-h-64 overflow-y-auto">
            {allTools.map((tool) => {
              const isChecked = selectedTools.includes(tool);
              return (
                <li key={tool}>
                  <label className="flex items-center px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0 transition-colors group/item relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggle(tool)}
                      className="w-4 h-4 rounded border-gray-600 text-cyan-400 focus:ring-0 cursor-pointer accent-cyan-400"
                    />
                    <span
                      className={`ml-3 text-sm transition-colors relative z-10 ${isChecked ? "text-cyan-400 font-medium" : "text-gray-400 group-hover/item:text-white"}`}
                    >
                      {tool}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

interface CategoryFilterProps {
  categories: Category[];
  active: Category;
  onChange: (category: Category) => void;
}

function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 z-10">
      <label className="text-sm font-semibold text-gray-300">
        Project Type
      </label>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
              active === category
                ? "border-cyan-400 text-black bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                : "border-white/10 text-gray-400 bg-white/5 hover:border-cyan-400/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface SelectedToolChipsProps {
  tools: string[];
  onRemove: (tool: string) => void;
}

function SelectedToolChips({ tools, onRemove }: SelectedToolChipsProps) {
  if (tools.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {tools.map((tool) => (
        <span
          key={tool}
          className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm flex items-center gap-2 backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.1)]"
        >
          {tool}
          <button
            onClick={() => onRemove(tool)}
            className="hover:text-white transition-colors leading-none w-4 h-4 flex items-center justify-center rounded-full hover:bg-cyan-500/20"
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const isBackendImage = project.image.startsWith("/uploads");
  const backendUrl = "";
  const imageUrl = isBackendImage
    ? `${backendUrl}${project.image}`
    : project.image.startsWith("http") || project.image.startsWith("/")
      ? project.image
      : `/${project.image}`;

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-500 h-full flex flex-col hover:-translate-y-1 hover:border-white/10">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          unoptimized={isBackendImage}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle overlay for darker contrast if needed, but keeping it clean */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex-1 p-6 md:p-8 flex flex-col relative z-10 h-full">
        <div className="flex flex-col grow">
          <p className="text-cyan-500 text-xs font-bold uppercase tracking-wider mb-3">
            {project.category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-6 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-medium rounded-full bg-transparent border border-white/10 text-gray-400 transition-colors hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link overlay */}
        <Link
          href={`/my_project/${project.id}`}
          className="absolute inset-0 z-20"
        >
          <span className="sr-only">View {project.title}</span>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<Category | string>(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const headerRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.15,
    distance: 30,
  });
  const filtersRef = useGsapReveal<HTMLDivElement>({
    stagger: 0.1,
    distance: 20,
  });
  const gridRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, distance: 40 });

  const hasActiveFilters =
    searchQuery !== "" || activeCategory !== "All" || selectedTools.length > 0;

  const filteredProjects = useMemo(() => {
    return projects.filter(({ category, title, description, tags }) => {
      const matchesCategory =
        activeCategory === "All" || category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesTools =
        selectedTools.length === 0 ||
        selectedTools.some((tool) => tags.includes(tool));

      return matchesCategory && matchesSearch && matchesTools;
    });
  }, [projects, activeCategory, searchQuery, selectedTools]);

  function handleToolToggle(tool: string) {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
    );
  }

  function clearAllFilters() {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedTools([]);
  }

  return (
    <div className="w-full bg-black text-white px-4 md:px-0 mb-40 min-h-screen overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      <div className="container mx-auto relative z-10 mt-32">
        <header
          ref={headerRef}
          className="flex flex-col items-center py-16 gap-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-gray-300 uppercase tracking-wider text-[13px] font-medium">
              Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            I am a UI/UX Designer &amp; Creative Developer based in San
            Francisco. I build minimal, clean, and accessible web solutions.
          </p>
        </header>

        <section>
          <div
            ref={filtersRef}
            className="bg-white/2 border border-white/10 rounded-4xl p-6 md:p-8 backdrop-blur-xl mb-12 shadow-2xl relative z-20"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1 w-full flex flex-col md:flex-row gap-6">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <ToolsFilter
                  allTools={ALL_TOOLS}
                  selectedTools={selectedTools}
                  onToggle={handleToolToggle}
                />
              </div>
            </div>

            <SelectedToolChips
              tools={selectedTools}
              onRemove={handleToolToggle}
            />

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <CategoryFilter
                categories={PROJECT_CATEGORIES}
                active={activeCategory as Category}
                onChange={(cat) => setActiveCategory(cat as Category)}
              />

              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm font-medium tracking-wide">
                  Showing{" "}
                  <span className="text-cyan-400">
                    {filteredProjects.length}
                  </span>{" "}
                  project{filteredProjects.length !== 1 ? "s" : ""}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm px-4 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 min-h-[500px]">
            {filteredProjects.length > 0 ? (
              <div
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10"
              >
                {filteredProjects.map((project) => (
                  <div key={project.id}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white/2 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]">
                <div className="w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                <p className="text-gray-400 text-lg mb-8 text-center max-w-md">
                  We couldn&apos;t find any projects matching your current
                  filters. Try adjusting your search or categories.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
