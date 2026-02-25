import { Search, Bell } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-[#f1f1f4] dark:border-zinc-800 flex items-center justify-between px-8 shrink-0">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative flex items-center">
        <Search size={16} className="absolute left-3 text-zinc-400" />
        <input
          type="text"
          placeholder="Search or type command..."
          className="w-full bg-transparent pl-10 pr-12 py-2 text-sm outline-none placeholder:text-zinc-400"
        />
        <div className="absolute right-3 bg-[#f1f1f4] dark:bg-zinc-800 text-zinc-500 text-[10px] font-medium px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 flex items-center">
          <span className="mr-0.5">⌘</span>/
        </div>
      </div>

      {/* Right Nav Icons */}
      <div className="flex items-center gap-5">
        <button className="relative text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#06b6d4] rounded-full border border-white dark:border-zinc-900"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-zinc-200 overflow-hidden relative border border-zinc-200">
          <Image
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=f4f2ff"
            alt="Avatar"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </header>
  );
}
