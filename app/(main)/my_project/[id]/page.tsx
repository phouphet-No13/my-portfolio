// import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/app/actions/project";

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  coverImage: string | null;
  description: string;
  tags: string[];
  link: string | null;
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const project = await getProjectById(parseInt(id));
    if (!project) return null;
    return project as unknown as Project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  // Handle local Backend Upload Images vs External Images
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("/uploads")) {
      return imagePath;
    }
    if (imagePath.startsWith("http") || imagePath.startsWith("/")) {
      return imagePath;
    }
    return `/${imagePath}`;
  };

  const coverImageUrl = getImageUrl(project.coverImage);
  const thumbnailUrl = getImageUrl(project.image);

  // Use Cover if available, otherwise fallback to Thumbnail for the hero section
  const heroImage = coverImageUrl || thumbnailUrl;

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-cyan-500/30 pt-24 pb-12">
      {/* Back button positioned above the main grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-8">
        <Link
          href="/my_project"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group w-fit"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <span className="font-medium tracking-wide text-sm">
            Back to Projects
          </span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">
        {/* Left Side: Image - จะได้ 3/5 ของ space */}
        <div className="w-full relative bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex items-start h-fit">
          {heroImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${project.title} Cover`}
                className="w-full h-auto object-cover block"
              />
            </>
          ) : (
            <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-gray-500">
              No Image Provided
            </div>
          )}
        </div>

        {/* Right Side: Details - จะได้ 2/5 ของ space */}
        <div className="w-full flex flex-col h-auto pt-4 lg:pt-0">
          {/* Project Header */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/10">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details Panel (Role / Tech / URL) */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              Project Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-400 mb-1">Role / Focus</p>
                <p className="font-medium text-gray-100">{project.category}</p>
              </div>

              {project.link && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Live URL</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-medium break-all transition-colors underline decoration-cyan-400/30 underline-offset-4"
                  >
                    {project.link.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Project Description */}
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white mb-12">
            {project.description
              .split("\n")
              .map((paragraph: string, idx: number) =>
                paragraph.trim() ? (
                  <p key={idx}>{paragraph}</p>
                ) : (
                  <br key={idx} />
                ),
              )}
          </div>

          {/* Call to Action: Visit Project */}
          {project.link && (
            <div className="mt-auto pt-8 border-t border-white/10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] w-fit"
              >
                Visit Project Live
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
