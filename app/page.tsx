import Image from "next/image";
import HeroSection from "./components/home/hero";
import AboutMe from "./components/home/about_me";
import ProjectCatugory from "./components/home/project_catugory";
import Process from "./components/home/process";
import Contact from "./components/home/contact";

export default function Home() {
  return (
    //  hero section
    <div className=" flex flex-col gap-24">
      <HeroSection />
      <AboutMe />
      <ProjectCatugory />
      <Process />
      <Contact />
    </div>
  );
}
