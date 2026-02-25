import HeroSection from "./components/home/hero";
import AboutMe from "./components/home/about_me";
import Process from "./components/home/process";
import Contact from "./components/home/contact";
import Project from "./components/home/project_catugory";

export default function Home() {
  return (
    //  hero section
    <div className=" flex flex-col justify-center items-center">
      <HeroSection />
      <AboutMe />
      <Project />
      <Process />
      <Contact />
    </div>
  );
}
