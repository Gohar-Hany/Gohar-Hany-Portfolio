import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
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
          className={`group cursor-pointer transition-all duration-500 hover:scale-105 glass border-border/50 overflow-hidden ${item.featured ? 'ring-2 ring-primary/30 glow-red' : ''
            }`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="relative overflow-hidden">
            {item.featured && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-gradient-to-r from-electric-blue to-neon-green text-primary-foreground border-0 font-semibold text-xs">
                  Featured
                </Badge>
              </div>
            )}

            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <CardContent className="p-4">
            <div className="mb-2">
              <Badge className={`text-xs font-medium ${getTypeColor(item.type)}`}>
                {item.type}
              </Badge>
            </div>

            <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {item.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full p-0 bg-background-card border-border/50">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[70vh] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              <Badge className={`${getTypeColor(item.type)} ml-4`}>
                {item.type}
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};