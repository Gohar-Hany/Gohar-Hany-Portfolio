import { useEffect, useState, useRef } from 'react';
import { Brain, Code, Database, Zap, Wrench, Users, Layers, Cpu } from 'lucide-react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      icon: Brain,
      title: 'AI & Automation',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      borderGlow: 'group-hover:border-blue-500/30',
      skills: ['Agentic AI Systems', 'n8n Workflows', 'LangChain', 'MCP Protocol', 'RAG Pipelines', 'Multi-Agent', 'Prompting', 'FAISS']
    },
    {
      icon: Zap,
      title: 'LLM & GenAI',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      borderGlow: 'group-hover:border-purple-500/30',
      skills: ['Gemini API', 'GPT-4o-mini', 'Claude 3.5', 'Groq (Llama 4)', 'OpenRouter', 'Pusher', 'Telegram API', 'WhatsApp API']
    },
    {
      icon: Code,
      title: 'Languages',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      borderGlow: 'group-hover:border-emerald-500/30',
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'SQL', 'C++', 'HTML/CSS']
    },
    {
      icon: Database,
      title: 'ML & Data',
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
      borderGlow: 'group-hover:border-amber-500/30',
      skills: ['Scikit-Learn', 'NumPy & Pandas', 'Regression', 'SVM & KNN', 'Decision Trees', 'K-Means', 'PCA', 'Matplotlib']
    },
    {
      icon: Wrench,
      title: 'Tools & Platforms',
      gradient: 'from-rose-500/20 to-red-500/20',
      iconColor: 'text-rose-400',
      borderGlow: 'group-hover:border-rose-500/30',
      skills: ['Supabase', 'Firebase', 'Google Cloud', 'Jupyter', 'Git & GitHub', 'Figma', 'Apify', 'Vercel']
    },
    {
      icon: Users,
      title: 'Soft Skills',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      iconColor: 'text-indigo-400',
      borderGlow: 'group-hover:border-indigo-500/30',
      skills: ['Leadership', 'Project Mgmt', 'Public Speaking', 'Team Mgmt', 'Negotiation', 'Mentorship', 'Agile', 'Strategy']
    }
  ];

  const stats = [
    { label: 'Programming Languages', value: '8+', icon: Code },
    { label: 'LLM Integrations', value: '6+', icon: Cpu },
    { label: 'AI Frameworks', value: '10+', icon: Layers },
    { label: 'Tools & Platforms', value: '15+', icon: Wrench }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [skillCategories.length]);

  return (
    <section ref={sectionRef} id="skills" className="py-24 lg:py-32 relative bg-background overflow-hidden selection:bg-primary/30">

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-70 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] opacity-70 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Build</span> With
            </h2>
          </div>
          <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
            From Agentic AI systems to production ML models — a full-stack technical toolkit.
          </p>
        </div>

        {/* Dynamic Skill Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isActive = index === activeCategory;
            const delay = index * 100;

            return (
              <div
                key={category.title}
                className={`group relative rounded-[2rem] p-8 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden transition-all duration-700 ease-out
                  hover:-translate-y-2 hover:bg-white/[0.03] ${category.borderGlow} hover:shadow-2xl hover:shadow-black/50
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  ${isActive ? 'border-primary/20 bg-white/[0.04]' : ''}
                `}
                style={{ transitionDelay: `${200 + delay}ms` }}
                onMouseEnter={() => setActiveCategory(index)}
              >
                {/* Active / Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-opacity duration-500 rounded-[2rem] -z-10 ${isActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`} />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform duration-500 ${isActive ? 'scale-110 border-white/10' : ''}`}>
                    <IconComponent className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-syne font-semibold text-white tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={skill}
                      className={`px-3.5 py-1.5 rounded-full text-[13px] font-dmsans font-medium tracking-wide transition-all duration-300
                        ${isActive
                          ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                          : 'bg-white/[0.03] text-white/60 border border-white/[0.05] group-hover:bg-white/[0.05] group-hover:text-white/80'
                        }
                      `}
                      style={{ transitionDelay: `${isActive ? sIdx * 50 : 0}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Global Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`relative group rounded-[1.5rem] p-6 bg-white/[0.01] border border-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out
                  hover:bg-white/[0.03] hover:border-white/10
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: `${800 + (index * 100)}ms` }}
              >
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110 transform">
                  <Icon className="w-24 h-24 text-white" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
                  <span className="text-4xl lg:text-5xl font-bold font-syne text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/60 font-medium font-dmsans tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;