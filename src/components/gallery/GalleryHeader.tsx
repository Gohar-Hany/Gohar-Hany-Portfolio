export const GalleryHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-fade-up">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-primary"></div>
          <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Community & Impact</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
          Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Highlights</span>
        </h2>
      </div>
      <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
        A collection of memorable moments from conferences, industry events, and professional gatherings where I've had the privilege to speak, learn, and connect.
      </p>
    </div>
  );
};
