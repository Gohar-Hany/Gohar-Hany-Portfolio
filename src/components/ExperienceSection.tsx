import { useEffect, useState } from 'react';
import { MapPin, Calendar, Briefcase, Users, Award, TrendingUp, GraduationCap } from 'lucide-react';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      id: 1,
      title: 'Machine Learning Developer Trainee',
      company: 'Digilians Scholarship',
      subtitle: 'Ministry of Communications & Military Technical College',
      location: 'Egypt',
      period: 'Jan 2026 - Present',
      type: 'Current',
      icon: GraduationCap,
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10',
      description: 'Enrolled in intensive 4-month residential AI training program covering cutting-edge technologies and real-world applications.',
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
      bgColor: 'from-accent/20 to-accent/10',
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
      bgColor: 'from-primary/20 to-primary/10',
      description: 'Leading team of 300+ active members and board of 20+ leaders in community development initiatives.',
      achievements: [
        'Leading team of 300+ members with board of 20+ leaders',
        'Launched 3 impactful campaigns with 25+ sessions',
        'Secured 10+ strategic deals and partnerships',
        'Achieved 100K+ reach across social media platforms'
      ],
      skills: ['Team Leadership', 'Strategic Planning', 'Campaign Management', 'Partnership Development']
    },
    {
      id: 4,
      title: 'Coach',
      company: 'Hawk Insight - STP',
      subtitle: 'Business Development Mentoring',
      location: 'Alexandria, Egypt',
      period: 'Jul - Oct 2024',
      type: 'Mentoring',
      icon: Award,
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/10',
      description: 'Guided participants in business development including BMC, operational, financial, and marketing planning.',
      achievements: [
        'Mentored 10+ participants in business development',
        'Improved project completion rates to 95%',
        'Conducted workshops on soft skills and presentations',
        'Helped participants achieve 85% success rate in funding/partnerships'
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
      bgColor: 'from-primary/20 to-primary/10',
      description: 'Directed PR strategy for large-scale technology conference, coordinating speakers, sponsors, and media.',
      achievements: [
        'Coordinated 10+ speakers for the event',
        'Negotiated 25+ sponsor deals',
        'Secured TEDx Alexandria University partnership',
        'Achieved high attendee satisfaction'
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
      bgColor: 'from-accent/20 to-accent/10',
      description: 'Managing PR for the entire project, securing partnerships and leading the PR team.',
      achievements: [
        'Secured 30+ deals and partnerships',
        'Leading team of 15 members',
        'Managing comprehensive PR strategy',
        'Building strategic organizational relationships'
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
      bgColor: 'from-primary/20 to-primary/10',
      description: 'Managed coding education project, coordinating selection process and multiple coding tracks.',
      achievements: [
        'Managed project for 100+ team members',
        'Coordinated selection: 250 admitted from 400 applicants',
        'Oversaw 4 different coding tracks',
        'Ensured successful program delivery'
      ],
      skills: ['Project Management', 'Team Coordination', 'Selection Process', 'Program Delivery']
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

    const element = document.getElementById('experience');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24 lg:py-36 relative overflow-hidden section-alt">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <div className="section-tag mx-auto justify-center">Experience</div>
          <h2 className="section-title">
            Professional <span>Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground font-dmsans max-w-3xl mx-auto mt-6">
            From ML training to leadership roles — building expertise across AI, PR, and community development
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline navigation */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-left' : 'opacity-0 -translate-x-10'}`}>
            <div className="sticky top-32 space-y-4">
              <h3 className="text-2xl font-bold font-syne text-white mb-6">Timeline</h3>

              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                const isActive = index === activeExperience;

                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExperience(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative ${isActive
                      ? 'stat-card !p-4 ring-1 ring-primary shadow-glow-blue'
                      : 'bg-card border border-border/50 hover:border-primary/30'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exp.bgColor} flex items-center justify-center transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                        <IconComponent size={18} className={exp.color} />
                      </div>

                      <div className="flex-1 min-w-0 font-dmsans">
                        <h4 className={`font-semibold font-syne text-sm transition-colors ${isActive ? exp.color : 'text-white/80 group-hover:text-primary'}`}>
                          {exp.title}
                        </h4>
                        <p className="text-xs text-white/60 truncate">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                      </div>

                      {exp.type === 'Current' && (
                        <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium font-dmsans">
                          Current
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience details */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              const isActive = index === activeExperience;

              if (!isActive) return null;

              return (
                <div
                  key={exp.id}
                  className="project-card p-8 transition-all duration-500 animate-scale-in"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center`}>
                        <IconComponent size={28} className={exp.color} />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold font-syne text-white">{exp.title}</h3>
                        <p className="text-lg text-primary font-medium font-dmsans">{exp.company}</p>
                        {exp.subtitle && (
                          <p className="text-sm text-white/50 font-dmsans">{exp.subtitle}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2 font-dmsans">
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} className="text-primary/70" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} className="text-primary/70" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span className={`skill-tag ${exp.color === 'text-accent' ? '!text-accent !border-accent/20' : ''}`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6 relative z-10">
                    <p className="text-white/70 font-dmsans leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6 relative z-10">
                    <h4 className="text-lg font-semibold font-syne text-white mb-4">Key Highlights</h4>
                    <div className="space-y-3 font-dmsans">
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 animate-fade-up"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${exp.color === 'text-primary' ? 'bg-primary shadow-glow-blue' : 'bg-accent shadow-glow-green'}`} />
                          <span className="text-white/80">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold font-syne text-white mb-4">Skills Developed</h4>
                    <div className="flex flex-wrap gap-2 font-dmsans">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="tech-tag"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom summary */}
        <div className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: 'Leadership Roles', value: '5+', icon: TrendingUp },
            { label: 'People Led', value: '300+', icon: Users },
            { label: 'Partnerships Secured', value: '80+', icon: Briefcase },
            { label: 'Campaigns Delivered', value: '25+', icon: Award }
          ].map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center stat-card transition-all duration-300 group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all">
                  <IconComponent size={24} className="text-primary" />
                </div>
                <div className="stat-num">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;