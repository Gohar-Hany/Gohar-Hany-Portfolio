import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { GalleryItem as GalleryItemType, getTypeColor } from './GalleryData';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
}

export const GalleryItem = ({ item, index }: GalleryItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`group cursor-pointer transition-all duration-700 hover:-translate-y-2 bg-white/[0.02] border border-white/[0.05] overflow-hidden backdrop-blur-xl hover:bg-white/[0.04] ${item.featured ? 'ring-1 ring-primary/30 shadow-[0_0_30px_rgba(0,183,255,0.15)] hover:shadow-[0_0_30px_rgba(0,183,255,0.3)]' : ''
            }`}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="relative overflow-hidden aspect-[4/3]">
            {item.featured && (
              <div className="absolute top-3 left-3 z-20">
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 font-bold font-syne text-[10px] uppercase tracking-wider px-3 py-1 shadow-lg">
                  Featured
                </Badge>
              </div>
            )}

            {/* Glowing orb behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen pointer-events-none z-10" />

            <img
              src={item.image}
              alt={item.title}
              width="800"
              height="600"
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#040d1a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />

            {/* Hover reveal icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 z-20">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <ExternalLink size={20} />
              </div>
            </div>
          </div>

          <CardContent className="p-5 relative z-20 bg-gradient-to-t from-background via-background/95 to-transparent -mt-10 pt-10">
            <div className="mb-3">
              <Badge className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${getTypeColor(item.type)}`}>
                {item.type}
              </Badge>
            </div>

            <h3 className="font-bold font-syne text-xl mb-2 text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
              {item.title}
            </h3>

            <p className="text-white/60 font-dmsans text-sm mb-4 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/40 font-dmsans pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-[100px]">{item.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black/40 border border-white/10 backdrop-blur-2xl overflow-hidden rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="relative group/modal">
          {/* Top gradient for back button visibility on light images */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

          <img
            src={item.image}
            alt={item.title}
            width="1200"
            height="800"
            decoding="async"
            loading="lazy"
            className="w-full h-[50vh] md:h-[70vh] object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#040d1a] via-[#040d1a]/90 to-transparent p-6 md:p-10 z-20">
            <div className="max-w-4xl mx-auto transform translate-y-4 group-hover/modal:translate-y-0 transition-transform duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className={`${getTypeColor(item.type)} font-bold px-3 py-1 rounded-full uppercase tracking-widest text-[10px]`}>
                      {item.type}
                    </Badge>
                    {item.featured && (
                      <Badge className="bg-primary/20 text-primary border border-primary/30 font-bold px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-syne text-white mb-3 leading-tight drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-dmsans text-lg max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 text-sm font-bold uppercase tracking-widest text-white/50 font-dmsans shrink-0 bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{item.date}</span>
                  </div>
                  <div className="hidden md:block w-px h-4 bg-white/20 md:hidden" />
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
