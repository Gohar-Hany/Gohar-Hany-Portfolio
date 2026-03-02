export const GalleryStats = () => {
  const stats = [
    { number: "50+", label: "Events Attended", delay: "0ms", color: "text-primary", borderHover: "hover:border-primary/50", glow: "hover:shadow-[0_0_20px_rgba(0,183,255,0.4)]" },
    { number: "15+", label: "Speaking Engagements", delay: "100ms", color: "text-accent", borderHover: "hover:border-accent/50", glow: "hover:shadow-[0_0_20px_rgba(0,255,170,0.4)]" },
    { number: "25+", label: "Industry Connections", delay: "200ms", color: "text-purple-400", borderHover: "hover:border-purple-400/50", glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]" }
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`group flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] ${stat.borderHover} ${stat.glow}`}
          style={{ transitionDelay: stat.delay }}
        >
          <div className={`text-4xl lg:text-5xl font-bold font-syne mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
            {stat.number}
          </div>
          <div className="text-white/60 font-medium font-dmsans text-sm uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
