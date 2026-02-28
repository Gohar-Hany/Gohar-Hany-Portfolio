import { useState, useEffect } from 'react';
import { ArrowDown, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DotPattern = ({ className }: { className?: string }) => (
  <svg className={`opacity-20 pointer-events-none ${className}`} width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle fill="var(--neon-blue)" cx="2" cy="2" r="1.5"></circle>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
  </svg>
);

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{ id: number, size: number, left: number, top: number, dur: number, delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      left: Math.random() * 45, // Keep on left half
      top: Math.random() * 100,
      dur: 3 + Math.random() * 5,
      delay: -(Math.random() * 8)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none" id="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [currentSubline, setCurrentSubline] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sublines = [
    "Agentic AI Systems",
    "n8n Workflow Automation",
    "GenAI Solutions",
    "Real-Time AI Agents",
    "Enterprise Automation"
  ];

  const credentials = [
    { emoji: '🎓', text: 'CS Graduate 2025 • GPA 3.5/4.0' },
    { emoji: '👥', text: '500+ Users Served' },
    { emoji: '🤝', text: '80+ Partnerships Led' },
    { emoji: '🏆', text: 'YLF Finalist' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSubline((prev) => (prev + 1) % sublines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] flex items-center bg-background overflow-hidden selection:bg-primary/30">

      <ParticleSystem />

      <div className="absolute top-[20%] left-[5%] z-[2]">
        <DotPattern />
      </div>

      <div className="absolute inset-0 z-0 select-none pointer-events-none flex justify-end">
        <div className="relative w-full lg:w-[58%] h-full">
          <img
            src="/Hero.jpg"
            alt="Gohar Hany"
            className="w-full h-full object-cover object-[center_20%]"
            style={{ filter: "contrast(1.1) brightness(0.8) saturate(0) sepia(1) hue-rotate(180deg) saturate(1.5)" }}
          /* Adding cyber filter effect requested */
          />
          {/* Complex Masking gradient to fade image to dark cyber theme left */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(90deg, var(--bg-dark) 0%, rgba(4,13,26,0.9) 15%, transparent 100%),
                linear-gradient(0deg, var(--bg-dark) 0%, transparent 20%, transparent 80%, var(--bg-dark) 100%),
                radial-gradient(circle at 70% 50%, transparent 30%, rgba(4,13,26,0.6) 100%)
              `
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="w-full lg:w-[55%] animate-fade-up">

          <h1 className="text-6xl md:text-[5rem] lg:text-[6rem] font-bold leading-[1.05] tracking-tight text-white mb-2 font-syne">
            Gohar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hany</span>
          </h1>

          <div className="h-[40px] md:h-[50px] overflow-hidden mb-6 relative">
            {sublines.map((line, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center transition-all duration-500 ease-out font-syne text-xl md:text-3xl text-primary font-semibold
                  ${currentSubline === idx ? 'opacity-100 translate-y-0' : currentSubline > idx ? 'opacity-0 -translate-y-full' : 'opacity-0 translate-y-full'}`}
              >
                {line}
              </div>
            ))}
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-[450px] mb-8 font-dmsans font-light leading-relaxed">
            Building intelligent agentic systems, n8n automated workflows, and high-performance React architectures.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {credentials.map((cred, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm md:text-base text-white/90 font-dmsans backdrop-blur-md shadow-glass hover:border-primary/50 transition-colors">
                {cred.emoji} {cred.text}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Button
              size="lg"
              className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 text-lg font-syne font-semibold transition-all duration-300 shadow-glow-blue"
              onClick={() => scrollToSection('projects')}
            >
              View Work
            </Button>

            <a
              href="#contact"
              className="group flex items-center gap-2 text-white/80 hover:text-white font-syne font-medium transition-colors"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              Let's Talk
              <span className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-300 block"></span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;