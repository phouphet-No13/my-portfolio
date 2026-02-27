import HeroSection from "./components/home/hero";
import AboutMe from "./components/home/about_me";
import Process from "./components/home/process";
import Contact from "./components/home/contact";
import Project, { ProjectType } from "./components/home/project_catugory";

async function getFeaturedProjects(): Promise<ProjectType[]> {
  try {
    const res = await fetch("http://localhost:3001/api/projects", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const allProjects: ProjectType[] = await res.json();
    return allProjects.slice(0, 4); // Get only the latest 4 projects for the homepage
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    //  hero section
    <div className=" flex flex-col justify-center items-center">
      <HeroSection />
      <AboutMe />
      <Project projects={featuredProjects} />
      <Process />
      <Contact />
    </div>
  );
}
