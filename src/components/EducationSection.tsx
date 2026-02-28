import { useEffect, useState } from 'react';
import { GraduationCap, Award, BookOpen, Trophy, FileCheck, Star } from 'lucide-react';

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const education = {
    degree: 'Bachelor of Science in Computer Science',
    specialization: 'Faculty of Science',
    university: 'Alexandria University',
    location: 'Alexandria, Egypt',
    grade: 'GPA 3.5/4.0 (Excellent with Honors)',
    period: 'Oct 2022 - Oct 2025',
    graduationProject: 'Agentic AI Learning Assistant — High Excellence Rating',
    description: 'Comprehensive computer science program with focus on AI, Machine Learning, and Software Engineering.',
    coursework: [
      'AI & Machine Learning',
      'Distributed Systems',
      'Software Engineering',
      'Database Management',
      'Digital Image Processing',
      'Computer Networks',
      'Operating Systems',
      'Information Retrieval'
    ]
  };

  const awards = [
    {
      id: 1,
      title: 'YLF Finalist',
      organization: 'Young Leaders Fellowship',
      year: '2024',
      category: 'Leadership',
      icon: Trophy,
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10',
      description: 'Selected as one of the top finalists in Egypt for exceptional leadership potential and community impact.',
      achievement: 'Top young leaders nationwide'
    },
    {
      id: 2,
      title: 'High Excellence Rating',
      organization: 'Alexandria University',
      year: '2025',
      category: 'Academic',
      icon: Award,
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/10',
      description: 'Received highest distinction for graduation project: Agentic AI Learning Assistant with advanced RAG and memory systems.',
      achievement: 'Top-rated graduation project'
    },
    {
      id: 3,
      title: 'Digilians Scholar',
      organization: 'Ministry of Communications & MTC',
      year: '2026',
      category: 'Training',
      icon: Star,
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10',
      description: 'Selected for intensive 4-month residential AI training program covering ML, DL, NLP, CV, and MLOps.',
      achievement: 'Among selected nationwide cohort'
    }
  ];

  const certifications = [
    {
      name: 'Machine Learning',
      issuer: 'Information Technology Institute (ITI)',
      year: '2024',
      type: 'Technical'
    },
    {
      name: 'AI Automation Kickstart',
      issuer: 'Udemy',
      year: '2025',
      type: 'Technical'
    },
    {
      name: 'AI for Startups',
      issuer: 'Udemy',
      year: '2025',
      type: 'Business'
    },
    {
      name: 'Business Development',
      issuer: 'Hawk Insight',
      year: '2024',
      type: 'Business'
    },
    {
      name: 'Python Basics',
      issuer: 'Mahara Tech',
      year: '2024',
      type: 'Technical'
    },
    {
      name: 'Smart Time Management',
      issuer: 'My Tools',
      year: '2024',
      type: 'Soft Skills'
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

    const element = document.getElementById('education');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-24 lg:py-36 relative overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-syne mb-6 text-white">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Recognition</span>
          </h2>
          <p className="text-xl text-muted-foreground font-dmsans max-w-3xl mx-auto">
            Academic excellence with practical AI expertise and recognized leadership
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Education Details */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <div className="stat-card p-8 lg:p-12 relative overflow-hidden group border border-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
              {/* Left side - Education info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-primary/20 flex items-center justify-center">
                    <GraduationCap size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold font-syne text-white">{education.degree}</h3>
                    <p className="text-accent font-dmsans font-medium">{education.specialization}</p>
                  </div>
                </div>

                <div className="space-y-4 font-dmsans">
                  <div>
                    <h4 className="font-semibold text-white mb-2">University</h4>
                    <p className="text-white/70">{education.university}, {education.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Grade</h4>
                      <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium">
                        {education.grade}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Period</h4>
                      <p className="text-white/70">{education.period}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Graduation Project</h4>
                    <p className="text-accent font-medium">{education.graduationProject}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Description</h4>
                    <p className="text-white/70 leading-relaxed">{education.description}</p>
                  </div>
                </div>
              </div>

              {/* Right side - Coursework */}
              <div className="space-y-6">
                <h4 className="text-xl font-syne font-semibold text-white">Key Coursework</h4>
                <div className="grid grid-cols-2 gap-3 font-dmsans">
                  {education.coursework.map((course, index) => (
                    <div
                      key={course}
                      className="p-3 bg-[#040d1a] border border-white/5 rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300 group cursor-default text-white/70"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold font-syne text-center mb-12 text-white">
            Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Recognition</span>
          </h3>

          <div className="grid lg:grid-cols-3 gap-8">
            {awards.map((award, index) => {
              const IconComponent = award.icon;

              return (
                <div
                  key={award.id}
                  className="stat-card p-8 text-center transition-all duration-500 group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#040d1a] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all`}>
                    <IconComponent size={36} className={award.color} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold font-syne text-white mb-2">{award.title}</h4>
                      <p className="text-primary font-medium font-dmsans">{award.organization}</p>
                      <div className="flex items-center justify-center space-x-2 mt-2 font-dmsans">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${award.color === 'text-primary' ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-accent/10 border border-accent/20 text-accent'}`}>
                          {award.category}
                        </span>
                        <span className="text-muted-foreground text-sm">{award.year}</span>
                      </div>
                    </div>

                    <p className="text-white/70 font-dmsans text-sm leading-relaxed">{award.description}</p>

                    <div className="pt-4 border-t border-muted/20">
                      <p className={`font-semibold text-sm ${award.color}`}>{award.achievement}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-syne text-white font-bold text-center mb-12">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Certifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="stat-card p-6 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#040d1a] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-accent/50 group-hover:shadow-[0_0_15px_rgba(0,255,150,0.3)] transition-all">
                    <FileCheck size={24} className="text-accent" />
                  </div>

                  <div className="flex-1 font-dmsans">
                    <h4 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-white/50 mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{cert.year}</span>
                      <span className="px-2 py-1 bg-[#040d1a] border border-white/5 rounded text-xs font-medium text-white/70">
                        {cert.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <div className="stat-card p-8 max-w-4xl mx-auto shadow-glow-blue border border-primary/20">
            <h3 className="text-2xl font-semibold font-syne text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">Continuous Learning & Excellence</h3>
            <p className="text-white/80 font-dmsans leading-relaxed">
              From achieving GPA 3.5/4.0 in Computer Science to earning High Excellence for my Agentic AI project,
              I combine theoretical knowledge with practical application. Currently expanding my expertise at the
              Digilians Scholarship — an intensive AI training program by the Ministry of Communications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;