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
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-40 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GalleryHeader />
      </div>

      {/* Dome Gallery Container */}
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] lg:h-[800px] my-6 sm:my-12 z-10">
        <DomeGallery
          images={galleryItems.map(item => ({ src: item.image, alt: item.title, ...item }))}
          onImageClick={(item: any) => setSelectedItem(item as GalleryItemType)}
          overlayBlurColor="#090d11"
        />
      </div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-6xl w-full sm:w-[90vw] h-[100dvh] sm:h-auto sm:max-h-[85vh] p-0 bg-[#090d11] sm:bg-black/75 border-0 sm:border border-white/[0.08] backdrop-blur-3xl overflow-y-auto sm:overflow-hidden rounded-none sm:rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(0,183,255,0.2)] data-[state=open]:animate-in data-[state=closed]:animate-out duration-300">
            {selectedItem && (
              <div className="relative group/modal flex flex-col md:flex-row min-h-full sm:min-h-0 md:h-[75vh] max-h-none md:max-h-[850px]">
                {/* Image Section - Left (or Top on mobile) */}
                <div className="relative w-full md:w-[60%] lg:w-[65%] h-[38vh] sm:h-[45vh] md:h-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 z-10 hidden md:block pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10 md:hidden pointer-events-none" />

                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    width="1200"
                    height="800"
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover animate-in zoom-in-[1.05] duration-700 ease-out"
                  />

                  {/* Seamless merge masks */}
                  <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-r from-transparent via-[#090d11]/60 to-[#090d11] z-20 hidden md:block pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-24 md:hidden bg-gradient-to-b from-transparent via-[#090d11]/80 to-[#090d11] z-20 pointer-events-none" />
                </div>

                {/* Content Section - Right (or Bottom on mobile) */}
                <div className="relative w-full md:w-[40%] lg:w-[35%] flex flex-col justify-start md:justify-center p-6 sm:p-8 md:p-10 lg:p-12 z-20 bg-gradient-to-t md:bg-gradient-to-r from-[#090d11] to-[#090d11]/95 overflow-y-visible md:overflow-y-auto custom-scroll">
                  <div className="animate-in slide-in-from-right-6 fade-in-0 duration-500 delay-100 fill-mode-both">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-4 sm:mb-6">
                      <Badge className={`${getTypeColor(selectedItem.type)} font-bold px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] sm:text-xs shadow-lg`}>
                        {selectedItem.type}
                      </Badge>
                      {selectedItem.featured && (
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
                          <Badge className="relative bg-[#090d11] text-primary border border-primary/30 font-bold px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] sm:text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-syne text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                      {selectedItem.title}
                    </h3>

                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-4 sm:mb-6 shrink-0" />

                    <p className="text-white/75 font-dmsans text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                      {selectedItem.description}
                    </p>

                    {/* Metadata Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col gap-1.5 sm:gap-2 bg-white/[0.03] border border-white/[0.05] p-3 sm:p-4 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-dmsans">Date</span>
                        <span className="text-xs sm:text-sm font-semibold text-white/90">{selectedItem.date}</span>
                      </div>

                      <div className="flex flex-col gap-1.5 sm:gap-2 bg-white/[0.03] border border-white/[0.05] p-3 sm:p-4 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] transition-colors">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-dmsans">Location</span>
                        <span className="text-xs sm:text-sm font-semibold text-white/90 truncate" title={selectedItem.location}>{selectedItem.location}</span>
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
              className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 sm:bg-white/5 border border-white/20 sm:border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 z-50 group backdrop-blur-xl shadow-lg"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
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
