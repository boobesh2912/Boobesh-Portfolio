import LoadingScreen from "@/components/LoadingScreen";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import VenturesSection from "@/components/VenturesSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ToolkitSection from "@/components/ToolkitSection";
import SpeakingSection from "@/components/SpeakingSection";
import WhatILoveSection from "@/components/WhatILoveSection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import ContentFeedSection from "@/components/ContentFeedSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <WhatIDoSection />
        <FeaturedWorkSection />
        <VenturesSection />
        <ExperienceSection />
        <EducationSection />
        <ToolkitSection />
        <SpeakingSection />
        <WhatILoveSection />
        <BlogTeaserSection />
        <ContentFeedSection />
      </main>
      <Footer />
    </>
  );
}
