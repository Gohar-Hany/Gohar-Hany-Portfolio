import { useEffect, useState } from 'react';
import { TrendingUp, Users, Briefcase, Trophy } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    partnerships: 0,
    projects: 0,
    campaigns: 0
  });

  const stats = [
    { icon: Users, label: 'Users Served', value: 500, suffix: '+', color: 'text-primary' },
    { icon: TrendingUp, label: 'Partnerships Led', value: 80, suffix: '+', color: 'text-accent' },
    { icon: Briefcase, label: 'AI Projects Built', value: 7, suffix: '+', color: 'text-primary' },
    { icon: Trophy, label: 'Campaigns Delivered', value: 25, suffix: '+', color: 'text-accent' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate counters
          const duration = 2000;
          const startTime = Date.now();

          const animateCounters = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounters({
              users: Math.floor(500 * progress),
              partnerships: Math.floor(80 * progress),
              projects: Math.floor(7 * progress),
              campaigns: Math.floor(25 * progress)
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounters);
            }
          };

          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 lg:py-36 relative overflow-hidden section-alt">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-syne mb-6 text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Me</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-left' : 'opacity-0 -translate-x-10'}`}>
            <blockquote className="text-xl lg:text-2xl font-medium text-primary italic border-l-4 border-primary/70 pl-5 py-1">
              "AI should be agentic, adaptable, and aligned with people."
            </blockquote>

            <div className="space-y-4 text-base lg:text-[1.05rem] text-white/70 font-dmsans leading-[1.8]">
              <p>
                I'm a Computer Science graduate focused on <strong className="text-white font-semibold">Agentic AI</strong>,
                automation, and GenAI-driven solutions. I engineer systems that{' '}
                <strong className="text-primary font-semibold">reason, remember, and act with autonomy</strong>.
              </p>

              <p>
                My toolkit includes <strong className="text-accent font-semibold">Gemini API, LangChain, FAISS, Supabase, and n8n</strong> —
                used to build AI agents, learning assistants, inventory bots, and support solutions for{' '}
                <strong className="text-primary font-semibold">500+ users</strong>.
              </p>

              <p>
                I bridge the gap between <strong className="text-white font-semibold">technical systems and human needs</strong>,
                combining code expertise with PR leadership. I've led <strong className="text-accent font-semibold">80+ partnerships</strong> and
                trained individuals in communication, tech, and leadership.
              </p>
            </div>

            {/* Currently callout */}
            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="w-[3px] rounded-full bg-gradient-to-b from-primary to-accent flex-shrink-0 self-stretch min-h-[40px]" />
              <p className="text-sm text-white/75 font-dmsans leading-relaxed">
                <strong className="text-primary block mb-1 font-syne">Currently Active:</strong>
                Machine Learning Developer Trainee — <strong className="text-white">Digilians Scholarship</strong> (Ministry of Communications &amp; MTC).
                4-month intensive: ML, Deep Learning, NLP, Computer Vision &amp; MLOps.
              </p>
            </div>

            {/* Key highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="stat-card">
                <h4 className="font-semibold text-primary font-syne mb-1 text-sm tracking-wide uppercase">Academic Excellence</h4>
                <p className="text-sm text-white/70 font-dmsans">GPA 3.5/4.0 (Excellent with Honors) · CS Graduate 2025</p>
              </div>

              <div className="stat-card">
                <h4 className="font-semibold text-accent font-syne mb-1 text-sm tracking-wide uppercase">Graduation Project</h4>
                <p className="text-sm text-white/70 font-dmsans">Agentic AI Learning Assistant — High Excellence Rating</p>
              </div>
            </div>
          </div>

          {/* Right side - Stats grid */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const currentValue = Object.values(counters)[index];

                return (
                  <div
                    key={stat.label}
                    className="stat-card group text-center flex flex-col items-center gap-3"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${stat.color === 'text-primary' ? 'bg-primary/10 border border-primary/20 group-hover:shadow-glow-blue' : 'bg-accent/10 border border-accent/20 group-hover:shadow-glow-green'}`}>
                      <IconComponent size={22} className={stat.color} />
                    </div>

                    <div className="space-y-1">
                      <div className="text-3xl lg:text-4xl font-bold font-syne text-white">
                        {currentValue}
                        <span className={stat.color}>{stat.suffix}</span>
                      </div>
                      <div className="text-xs text-white/60 font-medium font-dmsans tracking-wide uppercase">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mission statement */}
            <div className="mt-6 stat-card text-center border-primary/20">
              <div className="section-divider mb-5" />
              <h4 className="text-sm font-syne font-semibold text-white/50 tracking-widest uppercase mb-3">Mission Statement</h4>
              <p className="text-white/90 leading-relaxed font-dmsans italic text-lg">
                "I build AI systems that work — so humans can do what they do best."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;