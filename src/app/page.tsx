import LoadingScreen from "@/components/LoadingScreen";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MetricsSection from "@/components/MetricsSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import SitesSection from "@/components/SitesSection";
import HookGame from "@/components/HookGame";
import VenturesSection from "@/components/VenturesSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ToolkitSection from "@/components/ToolkitSection";
import SpeakingSection from "@/components/SpeakingSection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import StampSocials from "@/components/StampSocials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MetricsSection />
        <WhatIDoSection />
        <FeaturedWorkSection />
        <SitesSection />
        {/* the game sits in the middle, where attention usually dips */}
        <HookGame />
        <VenturesSection />
        <ExperienceSection />
        <EducationSection />
        <ToolkitSection />
        <SpeakingSection />
        <BlogTeaserSection />
        <StampSocials />
      </main>
      <Footer />
    </>
  );
}
