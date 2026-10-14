// MOBILE OPTIMIZED: GSAP matchMedia() for device-aware animations, ScrollTrigger.config with ignoreMobileResize, simplified animations on mobile
// BREAKPOINTS: 1024px for animation complexity (full on desktop, fade-only on mobile)
// PERFORMANCE: matchMedia reduces animation complexity on <1024px, ScrollTrigger.refresh() after preloader
// ACCESSIBILITY: Smooth scroll behavior, proper focus management

import { lazy, Suspense, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';

// Below-the-fold sections are split into their own chunks. The imports start
// immediately, so they download in parallel while the preloader plays and are
// ready before the page is revealed — the initial bundle just gets smaller.
const sectionImports = {
  about: import('@/components/AboutSection'),
  skills: import('@/components/SkillsSection'),
  projects: import('@/components/ProjectsSection'),
  experience: import('@/components/ExperienceSection'),
  education: import('@/components/EducationSection'),
  gallery: import('@/components/PhotoGallerySection'),
  contact: import('@/components/ContactSection'),
  footer: import('@/components/Footer'),
};
const AboutSection = lazy(() => sectionImports.about);
const SkillsSection = lazy(() => sectionImports.skills);
const ProjectsSection = lazy(() => sectionImports.projects);
const ExperienceSection = lazy(() => sectionImports.experience);
const EducationSection = lazy(() => sectionImports.education);
const PhotoGallerySection = lazy(() => sectionImports.gallery);
const ContactSection = lazy(() => sectionImports.contact);
const Footer = lazy(() => sectionImports.footer);

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for better mobile performance
ScrollTrigger.config({
  ignoreMobileResize: true,  // Prevents re-calc on mobile keyboard open
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Force scroll to top and disable smooth scrolling during load
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.overflow = 'hidden'; // Prevent any scrolling during load

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePreloaderComplete = () => {
    // Ensure we stay at top and enable scrolling
    window.scrollTo(0, 0);
    document.body.style.overflow = 'unset';
    document.documentElement.style.scrollBehavior = 'auto';

    setIsLoading(false);
    setShowContent(true);

    // Small delay to ensure everything is rendered properly
    setTimeout(() => {
      window.scrollTo(0, 0); // Double-ensure we're at top
      document.documentElement.style.scrollBehavior = 'smooth';

      // Use GSAP matchMedia for device-aware animations
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Full desktop animation: fade + translate
        gsap.fromTo('.main-content',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          }
        );
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile/Tablet: simpler fade-only animation
        gsap.fromTo('.main-content',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          }
        );
      });
    }, 100);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background text-foreground main-content" style={{ opacity: showContent ? 1 : 0 }}>

        <main>
          <HeroSection />
          <Suspense fallback={null}>
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <PhotoGallerySection />
            <ContactSection />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
