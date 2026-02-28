import { Plus, Search, Trash2 } from "lucide-react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "@/app/actions/category";
import { getProjects } from "@/app/actions/project";

export default async function CategoriesPage() {
  const categories = await getCategories();
  const projects = await getProjects();

  // Create a fast lookup map for counting projects per category
  const projectCounts = projects.reduce(
    (acc: Record<string, number>, project: { category: string }) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-bold text-zinc-900 dark:text-white tracking-tight">
          Categories
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-sm relative flex items-center">
            <Search size={16} className="absolute left-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 pl-9 pr-4 py-1.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#06b6d4]/50 transition shadow-sm"
            />
          </div>

          <form action={createCategory} className="flex items-center gap-3">
            <input
              type="text"
              name="name"
              required
              placeholder="New Category Name"
              className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#06b6d4]/50 transition shadow-sm"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Plus size={16} />
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col mt-2">
        <div className="w-full overflow-x-auto">
          {categories.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">
              No categories found. Create your first one above!
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                  <th className="font-medium p-4 py-3 pl-6">Category Name</th>
                  <th className="font-medium p-4 py-3">Projects Count</th>
                  <th className="font-medium p-4 py-3 text-right pr-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="p-4 pl-6 text-zinc-900 dark:text-white font-medium">
                      {category.name}
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-full text-xs">
                        {projectCounts[category.name] || 0} Projects
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right flex justify-end">
                      <form
                        action={async () => {
                          "use server";
                          await deleteCategory(category.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-900/10 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
