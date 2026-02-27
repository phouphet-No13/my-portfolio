"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { logOutAction } from "@/app/actions/auth";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Blocks,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isProjectsOpen, setIsProjectsOpen] = useState(
    pathname.startsWith("/projects"),
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(
    pathname.startsWith("/categories"),
  );

  // Keep accordions open if we navigate to their paths
  useEffect(() => {
    if (pathname.startsWith("/projects")) setIsProjectsOpen(true);
    if (pathname.startsWith("/categories")) setIsCategoriesOpen(true);
  }, [pathname]);

  return (
    <aside className="w-[280px] bg-white dark:bg-zinc-900 border-r border-[#f1f1f4] dark:border-zinc-800 flex flex-col h-screen sticky top-0">
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-6 justify-between border-b border-[#f1f1f4] dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#06b6d4] rounded text-white flex items-center justify-center font-bold text-sm">
            P
          </div>
          <span className="font-bold text-[15px]">PortfolioAdmin</span>
        </div>
        <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname === "/dashboard" || pathname === "/"
              ? "text-[#06b6d4] bg-[#ecfeff] dark:bg-[#06b6d4]/10"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          }`}
        >
          <LayoutDashboard
            size={18}
            className={
              pathname === "/dashboard" || pathname === "/"
                ? "text-[#06b6d4]"
                : "text-zinc-400"
            }
          />
          Dashboard
        </Link>

        <div className="space-y-1 pt-1">
          <button
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname.startsWith("/projects")
                ? "text-[#06b6d4] bg-[#ecfeff] dark:bg-[#06b6d4]/10"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <FolderKanban
                size={18}
                className={
                  pathname.startsWith("/projects")
                    ? "text-[#06b6d4]"
                    : "text-zinc-400"
                }
              />
              Projects
            </div>
            {isProjectsOpen ? (
              <ChevronDown
                size={14}
                className={
                  pathname.startsWith("/projects")
                    ? "text-[#06b6d4]/60"
                    : "text-zinc-400"
                }
              />
            ) : (
              <ChevronRight size={14} className="text-zinc-400" />
            )}
          </button>

          {/* Submenu Projects */}
          {isProjectsOpen && (
            <div className="pl-11 pr-3 py-1 space-y-2">
              <Link
                href="/projects"
                className={`block text-[13px] font-medium transition-colors py-1 ${
                  pathname === "/projects"
                    ? "text-[#06b6d4]"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                All Projects
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname.startsWith("/categories")
                ? "text-[#06b6d4] bg-[#ecfeff] dark:bg-[#06b6d4]/10"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Blocks
                size={18}
                className={
                  pathname.startsWith("/categories")
                    ? "text-[#06b6d4]"
                    : "text-zinc-400"
                }
              />
              Categories
            </div>
            {isCategoriesOpen ? (
              <ChevronDown
                size={14}
                className={
                  pathname.startsWith("/categories")
                    ? "text-[#06b6d4]/60"
                    : "text-zinc-400"
                }
              />
            ) : (
              <ChevronRight size={14} className="text-zinc-400" />
            )}
          </button>

          {isCategoriesOpen && (
            <div className="pl-11 pr-3 py-1 space-y-2">
              <Link
                href="/categories"
                className={`block text-[13px] font-medium transition-colors py-1 ${
                  pathname === "/categories"
                    ? "text-[#06b6d4]"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                All Categories
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Footer / Settings / Signout */}
      <div className="p-4 border-t border-[#f1f1f4] dark:border-zinc-800 space-y-1">
        <Link
          href="/projects"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname.startsWith("/settings")
              ? "text-[#06b6d4] bg-[#ecfeff] dark:bg-[#06b6d4]/10"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          }`}
        >
          <Settings
            size={18}
            className={
              pathname.startsWith("/settings")
                ? "text-[#06b6d4]"
                : "text-zinc-400"
            }
          />
          Settings
        </Link>
        <form action={logOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400 group-hover:text-red-500"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
