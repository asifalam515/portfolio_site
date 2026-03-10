import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const SystemArchitecture = lazy(() => import("@/components/SystemArchitecture"));
const Projects = lazy(() => import("@/components/Projects"));
const InteractiveDemo = lazy(() => import("@/components/InteractiveDemo"));
const DeveloperJourney = lazy(() => import("@/components/DeveloperJourney"));
const Experience = lazy(() => import("@/components/Experience"));
const GitHubSection = lazy(() => import("@/components/GitHubSection"));
const EngineeringPhilosophy = lazy(() => import("@/components/EngineeringPhilosophy"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="section-padding flex justify-center">
    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient background glows */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      <ScrollProgress />
      <Navbar />
      <Hero />

      <Suspense fallback={<SectionFallback />}>
        <SectionDivider />
        <ScrollReveal>
          <About />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <Skills />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <SystemArchitecture />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <InteractiveDemo />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <DeveloperJourney />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <Experience />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <GitHubSection />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <EngineeringPhilosophy />
        </ScrollReveal>

        <SectionDivider />
        <ScrollReveal>
          <Contact />
        </ScrollReveal>

        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
