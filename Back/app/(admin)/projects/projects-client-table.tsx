"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Plus,
  ArrowUpDown,
  ExternalLink,
  SquarePen,
  Trash2,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
} from "lucide-react";
import { deleteProject } from "@/app/actions/project";

type Project = {
  id: number;
  title: string;
  image: string;
  link: string | null;
  description: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export default function ProjectsClientTable({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Website", "Mobile App", "Design", "Branding"];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await deleteProject(id);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col mt-2">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-2">
        <div className="flex items-center text-sm font-medium text-zinc-500 overflow-x-auto w-full lg:w-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "border-[#06b6d4] text-zinc-900 dark:text-white"
                  : "border-transparent hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
          <Link
            href="/projects/new"
            className="px-4 py-3 border-b-2 border-transparent hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            <Plus size={14} /> Add
          </Link>
        </div>

        <div className="flex items-center gap-3 pr-4 py-2 lg:py-0 w-full lg:w-auto px-4 lg:px-0 border-t lg:border-t-0 border-zinc-200 dark:border-zinc-800">
          <div className="relative flex-1 lg:w-48">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#06b6d4] focus:border-[#06b6d4] transition"
            />
          </div>
          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition shrink-0">
            <SlidersHorizontal size={16} />
          </button>
          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition shrink-0">
            <ArrowUpDown size={16} />
          </button>
          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition shrink-0 lg:ml-2">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        {filteredProjects.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-3">
              <Search size={20} className="text-zinc-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              No projects found
            </h3>
            <p className="text-sm text-zinc-500 max-w-sm">
              We couldn&apos;t find any projects matching your current search or
              category filter. Try changing your search terms.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                <th className="font-medium p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-zinc-300 text-[#06b6d4] focus:ring-[#06b6d4]"
                  />
                </th>
                <th className="font-medium p-4 py-3">Project</th>
                <th className="font-medium p-4 py-3 flex items-center gap-1">
                  Date <ArrowUpDown size={12} className="text-zinc-300" />
                </th>
                <th className="font-medium p-4 py-3">Category</th>

                <th className="font-medium p-4 py-3">Tags</th>
                <th className="font-medium p-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
              {filteredProjects.map((p) => {
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-zinc-300 text-[#06b6d4] focus:ring-[#06b6d4]"
                      />
                    </td>
                    <td className="p-4 text-zinc-900 dark:text-white font-medium">
                      <Link
                        href={`/projects/${p.id}`}
                        className="flex items-center gap-3 hover:text-[#06b6d4] transition-colors"
                      >
                        <div className="w-8 h-8 rounded shrink-0 overflow-hidden relative bg-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700">
                          <Image
                            src={
                              p.image.startsWith("http") ||
                              p.image.startsWith("/")
                                ? p.image
                                : `/${p.image}`
                            }
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {p.title}
                      </Link>
                    </td>
                    <td className="p-4">
                      {new Date(p.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">{p.category}</td>

                    <td className="p-4">
                      <div className="flex gap-1">
                        {p.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {p.tags.length > 2 && (
                          <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded text-xs font-medium">
                            +{p.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-zinc-400 hover:text-[#06b6d4] transition-colors rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <Link
                          href={`/projects/${p.id}/edit`}
                          className="p-1.5 text-zinc-400 hover:text-[#06b6d4] transition-colors rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <SquarePen size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-900/10"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
