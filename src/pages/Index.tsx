import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import PhotoGallerySection from '@/components/PhotoGallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

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

      // Fade in main content
      gsap.fromTo('.main-content',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
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
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <PhotoGallerySection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
