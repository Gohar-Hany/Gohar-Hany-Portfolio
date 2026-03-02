import { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const lastScrollY = useRef(0);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpenRef = useRef(isOpen);

  // Keep ref in sync so scroll handler always has latest value
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  // Single stable scroll handler — no deps that change on re-render
  useEffect(() => {
    let scrollDirection: 'up' | 'down' | 'idle' = 'idle';
    let stopTimer: ReturnType<typeof setTimeout> | null = null;

    const showNav = () => setIsNavVisible(true);
    const hideNav = () => setIsNavVisible(false);

    const handleScroll = () => {
      const currentY = window.scrollY;
      const prevY = lastScrollY.current;
      const delta = currentY - prevY;

      // Glass background toggle
      setIsScrolled(currentY > 50);

      // Near top = always show, no glass
      if (currentY <= 80) {
        showNav();
        scrollDirection = 'idle';
        lastScrollY.current = currentY;
        return;
      }

      // Determine direction (need > 5px movement to count)
      if (delta > 5) {
        scrollDirection = 'down';
      } else if (delta < -5) {
        scrollDirection = 'up';
      }

      // Apply visibility based on direction
      if (scrollDirection === 'down' && !isOpenRef.current) {
        hideNav();
      } else if (scrollDirection === 'up') {
        showNav();
      }

      lastScrollY.current = currentY;

      // "Scroll stopped" detection — 300ms after last scroll event
      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        showNav();
        scrollDirection = 'idle';
      }, 300);

      // Active section tracking
      const scrollPos = currentY + 150;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, []); // ← empty deps = stable, never re-registers

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] py-4 px-4 sm:px-6 lg:px-8 pointer-events-none"
      style={{
        transform: isNavVisible ? 'translateY(0)' : 'translateY(-110%)',
        opacity: isNavVisible ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Unified Premium Navbar Container */}
      <div
        className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto h-16 md:h-[4.5rem]"
        style={{
          padding: isScrolled ? '0 2rem' : '0 0.5rem',
          borderRadius: isScrolled ? '2rem' : '0',
          background: isScrolled ? 'rgba(4, 13, 26, 0.55)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(1.4)' : 'none',
          border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,183,255,0.06), inset 0 1px 1px rgba(255,255,255,0.05), 0 0 20px rgba(0,0,0,0.4)'
            : 'none',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >

        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold font-syne text-white tracking-tight group flex items-center gap-1.5 focus:outline-none"
            aria-label="Go to home section"
          >
            Gohar<span className="text-primary transition-transform duration-300 group-hover:scale-125 inline-block">.</span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 lg:px-5 h-10 rounded-xl text-[14px] lg:text-[15px] font-syne font-medium transition-all duration-300 group overflow-hidden ${activeSection === item.id
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
                  }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-white/10 rounded-xl z-0" />
                )}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-t-full transition-all duration-300 ease-out z-10 ${activeSection === item.id
                    ? 'w-4 opacity-100'
                    : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-100'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center justify-end basis-[auto] lg:basis-[240px]">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Gohar-Hany"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-300 border border-transparent hover:border-white/10"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/goharhany"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-white/50 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-300 border border-transparent hover:border-[#0A66C2]/20"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <div className="w-[1px] h-6 bg-white/10 mx-3 lg:mx-4" />

          <button
            onClick={() => scrollToSection('contact')}
            className="h-10 px-5 lg:px-6 bg-primary text-white text-[14px] lg:text-[15px] font-syne font-bold rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,183,255,0.2)] hover:shadow-[0_0_30px_rgba(0,183,255,0.4)] hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-300 group focus:outline-none"
          >
            Let's Talk
            <ArrowUpRight size={16} className="text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white transition-all duration-300" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-[1rem] text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center overflow-hidden">
              <span className={`absolute h-[2px] w-5 bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute h-[2px] w-5 bg-primary rounded-full transition-all duration-150 ease-out top-1/2 -translate-y-1/2 ${isOpen ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`} />
              <span className={`absolute h-[2px] w-5 bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'bottom-2 -translate-y-[1px] -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <div
        className={`absolute top-full left-4 right-4 mt-3 pointer-events-auto md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <div className="bg-[#040d1a]/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-[2rem] p-5 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/20 blur-[60px] pointer-events-none rounded-full" />

          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-[15px] font-syne font-medium transition-all duration-300 flex items-center justify-between group relative z-10 ${activeSection === item.id
                ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/[0.05]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              style={{
                transitionDelay: isOpen ? `${index * 40}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(-15px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,183,255,0.8)]" />
              )}
            </button>
          ))}

          <div
            className="flex items-center gap-3 pt-4 mt-2 border-t border-white/10 relative z-10"
            style={{
              transitionDelay: isOpen ? `${NAV_ITEMS.length * 40}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(-15px)',
              opacity: isOpen ? 1 : 0,
            }}
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="flex-1 h-[3.25rem] bg-gradient-to-r from-primary to-blue-500 text-white text-[15px] font-syne font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,183,255,0.2)] focus:outline-none"
            >
              Let's Talk
              <Mail size={16} className="opacity-80" />
            </button>
            <a
              href="https://github.com/Gohar-Hany"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[3.25rem] h-[3.25rem] flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/goharhany"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[3.25rem] h-[3.25rem] flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-white/80 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;