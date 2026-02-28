export const GalleryStats = () => {
  const stats = [
    { number: "50+", label: "Events Attended", delay: "0s" },
    { number: "15+", label: "Speaking Engagements", delay: "0.1s" },
    { number: "25+", label: "Industry Connections", delay: "0.2s" }
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="glass p-6 rounded-xl border-border/50 text-center group hover:scale-105 transition-all duration-300"
          style={{ animationDelay: stat.delay }}
        >
          <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
            {stat.number}
          </div>
          <div className="text-muted-foreground text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};