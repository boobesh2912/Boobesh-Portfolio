import LoadingScreen from "@/components/LoadingScreen";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ToolkitSection from "@/components/ToolkitSection";
import TimelineSection from "@/components/TimelineSection";
import WorkSection from "@/components/WorkSection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ToolkitSection />
        <TimelineSection />
        <WorkSection />
        <BlogTeaserSection />
      </main>
      <Footer />
    </>
  );
}
