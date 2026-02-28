import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b border-white/5 backdrop-blur-[16px] ${isScrolled ? 'bg-[#040d1a]/95 py-3.5 shadow-lg shadow-black/50' : 'bg-[#040d1a]/70 py-5'
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced hover */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold font-syne text-white hover:scale-[1.02] transition-all duration-300"
              aria-label="Go to home section"
            >
              Gohar<span className="text-primary">.</span>Hany
            </button>
          </div>

          {/* Desktop Navigation with improved indicator */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm transition-all duration-300 hover:text-white group ${activeSection === item.id
                  ? 'text-white font-semibold'
                  : 'text-muted-foreground font-medium'
                  }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {/* Smooth underline indicator */}
                <span
                  className={`absolute bottom-[4px] left-0 right-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${activeSection === item.id
                    ? 'opacity-100 scale-x-100'
                    : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                />
              </button>
            ))}
          </div>

          {/* Social Links & CTA with enhanced hover */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/Gohar-Hany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/goharhany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="border-white/10 text-muted-foreground bg-primary/5 hover:bg-primary/10 hover:border-primary/30 hover:text-white hover:-translate-y-1 hover:shadow-glow-blue transition-all duration-300 font-syne tracking-wide ml-2"
            >
              <Mail size={16} className="mr-2" />
              Hire Me
            </Button>
          </div>

          {/* Mobile menu button with animation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-all duration-300"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with slide animation */}
      <div
        className={`md:hidden backdrop-blur-3xl bg-[#040d1a]/95 border-b border-primary/20 overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-4 space-y-3">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 text-base font-medium transition-all duration-300 rounded-lg ${activeSection === item.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center space-x-4 pt-4 border-t border-glass-border">
            <a
              href="https://github.com/Gohar-Hany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/goharhany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white ml-auto font-syne"
            >
              <Mail size={16} className="mr-2" />
              Hire Me
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;