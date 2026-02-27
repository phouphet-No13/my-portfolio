import { getProjects } from "@/app/actions/project";
import Link from "next/link";
import { Download, ChevronDown, Calendar } from "lucide-react";
import ProjectsClientTable from "./projects-client-table";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-bold text-zinc-900 dark:text-white tracking-tight">
          Projects
        </h1>

        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition">
            <Calendar size={14} className="text-zinc-400" />
            Jan 1 - Jan 30, 2024
            <ChevronDown size={14} className="text-zinc-400 ml-1" />
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition">
              <Download size={14} className="text-zinc-400" />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition">
              More actions
              <ChevronDown size={14} className="text-zinc-400" />
            </button>
            <Link
              href="/projects/new"
              className="flex items-center gap-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Create project
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Total Projects
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold">
              {projects.length || "21"}
            </span>
            <span className="text-sm text-zinc-400">-</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span className="text-emerald-500">▲ 25.2%</span> last week
            </div>
            <div className="w-16 h-6 bg-zinc-50 dark:bg-zinc-800 rounded flex items-center justify-center">
              <svg
                className="w-full h-full text-emerald-400"
                viewBox="0 0 50 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12C5 12 8 8 12 8C16 8 20 14 25 10C30 6 35 12 40 4C45 -4 50 2 50 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Views over time
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold">15</span>
            <span className="text-sm text-zinc-400">-</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span className="text-emerald-500">▲ 18.2%</span> last week
            </div>
            <div className="w-16 h-6 bg-zinc-50 dark:bg-zinc-800 rounded flex items-center justify-center">
              <svg
                className="w-full h-full text-emerald-400"
                viewBox="0 0 50 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 14C8 14 12 9 20 11C28 13 32 6 40 4C45 2 48 3 50 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Bounced visitors
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold">0</span>
            <span className="text-sm text-zinc-400">-</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span className="text-red-500">▼ -1.2%</span> last week
            </div>
            <div className="w-16 h-6 bg-zinc-50 dark:bg-zinc-800 rounded flex items-center justify-center">
              <svg
                className="w-full h-full text-red-400"
                viewBox="0 0 50 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2C10 2 15 8 20 8C25 8 30 14 40 12C45 11 48 13 50 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">
            Active Projects
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold">12</span>
            <span className="text-sm text-zinc-400">-</span>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span className="text-emerald-500">▲ 12.2%</span> last week
            </div>
            <div className="w-16 h-6 bg-zinc-50 dark:bg-zinc-800 rounded flex items-center justify-center">
              <svg
                className="w-full h-full text-emerald-400"
                viewBox="0 0 50 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10C5 10 10 13 15 11C20 9 25 4 30 6C35 8 40 2 45 3C48 3.5 49 5 50 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-zinc-200 dark:text-zinc-800">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <ProjectsClientTable initialProjects={projects} />
    </div>
  );
}
