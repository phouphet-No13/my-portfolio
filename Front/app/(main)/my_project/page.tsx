import { ProjectsClient, Project } from "./projects-client";

// Revalidate occasionally, or make it fully dynamic
export const revalidate = 60;

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    // Attempt to fetch from the backend Next.js API
    const res = await fetch("http://localhost:3001/api/projects", {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      projects = await res.json();
    } else {
      console.error("Failed to fetch projects:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return <ProjectsClient projects={projects} />;
}
