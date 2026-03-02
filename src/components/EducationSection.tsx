import { useEffect, useState, useRef } from 'react';
import { GraduationCap, Award, BookOpen, Trophy, FileCheck, Star } from 'lucide-react';

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const education = {
    degree: 'Bachelor of Science in Computer Science',
    specialization: 'Faculty of Science',
    university: 'Alexandria University',
    location: 'Alexandria, Egypt',
    grade: 'GPA 3.5/4.0 (Excellent with Honors)',
    period: 'Oct 2022 - Oct 2025',
    graduationProject: 'Agentic AI Learning Assistant — High Excellence Rating',
    description: 'Comprehensive computer science program with an intense focus on Artificial Intelligence, Machine Learning, and advanced Software Engineering principles.',
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
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'group-hover:border-primary/50',
      shadow: 'group-hover:shadow-[0_0_20px_rgba(0,183,255,0.4)]',
      description: 'Selected as one of the top finalists in Egypt for exceptional leadership potential and demonstrable community impact.',
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
      bgColor: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'group-hover:border-accent/50',
      shadow: 'group-hover:shadow-[0_0_20px_rgba(0,255,170,0.4)]',
      description: 'Received the highest academic distinction for graduation project: Agentic AI Learning Assistant, featuring advanced RAG and custom memory systems.',
      achievement: 'Top-rated graduation project'
    },
    {
      id: 3,
      title: 'Digilians Scholar',
      organization: 'Ministry of Communications & MTC',
      year: '2026',
      category: 'Training',
      icon: Star,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-fuchsia-500/20',
      borderColor: 'group-hover:border-purple-400/50',
      shadow: 'group-hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]',
      description: 'Selected for an intensive 4-month residential AI training program covering ML, DL, NLP, CV, and applied MLOps.',
      achievement: 'Among elite selected nationwide cohort'
    }
  ];

  const certifications = [
    { name: 'Machine Learning', issuer: 'Information Technology Institute (ITI)', year: '2024', type: 'Technical' },
    { name: 'AI Automation Kickstart', issuer: 'Udemy', year: '2025', type: 'Technical' },
    { name: 'AI for Startups', issuer: 'Udemy', year: '2025', type: 'Business' },
    { name: 'Business Development', issuer: 'Hawk Insight', year: '2024', type: 'Business' },
    { name: 'Python Basics', issuer: 'Mahara Tech', year: '2024', type: 'Technical' },
    { name: 'Smart Time Management', issuer: 'My Tools', year: '2024', type: 'Soft Skills' }
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
    <section ref={sectionRef} id="education" className="py-24 lg:py-36 relative bg-background overflow-hidden selection:bg-primary/30">
      {/* Immersive background glow */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] opacity-40 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Background</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
              Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Recognition</span>
            </h2>
          </div>
          <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
            Academic excellence merging with practical AI expertise and recognized leadership.
          </p>
        </div>

        {/* Education Details - Grand Bento Box */}
        <div className={`mb-8 lg:mb-12 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative p-8 md:p-12 lg:p-14 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:bg-white/[0.03] transition-colors duration-700">
            {/* Decorative internal glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 relative z-10">

              {/* Left Side: Education Info */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-xl shadow-black/20">
                    <GraduationCap size={40} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-syne text-white mb-2 leading-tight">
                      {education.degree}
                    </h3>
                    <p className="text-lg md:text-xl text-accent font-dmsans font-medium">
                      {education.specialization}
                    </p>
                  </div>
                </div>

                <div className="space-y-8 font-dmsans">
                  {/* University & Grade Grid */}
                  <div className="grid sm:grid-cols-2 gap-6 bg-black/20 p-6 rounded-3xl border border-white/[0.03]">
                    <div>
                      <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">University</h4>
                      <p className="text-white/80 font-medium">{education.university}</p>
                      <p className="text-white/40 text-sm mt-1">{education.location}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Grade</h4>
                      <span className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,183,255,0.15)]">
                        {education.grade}
                      </span>
                    </div>
                  </div>

                  {/* Grad Project & Period Grid */}
                  <div className="grid sm:grid-cols-2 gap-6 p-2">
                    <div>
                      <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Graduation Project</h4>
                      <p className="text-accent/90 font-medium leading-relaxed">{education.graduationProject}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Timeframe</h4>
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-white/70 text-sm font-medium">
                        {education.period}
                      </span>
                    </div>
                  </div>

                  {/* Overview Description */}
                  <div className="p-2">
                    <p className="text-[16px] text-white/60 leading-relaxed max-w-2xl text-balance">
                      {education.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Key Coursework */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-6">Key Academic Coursework</h4>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4 font-dmsans">
                  {education.coursework.map((course, index) => (
                    <div
                      key={course}
                      className="group flex items-center gap-3 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 cursor-default"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <BookOpen size={14} className="text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-[13px] font-medium text-white/70 group-hover:text-white transition-colors">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* Awards & Recognition Section */}
        <div className={`mb-8 lg:mb-12 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {awards.map((award, index) => {
              const IconComponent = award.icon;

              return (
                <div
                  key={award.id}
                  className={`group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden hover:-translate-y-2 hover:bg-white/[0.03] transition-all duration-500 ${award.borderColor} ${award.shadow}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br ${award.bgColor} rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-lg group-hover:bg-white/[0.05] transition-colors">
                        <IconComponent size={28} className={award.color} />
                      </div>
                      <span className="text-2xl font-bold font-syne text-white/10 group-hover:text-white/20 transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <span className={`inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${award.color}`}>
                          {award.category} • {award.year}
                        </span>
                        <h4 className="text-2xl font-bold font-syne text-white mb-2 leading-tight">{award.title}</h4>
                        <p className={`font-medium font-dmsans text-[15px] ${award.color}`}>{award.organization}</p>
                      </div>

                      <p className="text-white/60 font-dmsans text-[15px] leading-relaxed py-2">
                        {award.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/[0.05]">
                      <p className={`font-bold font-syne text-[14px] ${award.color}`}>{award.achievement}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Row (Compact Bento style) */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-8 bg-accent"></div>
            <h3 className="text-xl font-syne font-semibold text-white">Professional Licenses & Certifications</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="group flex items-center gap-5 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                  <FileCheck size={20} className="text-white/40 group-hover:text-accent transition-colors duration-300" />
                </div>

                <div className="flex-1 min-w-0 font-dmsans">
                  <h4 className="font-bold text-[15px] text-white truncate group-hover:text-accent/90 transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-[13px] text-white/50 truncate mb-1">{cert.issuer}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{cert.year}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[11px] font-bold text-accent/70 uppercase tracking-widest">{cert.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Impact Summary Box */}
        <div className={`transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative p-8 md:p-10 rounded-[2rem] bg-gradient-to-r from-primary/10 via-black/40 to-accent/10 border border-t-primary/30 border-white/[0.05] text-center overflow-hidden">
            {/* Decorative background rays */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-gradient-to-b from-primary/20 to-transparent blur-[50px] opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold font-syne text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 mb-6">
                Defining a trajectory of continuous <br className="hidden sm:block" /> learning and excellence
              </h3>
              <p className="text-base md:text-lg text-white/60 font-dmsans leading-relaxed text-balance">
                From securing an honors GPA of 3.5/4.0 in Computer Science to producing a top-rated AI Learning Assistant, my academic journey is inherently tied to practical implementation. Currently sharpening my technical edge within the elite nationwide Digilians Scholarship AI track.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EducationSection;