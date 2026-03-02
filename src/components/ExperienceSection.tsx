import { useEffect, useState, useRef } from 'react';
import { MapPin, Calendar, Briefcase, Users, Award, TrendingUp, GraduationCap, ChevronRight } from 'lucide-react';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      id: 1,
      title: 'Machine Learning Developer Trainee',
      company: 'Digilians Scholarship',
      subtitle: 'Ministry of Communications & MTC',
      location: 'Egypt',
      period: 'Jan 2026 - Present',
      type: 'Current',
      icon: GraduationCap,
      color: 'text-primary',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      description: 'Enrolled in an intensive 4-month residential AI training program covering cutting-edge technologies and real-world applications.',
      achievements: [
        'Training in ML, Deep Learning, NLP, Computer Vision, and MLOps',
        'Azure AI certification track (Fundamentals + Engineer Associate)',
        'Hands-on with LLMs, GANs, Hugging Face, and MLflow',
        'Working on capstone projects applying concepts to real-world scenarios'
      ],
      skills: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'Azure AI']
    },
    {
      id: 2,
      title: 'Machine Learning Trainee',
      company: 'Information Technology Institute (ITI)',
      subtitle: 'Alexandria Branch',
      location: 'Alexandria, Egypt',
      period: 'Aug 2024',
      type: 'Training',
      icon: Briefcase,
      color: 'text-accent',
      bgColor: 'from-emerald-500/20 to-teal-500/20',
      description: 'Intensive supervised machine learning training covering fundamental algorithms and data preprocessing techniques.',
      achievements: [
        'Trained in supervised ML: data quality, missing values, outlier detection, scaling',
        'Worked with ML models: Linear Regression, Logistic Regression, SVM, KNN, Decision Trees',
        'Mastered Gradient Descent, Confusion Matrix, Accuracy, Recall, Precision, F-score',
        'Learned correct data splitting techniques to avoid data leakage'
      ],
      skills: ['Supervised ML', 'Scikit-Learn', 'Data Preprocessing', 'Model Evaluation']
    },
    {
      id: 3,
      title: 'Vice President',
      company: '3ommar Community',
      subtitle: 'Leadership Role',
      location: 'Alexandria, Egypt',
      period: 'Jan 2024 - Present',
      type: 'Leadership',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      description: 'Leading a core team of 300+ active members and a board of 20+ leaders in major community development initiatives.',
      achievements: [
        'Leading team of 300+ members and 20+ executives',
        'Launched 3 impactful campaigns containing 25+ sessions',
        'Secured 10+ strategic deals and partnerships',
        'Achieved 100K+ reach across social media platforms'
      ],
      skills: ['Team Leadership', 'Strategic Planning', 'Campaign Management', 'Partnership Development']
    },
    {
      id: 4,
      title: 'Coach',
      company: 'Hawk Insight - STP',
      subtitle: 'Business Mentoring',
      location: 'Alexandria, Egypt',
      period: 'Jul - Oct 2024',
      type: 'Mentoring',
      icon: Award,
      color: 'text-accent',
      bgColor: 'from-emerald-500/20 to-teal-500/20',
      description: 'Guided participants in business development, helping them build operational, financial, and marketing structures (BMC).',
      achievements: [
        'Mentored 10+ participants in robust business development',
        'Improved project completion rates to 95%',
        'Conducted workshops on soft skills and executive presentations',
        'Helped participants achieve 85% success rate in funding'
      ],
      skills: ['Business Development', 'Coaching', 'Workshop Delivery', 'Project Management']
    },
    {
      id: 5,
      title: 'Public Relations Director',
      company: '3ommarX',
      subtitle: 'Alexandria University',
      location: 'Alexandria, Egypt',
      period: 'May - Jul 2024',
      type: 'Event Management',
      icon: Users,
      color: 'text-primary',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      description: 'Directed the entire PR strategy for a large-scale university technology conference, coordinating speakers and securing sponsors.',
      achievements: [
        'Coordinated 10+ renowned speakers for the main event',
        'Negotiated 25+ major sponsor deals',
        'Secured official TEDx Alexandria University partnership',
        'Achieved overwhelming attendee satisfaction ratings'
      ],
      skills: ['Event Planning', 'Sponsor Relations', 'Media Strategy', 'Stakeholder Management']
    },
    {
      id: 6,
      title: 'PR Board Member',
      company: 'Space E',
      subtitle: 'Alexandria University',
      location: 'Alexandria, Egypt',
      period: 'Sep 2024 - Present',
      type: 'Public Relations',
      icon: Users,
      color: 'text-accent',
      bgColor: 'from-emerald-500/20 to-teal-500/20',
      description: 'Managing comprehensive PR strategies for the university project, securing top-tier partnerships and leading the PR team.',
      achievements: [
        'Secured 30+ external deals and partnerships',
        'Leading an operational team of 15 members',
        'Managing end-to-end organizational PR strategy',
        'Building strategic external corporate relationships'
      ],
      skills: ['Partnership Development', 'Team Leadership', 'PR Strategy', 'Negotiation']
    },
    {
      id: 7,
      title: 'Project Manager',
      company: 'i-Code',
      subtitle: 'Alexandria University',
      location: 'Alexandria, Egypt',
      period: 'Aug - Dec 2023',
      type: 'Project Management',
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      description: 'Managed a vast coding education project, coordinating the strict selection process and administering multiple technical tracks.',
      achievements: [
        'Managed operations for a 100+ member execution team',
        'Coordinated selection: 250 admitted from 400+ applicants',
        'Oversaw curriculum and delivery for 4 diverse coding tracks',
        'Ensured successful end-to-end program delivery'
      ],
      skills: ['Project Management', 'Team Coordination', 'Selection Process', 'Program Delivery']
    }
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

  return (
    <section ref={sectionRef} id="experience" className="py-24 lg:py-32 relative bg-background overflow-hidden selection:bg-primary/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-60 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] opacity-60 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Career</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Journey</span>
            </h2>
          </div>
          <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
            Building expertise across AI, leadership, and community development.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">

          {/* Timeline navigation (Left Column) */}
          <div className={`lg:col-span-5 xl:col-span-4 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="sticky top-32 flex flex-col gap-3">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                const isActive = index === activeExperience;
                const isPrimary = exp.color === 'text-primary';

                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExperience(index)}
                    className={`group relative w-full text-left p-4 rounded-[1.25rem] transition-all duration-500 overflow-hidden outline-none
                      ${isActive
                        ? 'bg-white/[0.04] border-white/20 shadow-lg shadow-black/20'
                        : 'bg-white/[0.015] border-white/[0.03] hover:bg-white/[0.03] hover:border-white/10'
                      } border backdrop-blur-md`}
                  >
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${isPrimary ? 'from-primary/10 to-transparent' : 'from-accent/10 to-transparent'} opacity-100`} />
                    )}

                    <div className="relative flex items-center gap-4">
                      <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-500
                        ${isActive
                          ? isPrimary ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(0,183,255,0.3)]' : 'bg-accent/20 text-accent shadow-[0_0_15px_rgba(0,255,170,0.3)]'
                          : 'bg-white/[0.03] text-white/40 group-hover:text-white/80 group-hover:bg-white/10'
                        }`}
                      >
                        <IconComponent size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform duration-300'} />
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className={`text-[15px] font-bold font-syne truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
                          {exp.title}
                        </h4>
                        <p className={`text-[13px] truncate font-dmsans mt-0.5 transition-colors duration-300 ${isActive ? (isPrimary ? 'text-primary/90' : 'text-accent/90') : 'text-white/40'}`}>
                          {exp.company}
                        </p>
                      </div>

                      <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <ChevronRight size={18} className={isPrimary ? 'text-primary' : 'text-accent'} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience details (Right Column) */}
          <div className={`lg:col-span-7 xl:col-span-8 transition-all duration-1000 delay-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative h-full min-h-[600px] lg:min-h-0">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                const isActive = index === activeExperience;
                const isPrimary = exp.color === 'text-primary';

                if (!isActive) return null;

                return (
                  <div
                    key={exp.id}
                    className="absolute inset-0 animate-in fade-in slide-in-from-bottom-8 duration-700"
                  >
                    <div className="h-full rounded-[2rem] p-8 md:p-10 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl flex flex-col overflow-hidden group">
                      {/* Active Background Glow */}
                      <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${exp.bgColor} rounded-full blur-[100px] opacity-30 pointer-events-none transition-opacity duration-1000`} />

                      {/* Header */}
                      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b border-white/[0.05] pb-8">
                        <div className="flex items-start gap-5">
                          <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <IconComponent size={28} className={isPrimary ? 'text-primary' : 'text-accent'} />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold font-syne text-white mb-2 leading-tight">
                              {exp.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-dmsans">
                              <span className={`font-semibold text-lg ${isPrimary ? 'text-primary/90' : 'text-accent/90'}`}>{exp.company}</span>
                              {exp.subtitle && (
                                <>
                                  <span className="hidden sm:block text-white/20">•</span>
                                  <span className="text-white/50">{exp.subtitle}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-white/5 backdrop-blur-md
                            ${isPrimary ? 'text-primary border-primary/20' : 'text-accent border-accent/20'}`}>
                            {exp.type}
                          </span>
                          <div className="flex flex-col items-start md:items-end text-[13px] text-white/50 font-dmsans gap-1.5 pt-1">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-white/30" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-white/30" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 flex-1 flex flex-col gap-10">
                        {/* Description */}
                        <div>
                          <p className="text-base md:text-[17px] text-white/70 font-dmsans leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-5">Key Highlights</h4>
                          <div className="grid gap-3 font-dmsans">
                            {exp.achievements.map((achievement, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.015] border border-white/[0.03] hover:bg-white/[0.03] transition-colors"
                              >
                                <div className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPrimary ? 'bg-primary shadow-[0_0_8px_rgba(0,183,255,0.8)]' : 'bg-accent shadow-[0_0_8px_rgba(0,255,170,0.8)]'}`} />
                                <span className="text-[15px] text-white/80 leading-relaxed">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mt-auto pt-4">
                          <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-4">Skills & Technologies</h4>
                          <div className="flex flex-wrap gap-2.5 font-dmsans">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-4 py-2 rounded-xl text-[13px] font-medium text-white/70 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:text-white transition-colors cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom summary / Stats Bento */}
        <div className={`mt-20 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { label: 'Leadership Roles', value: '5+', icon: TrendingUp },
            { label: 'People Led', value: '300+', icon: Users },
            { label: 'Deals Secured', value: '80+', icon: Briefcase },
            { label: 'Campaigns Delivered', value: '25+', icon: Award }
          ].map((stat, idx) => {
            const IconComponent = stat.icon;
            const delay = idx * 100;
            return (
              <div
                key={stat.label}
                className="group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:-translate-y-2 hover:bg-white/[0.03] transition-all duration-700 hover:shadow-2xl hover:shadow-black/50"
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                    <IconComponent size={26} className="text-white/50 group-hover:text-primary transition-colors duration-500" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold font-syne text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-500">{stat.value}</div>
                  <div className="text-[11px] font-bold font-dmsans text-white/40 uppercase tracking-widest leading-relaxed">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;