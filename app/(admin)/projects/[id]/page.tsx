import { getProjectById, deleteProject } from "@/app/actions/project";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  SquarePen,
  Trash2,
  Calendar,
  FolderKanban,
} from "lucide-react";

export default async function ProjectDetailPage(props: {
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

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto pb-12 font-sans">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
        <div className="flex items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition shadow-sm"
            >
              <ExternalLink size={16} />
              View Live
            </a>
          )}
          <Link
            href={`/projects/${project.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-[#06b6d4] hover:bg-[#0891b2] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <SquarePen size={16} />
            Edit Project
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteProject(project.id);
              redirect("/projects");
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition shadow-sm"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </form>
        </div>
      </div>

      {/* Split Layout: Image Left, Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-4">
        {/* Left: Image Section */}
        <div className="w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden relative shadow-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black lg:sticky lg:top-8">
          <Image
            src={
              project.image.startsWith("http") || project.image.startsWith("/")
                ? project.image
                : `/${project.image}`
            }
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Right: Info Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-zinc-500 mt-2">
              <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full font-medium text-zinc-700 dark:text-zinc-300">
                <FolderKanban size={14} className="text-[#06b6d4]" />
                {project.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {project.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed text-zinc-700 dark:text-zinc-300">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              About the Project
            </h3>
            <p className="whitespace-pre-wrap">{project.description}</p>
          </div>

          {/* Context Details */}
          <div className="flex flex-col gap-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">
                Tech Stack & Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[#ecfeff] dark:bg-[#06b6d4]/10 text-[#0891b2] dark:text-[#06b6d4] font-medium text-sm rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">
                Project Status
              </h4>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-lg text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Successfully Deployed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
