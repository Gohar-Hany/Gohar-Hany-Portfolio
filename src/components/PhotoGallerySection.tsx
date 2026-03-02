import { galleryItems } from './gallery/GalleryData';
import { GalleryItem } from './gallery/GalleryItem';
import { GalleryStats } from './gallery/GalleryStats';
import { GalleryHeader } from './gallery/GalleryHeader';

const PhotoGallerySection = () => {

  return (
    <section id="gallery" className="py-24 lg:py-36 relative bg-background overflow-hidden selection:bg-primary/30">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040d1a] via-[#040d1a] to-[#040d1a]" />
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-60 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-40 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">
        <GalleryHeader />

        {/* Gallery Grid - Bento Box Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
          {galleryItems.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <GalleryStats />
      </div>
    </section>
  );
};

export default PhotoGallerySection;
