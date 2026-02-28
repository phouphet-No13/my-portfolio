import { ProjectsClient, Project } from "./projects-client";
import { getProjects } from "@/app/actions/project";

// Revalidate occasionally, or make it fully dynamic
export const revalidate = 60;

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const rawProjects = await getProjects();
    projects = rawProjects as unknown as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return <ProjectsClient projects={projects} />;
}
