import LoadingScreen from "@/components/LoadingScreen";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MetricsSection from "@/components/MetricsSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import SitesSection from "@/components/SitesSection";
import ReviewsSection from "@/components/ReviewsSection";
import VenturesSection from "@/components/VenturesSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ToolkitSection from "@/components/ToolkitSection";
import SpeakingSection from "@/components/SpeakingSection";
import AwardSection from "@/components/AwardSection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import StampSocials from "@/components/StampSocials";
import QuickFacts from "@/components/QuickFacts";
import FaqList from "@/components/FaqList";
import { homeFaq } from "@/content/entity";
import Footer from "@/components/Footer";
import TapeDivider from "@/components/TapeDivider";
import Scrapbook from "@/components/Scrapbook";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <div className="bg-aurora">
          <QuickFacts />
          <AboutSection />
        </div>
        <TapeDivider items={["still shipping", "f*ck it, we ball", "jack of all trades", "master of none"]} tone="coral" tilt={-1.8} />
        <MetricsSection />
        <WhatIDoSection />
        <Scrapbook />
        <FeaturedWorkSection />
        <SitesSection />
        <TapeDivider items={["six reviews", "five stars", "i did not write any of them"]} tone="butter" tilt={1.4} reverse />
        <ReviewsSection />
        <VenturesSection />
        <ExperienceSection />
        <EducationSection />
        <ToolkitSection />
        <TapeDivider items={["a mic makes everything better", "mind the stage", "say yes first, figure it out later"]} tone="ink" tilt={-1.2} />
        <SpeakingSection />
        <TapeDivider items={["a shiny thing on a shelf", "young entrepreneur of the year", "i forgot to smile"]} tone="sage" tilt={1.6} reverse />
        <AwardSection />
        <BlogTeaserSection />
        <StampSocials />
        <FaqList items={homeFaq} heading="Questions people ask about Boobesh AG" />
      </main>
      <Footer />
    </>
  );
}
