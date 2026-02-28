import HeroSection from "@/app/components/home/hero";
import AboutMe from "@/app/components/home/about_me";
import Process from "@/app/components/home/process";
import Contact from "@/app/components/home/contact";
import Project, { ProjectType } from "@/app/components/home/project_catugory";
import { getProjects } from "@/app/actions/project";

async function getFeaturedProjects(): Promise<ProjectType[]> {
  try {
    const allProjects = await getProjects();
    return allProjects.slice(0, 4) as unknown as ProjectType[];
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
