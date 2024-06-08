import Image from "next/image";
import HeroSection from "@/app/ui/components/home/hero-section";
import AboutSection from "@/app/ui/components/home/about-section";
import Experience from "@/app/ui/components/home/experience";
import Skills from "@/app/ui/components/home/skills";
import Projects from "@/app/ui/components/home/projects";
import Education from "@/app/ui/components/home/education";
import Blog from "@/app/ui/components/home/blogs";
import Contact from "@/app/ui/components/home/contact";
import { type BlogType } from "./lib/data/definitions";
import { personalData } from "./lib/data/personal";

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <Contact />
    </>
  );
}

async function getBlogs() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  const filtered = data.filter((item: BlogType) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};