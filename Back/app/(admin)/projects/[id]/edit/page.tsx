import { getProjectById, updateProject } from "@/app/actions/project";
import { getCategories } from "@/app/actions/category";
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const projectId = parseInt(params.id, 10);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/projects"
          className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
        <form
          action={async (formData) => {
            "use server";
            await updateProject(projectId, formData);
            redirect("/projects");
          }}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Title</label>
              <input
                name="title"
                defaultValue={project.title}
                required
                className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Category</label>
              <select
                name="category"
                defaultValue={project.category}
                required
                className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                {categories.length === 0 && (
                  <option value="" disabled>
                    Go to Categories to add one first
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Image URL</label>
            <input
              name="image"
              defaultValue={project.image}
              required
              className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Project Link</label>
            <input
              name="link"
              defaultValue={project.link}
              required
              className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Tags (Comma separated)
            </label>
            <input
              name="tags"
              defaultValue={project.tags.join(", ")}
              required
              className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="description"
              defaultValue={project.description}
              rows={5}
              required
              className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
