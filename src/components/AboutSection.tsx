import { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, Briefcase, Trophy, Sparkles, GraduationCap, Target } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [counters, setCounters] = useState({
    users: 0,
    partnerships: 0,
    projects: 0,
    campaigns: 0
  });

  const stats = [
    { id: 'users', icon: Users, label: 'Users Served', value: 500, suffix: '+', gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
    { id: 'partnerships', icon: TrendingUp, label: 'Partnerships Led', value: 80, suffix: '+', gradient: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400' },
    { id: 'projects', icon: Briefcase, label: 'AI Projects', value: 7, suffix: '+', gradient: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-400' },
    { id: 'campaigns', icon: Trophy, label: 'Campaigns', value: 25, suffix: '+', gradient: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Smooth easing function for numbers
          const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
          const duration = 2500;
          const startTime = Date.now();

          const animateCounters = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);

            setCounters({
              users: Math.floor(500 * easedProgress),
              partnerships: Math.floor(80 * easedProgress),
              projects: Math.floor(7 * easedProgress),
              campaigns: Math.floor(25 * easedProgress)
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounters);
            }
          };

          requestAnimationFrame(animateCounters);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-60 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-60 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Discover</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Me</span>
            </h2>
          </div>
          <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
            Engineering systems that reason, remember, and act with autonomy.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-min">

          {/* Main Biography Card (Span 7) */}
          <div className={`lg:col-span-7 lg:row-span-2 relative group rounded-[2rem] p-8 md:p-10 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} hover:bg-white/[0.03] hover:border-white/10`}>
            {/* Subtle inner top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <Sparkles className="absolute top-8 right-8 text-primary/30 w-6 h-6" />

            <blockquote className="text-xl md:text-2xl font-medium text-white leading-snug mb-8 relative">
              <span className="absolute -left-4 -top-2 text-4xl text-primary/20 font-serif">"</span>
              AI should be agentic, adaptable, and aligned with people.
            </blockquote>

            <div className="space-y-6 text-base md:text-lg text-white/70 font-dmsans font-light leading-relaxed">
              <p>
                I'm a Computer Science graduate focused on <strong className="text-white font-medium">Agentic AI</strong>,
                automation, and GenAI-driven solutions. I engineer systems that <strong className="text-primary font-medium">reason, remember, and act with autonomy</strong>.
              </p>
              <p>
                My toolkit revolves around the <strong className="text-accent font-medium">Gemini API, LangChain, FAISS, Supabase, and n8n</strong>.
                I've leveraged these to build AI agents, learning assistants, inventory bots, and automated support solutions for <strong className="text-white font-medium">500+ users</strong>.
              </p>
              <p>
                Beyond code, I bridge the gap between <strong className="text-white font-medium">technical complexites and human needs</strong>.
                With a background in PR leadership, I've directed <strong className="text-primary font-medium">80+ partnerships</strong> and actively mentored individuals in tech, communication, and strategy.
              </p>
            </div>
          </div>

          {/* Currently Active Card (Span 5) */}
          <div className={`lg:col-span-5 relative rounded-[2rem] p-8 bg-gradient-to-br from-primary/[0.08] to-transparent border border-primary/20 backdrop-blur-md overflow-hidden transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'} group`}>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 blur-[50px] group-hover:bg-primary/30 transition-colors duration-500" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-syne font-semibold text-white tracking-wide">Currently Active</h3>
            </div>

            <div className="space-y-2 relative z-10">
              <h4 className="text-lg font-medium text-white font-syne leading-tight">
                Machine Learning Developer Trainee
              </h4>
              <p className="text-accent font-medium text-sm font-dmsans">
                Digilians Scholarship (Ministry of Communications)
              </p>
              <p className="text-white/60 font-dmsans text-sm leading-relaxed mt-4">
                4-month intensive program focusing on Machine Learning, Deep Learning, NLP, Computer Vision, and MLOps engineering.
              </p>
            </div>
          </div>

          {/* Academic Profile (Span 5 over 2 cols for smaller screens, 1 col on mid) */}
          <div className={`lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="rounded-[1.5rem] p-6 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              <GraduationCap className="w-6 h-6 text-white/40 mb-3" />
              <h4 className="font-syne text-white font-medium mb-1">CS Graduate 2025</h4>
              <p className="text-sm text-white/50 font-dmsans">GPA 3.5/4.0</p>
              <p className="text-xs text-primary/80 mt-2 font-medium">Excellent with Honors</p>
            </div>
            <div className="rounded-[1.5rem] p-6 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              <Briefcase className="w-6 h-6 text-white/40 mb-3" />
              <h4 className="font-syne text-white font-medium mb-1">Graduation Project</h4>
              <p className="text-sm text-white/50 font-dmsans leading-tight">Agentic AI Learning Assistant</p>
              <p className="text-xs text-accent/80 mt-2 font-medium">High Excellence Rating</p>
            </div>
          </div>

          {/* Stats Grid (Full Width, 4 cols) */}
          <div className="lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const currentValue = counters[stat.id as keyof typeof counters];

              return (
                <div
                  key={stat.id}
                  className={`group relative rounded-[2rem] p-6 sm:p-8 bg-white/[0.01] border border-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out
                    hover:-translate-y-2 hover:bg-white/[0.03] hover:border-white/10 hover:shadow-2xl hover:shadow-black/50
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                >
                  {/* Subtle Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] -z-10`} />

                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left h-full">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] mb-5 group-hover:scale-110 transition-transform duration-500">
                      <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-baseline justify-center sm:justify-start gap-1">
                        <span className="text-4xl sm:text-5xl font-bold font-syne text-white tracking-tight">
                          {currentValue}
                        </span>
                        <span className={`text-2xl font-bold ${stat.iconColor}`}>
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-white/60 font-dmsans mt-1 font-medium tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;