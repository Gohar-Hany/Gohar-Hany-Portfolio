import { useState } from 'react';
import { galleryItems, GalleryItem as GalleryItemType, getTypeColor } from './gallery/GalleryData';
import { GalleryStats } from './gallery/GalleryStats';
import { GalleryHeader } from './gallery/GalleryHeader';
import DomeGallery from './DomeGallery';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

const PhotoGallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItemType | null>(null);

  return (
    <section id="gallery" className="py-24 lg:py-36 relative bg-background overflow-hidden selection:bg-primary/30">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040d1a] via-[#040d1a] to-[#040d1a]" />
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-40 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">
        <GalleryHeader />
      </div>

      {/* Dome Gallery Container */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[800px] my-12 z-10">
        <DomeGallery
          images={galleryItems.map(item => ({ src: item.image, alt: item.title, ...item }))}
          onImageClick={(item: any) => setSelectedItem(item as GalleryItemType)}
          overlayBlurColor="#040d1a"
        />
      </div>

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-6xl w-[95vw] sm:w-[90vw] p-0 bg-black/60 border border-white/[0.08] backdrop-blur-3xl overflow-hidden rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(0,183,255,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98] data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:slide-in-from-top-[50%] duration-500 mt-6 sm:mt-10">
            {selectedItem && (
              <div className="relative group/modal flex flex-col md:flex-row h-[80vh] md:h-[75vh] max-h-[850px]">
                {/* Image Section - Left (or Top on mobile) */}
                <div className="relative w-full md:w-[65%] h-[50%] md:h-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 z-10 hidden md:block pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10 md:hidden pointer-events-none" />

                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    width="1200"
                    height="800"
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover animate-in zoom-in-[1.05] duration-1000 ease-out"
                  />

                  {/* Seamless merge masks */}
                  <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-r from-transparent via-[#020813]/60 to-[#020813] z-20 hidden md:block pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-32 md:hidden bg-gradient-to-b from-transparent via-[#020813]/60 to-[#020813] z-20 pointer-events-none" />
                </div>

                {/* Content Section - Right (or Bottom on mobile) */}
                <div className="relative w-full md:w-[35%] flex flex-col justify-end md:justify-center p-8 md:p-12 z-20 bg-gradient-to-t md:bg-gradient-to-r from-[#020813] to-[#020813]/95">
                  <div className="animate-in slide-in-from-right-8 fade-in-0 duration-700 delay-200 fill-mode-both">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <Badge className={`${getTypeColor(selectedItem.type)} font-bold px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] sm:text-xs shadow-lg`}>
                        {selectedItem.type}
                      </Badge>
                      {selectedItem.featured && (
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
                          <Badge className="relative bg-[#020813] text-primary border border-primary/30 font-bold px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] sm:text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-white mb-6 leading-[1.1] drop-shadow-lg">
                      {selectedItem.title}
                    </h3>

                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6 shrink-0" />

                    <div className="relative mb-8 flex-1 min-h-[100px] overflow-hidden">
                      <p className="absolute inset-0 text-white/70 font-dmsans text-base sm:text-lg leading-relaxed overflow-y-auto pr-4 scrollbar-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] pb-8">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Metadata Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.05] p-4 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                        <Calendar className="w-5 h-5 text-primary mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-dmsans">Date</span>
                        <span className="text-sm font-semibold text-white/90">{selectedItem.date}</span>
                      </div>

                      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.05] p-4 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                        <MapPin className="w-5 h-5 text-accent mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-dmsans">Location</span>
                        <span className="text-sm font-semibold text-white/90 truncate" title={selectedItem.location}>{selectedItem.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />
              </div>
            )}

            {/* Premium Floating Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 z-50 group backdrop-blur-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </DialogContent>
        </Dialog>

        <GalleryStats />
      </div>
    </section>
  );
};

export default PhotoGallerySection;
