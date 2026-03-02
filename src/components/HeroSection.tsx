import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Bot } from 'lucide-react';

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{ id: number, size: number, left: number, top: number, dur: number, delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 10 + Math.random() * 20,
      delay: -(Math.random() * 10)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none" id="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle absolute bg-white rounded-full opacity-30 mix-blend-screen"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px rgba(255,255,255,0.2)`,
            animation: `float-particle ${p.dur}s linear infinite`,
            animationDelay: `${p.delay}s`
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const roles = [
    "AI Systems Architect",
    "Frontend Engineer",
    "Automation Expert",
    "UI/UX Enthusiast"
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-background selection:bg-primary/30 z-0">

      <ParticleSystem />

      {/* Extreme ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[85rem] w-full mx-auto px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-full min-h-[600px] items-stretch">

          {/* Left Column: Hero Typography & Intro Container (Spans 7 cols) */}
          <div className={`col-span-1 lg:col-span-7 flex flex-col justify-center transition-all duration-1000 ease-out delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

            {/* Status Badge */}
            <div className="flex items-center gap-3 w-fit mb-8 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_10px_rgba(0,255,150,0.8)]"></span>
              </span>
              <span className="text-xs font-syne font-semibold uppercase tracking-widest text-white/80">Available for Work</span>
            </div>

            <div className="space-y-4 mb-8">
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold font-syne text-white leading-[1.05] tracking-tight">
                Gohar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-white/90">Hany</span>
              </h1>

              {/* Animated Roles */}
              <div className="h-[40px] sm:h-[50px] overflow-hidden relative">
                {roles.map((role, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out font-syne text-xl sm:text-2xl lg:text-3xl text-accent font-medium tracking-wide
                      ${currentRole === idx ? 'opacity-100 translate-y-0' : currentRole > idx ? 'opacity-0 -translate-y-full blur-sm' : 'opacity-0 translate-y-full blur-sm'}`}
                  >
                    <Sparkles size={24} className="mr-3 text-accent/80" />
                    {role}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-lg md:text-xl text-white/50 max-w-xl mb-12 font-dmsans font-light leading-relaxed">
              Bridging the gap between beautiful fluid interfaces and highly complex intelligent agentic systems. Engineering modern 2026 digital experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative h-14 w-48 rounded-xl bg-primary text-white font-syne font-bold uppercase tracking-wider text-sm flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,183,255,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  View Work
                  <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="group h-14 px-8 rounded-xl bg-white/[0.03] border border-white/10 text-white/90 font-syne font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md flex items-center gap-2"
              >
                Start a Dialogue
                <ArrowUpRight size={16} className="text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

          </div>

          {/* Right Column: Imagery & Bento Stats (Spans 5 cols) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 sm:gap-6 lg:h-full">

            {/* Main Picture Bento Box */}
            <div className={`relative flex-1 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] overflow-hidden group transition-all duration-1000 ease-out min-h-[350px] lg:min-h-0 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 pointer-events-none" />

              <img
                src="/Hero.webp"
                alt="Gohar Hany - Creative AI Developer and UI/UX Builder"
                width="1920"
                height="1080"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-[2s] ease-out brightness-[0.85] contrast-[1.15] saturate-0 sepia-[0.3] hue-rotate-[190deg]"
              />

              {/* Bottom Label inside Picture */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div>
                  <h3 className="text-white font-syne font-bold text-xl drop-shadow-md">Creative AI Dev</h3>
                  <p className="text-white/60 font-dmsans text-sm flex items-center gap-1.5 drop-shadow-md mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Alexandria, EG
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,183,255,0.8)]" />
                </div>
              </div>
            </div>

            {/* Mini Stats Bento Row */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 shrink-0 h-[120px] sm:h-[140px]">

              {/* Stat 1 */}
              <div className={`rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-center relative overflow-hidden group transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-[20px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
                <Code2 size={20} className="text-primary mb-3" />
                <h4 className="text-2xl sm:text-3xl font-bold font-syne text-white flex items-end gap-1">
                  15<span className="text-primary text-xl">+</span>
                </h4>
                <p className="text-xs sm:text-sm font-dmsans text-white/40 mt-1 uppercase tracking-wider">Projects Shipped</p>
              </div>

              {/* Stat 2 */}
              <div className={`rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-center relative overflow-hidden group transition-all duration-1000 ease-out delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-[20px] group-hover:bg-accent/20 transition-colors duration-500 pointer-events-none" />
                <Bot size={20} className="text-accent mb-3" />
                <h4 className="text-2xl sm:text-3xl font-bold font-syne text-white flex items-end gap-1">
                  50<span className="text-accent text-xl">+</span>
                </h4>
                <p className="text-xs sm:text-sm font-dmsans text-white/40 mt-1 uppercase tracking-wider">Workflows Built</p>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} hidden md:flex cursor-pointer`} onClick={() => scrollToSection('about')}>
          <span className="text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-white/30 [writing-mode:vertical-lr] hover:text-primary transition-colors">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <div className="w-full h-1/2 bg-primary absolute top-0 animate-[scroll-down_2s_ease-in-out_infinite]" />
          </div>
        </div>
        <style>{`
          @keyframes scroll-down {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
          }
        `}</style>

      </div>
    </section>
  );
};

export default HeroSection;