import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | PortfolioAdmin",
  description: "Admin dashboard overview.",
};

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Simple stat cards */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-[#f1f1f4] dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">0</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-[#f1f1f4] dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Total Categories
          </h3>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">0</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-[#f1f1f4] dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Profile Views
          </h3>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">0</p>
        </div>
      </div>
    </div>
  );
}
