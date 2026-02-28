import { galleryItems } from './gallery/GalleryData';
import { GalleryItem } from './gallery/GalleryItem';
import { GalleryStats } from './gallery/GalleryStats';
import { GalleryHeader } from './gallery/GalleryHeader';

const PhotoGallerySection = () => {

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background opacity-50" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <GalleryHeader />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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