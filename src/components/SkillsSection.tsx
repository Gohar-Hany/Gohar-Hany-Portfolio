import { useEffect, useState } from 'react';
import { Brain, Code, Database, Zap, Wrench, Users } from 'lucide-react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      icon: Brain,
      title: 'AI & Automation',
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10',
      skills: [
        'Agentic AI Systems',
        'n8n Workflow Automation',
        'LangChain Framework',
        'MCP Protocol',
        'RAG Pipelines',
        'Multi-Agent Orchestration',
        'Prompt Engineering',
        'Vector Databases (FAISS)'
      ]
    },
    {
      icon: Zap,
      title: 'LLM & GenAI',
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/10',
      skills: [
        'Google Gemini API',
        'GPT-4o-mini',
        'Claude 3.5 Haiku',
        'Groq (Llama 4)',
        'OpenRouter',
        'Pusher Real-time',
        'Telegram Bot API',
        'WhatsApp Evolution API'
      ]
    },
    {
      icon: Code,
      title: 'Programming Languages',
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10',
      skills: [
        'Python',
        'JavaScript',
        'Java',
        'Go',
        'SQL',
        'Lua',
        'C++',
        'HTML/CSS'
      ]
    },
    {
      icon: Database,
      title: 'ML & Data Science',
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/10',
      skills: [
        'Scikit-Learn',
        'NumPy & Pandas',
        'Linear/Logistic Regression',
        'SVM & KNN',
        'Decision Trees',
        'K-Means Clustering',
        'PCA',
        'Matplotlib & Seaborn'
      ]
    },
    {
      icon: Wrench,
      title: 'Tools & Platforms',
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10',
      skills: [
        'Supabase',
        'Google Sheets API',
        'Google Drive API',
        'Jupyter Notebooks',
        'Kaggle',
        'Git & GitHub',
        'Figma',
        'Apify'
      ]
    },
    {
      icon: Users,
      title: 'Soft Skills',
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/10',
      skills: [
        'Leadership',
        'Project Management',
        'Public Speaking',
        'Team Management',
        'Negotiation',
        'Technical Training',
        'Communication',
        'Critical Thinking'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills">
      <div className="skills-inner px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <div className="section-tag mx-auto justify-center">Tech Stack</div>
          <h2 className="section-title">
            What I <span>Build</span> With
          </h2>
          <p className="text-xl text-white/60 font-dmsans max-w-3xl mx-auto mt-6">
            From Agentic AI systems to production ML models — a full-stack technical toolkit
          </p>
        </div>

        {/* Skill categories */}
        <div className="skills-grid">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isActive = index === activeCategory;
            const animationDelay = index * 0.1;

            return (
              <div
                key={category.title}
                className={`skill-card ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}
                style={{
                  animationDelay: `${animationDelay}s`,
                  animationFillMode: 'both'
                }}
              >
                <span className="skill-icon flex items-center text-primary">
                  <IconComponent size={28} />
                </span>
                <div className="skill-name">{category.title}</div>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats with staggered animation */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Programming Languages', value: '8+' },
            { label: 'LLM Integrations', value: '6+' },
            { label: 'AI Frameworks', value: '10+' },
            { label: 'Tools & Platforms', value: '15+' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center stat-card transition-all duration-300 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'
                }`}
              style={{
                animationDelay: `${0.6 + index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;