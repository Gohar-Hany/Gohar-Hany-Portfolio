export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  featured?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/lovable-uploads/e88bc3e9-3abd-4ec6-8ae1-5c61463c0636.png",
    title: "iCode Family Opening Ceremony",
    description: "Opening ceremony with the amazing iCode Family community - a gathering of passionate developers and tech enthusiasts",
    date: "2024",
    location: "Egypt",
    type: "Conference",
    featured: true
  },
  {
    id: 2,
    image: "/lovable-uploads/0a062bf9-bdf0-4263-873d-7284cbff1ef5.png",
    title: "Outdoor Tech Talk",
    description: "Giving an engaging presentation in a vibrant outdoor setting with colorful murals",
    date: "2024",
    location: "Egypt",
    type: "Presentation",
    featured: true
  },
  {
    id: 3,
    image: "/lovable-uploads/806041f3-905f-4dd4-aca1-729275381f1f.png",
    title: "ALEX x Jobzella Event",
    description: "Collaborative event with the organizing team and media crew for ALEX x Jobzella initiative",
    date: "2024",
    location: "Alexandria, Egypt",
    type: "Networking"
  },
  {
    id: 4,
    image: "/lovable-uploads/873bde1b-5d06-40b1-99bf-79c514549bcc.png",
    title: "Tech Meetup",
    description: "Networking and connecting with fellow developers and tech enthusiasts",
    date: "2024",
    location: "Egypt",
    type: "Networking"
  },
  {
    id: 5,
    image: "/lovable-uploads/687ba37d-8898-43a5-b915-63b8d72eb718.png",
    title: "Industry Conference",
    description: "Professional networking at a tech industry conference with international attendees",
    date: "2024",
    location: "Egypt",
    type: "Conference"
  },
  {
    id: 6,
    image: "/lovable-uploads/44ee5a5f-7910-4113-b64f-4e0251b6ecd1.png",
    title: "Tech Conference Collaboration",
    description: "Connecting with fellow speakers and industry professionals at a major tech conference",
    date: "2024",
    location: "Egypt",
    type: "Conference"
  },
  {
    id: 7,
    image: "/lovable-uploads/45dcf2bc-4e97-4c9c-a7e8-58cee24e1568.png",
    title: "Professional Tech Conference",
    description: "Engaging with industry leaders and fellow professionals at a technology conference",
    date: "2024",
    location: "Egypt",
    type: "Conference"
  },
  {
    id: 8,
    image: "/lovable-uploads/45373d5d-00ea-476e-9fd1-51dc766953b4.png",
    title: "Innovation Hub Meetup",
    description: "Connecting with entrepreneurs and innovators at a creative workspace",
    date: "2024",
    location: "Egypt",
    type: "Networking",
    featured: true
  },
  {
    id: 9,
    image: "/lovable-uploads/b9fa329d-532b-4a16-b07c-588793af51d7.png",
    title: "Tech Summit Networking",
    description: "Professional networking and collaboration at a major technology summit",
    date: "2024",
    location: "Egypt",
    type: "Conference"
  },
  {
    id: 10,
    image: "/lovable-uploads/08c57c5a-43df-4e55-b898-7bfa67041526.png",
    title: "Industry Leaders Forum",
    description: "Meeting with influential figures and thought leaders in the tech industry",
    date: "2024",
    location: "Egypt",
    type: "Networking"
  },
  {
    id: 11,
    image: "/lovable-uploads/b1dae7f8-872d-418d-8b4e-a5115b4f135b.png",
    title: "International Tech Conference",
    description: "Participating in a large-scale international technology conference with global attendees",
    date: "2024",
    location: "Egypt",
    type: "Conference"
  },
  {
    id: 12,
    image: "/lovable-uploads/902311c9-ede3-4a01-9168-dfbe2c9e108b.png",
    title: "Professional Development Summit",
    description: "Engaging in professional development and knowledge sharing at a tech summit",
    date: "2024",
    location: "Egypt",
    type: "Conference"
  },
  {
    id: 13,
    image: "/lovable-uploads/19ec5664-8ffd-4c68-a022-c435033e81d6.png",
    title: "Community Tech Gathering",
    description: "Celebrating with the local tech community and fellow developers in a vibrant group setting",
    date: "2024",
    location: "Egypt",
    type: "Networking"
  },
  {
    id: 14,
    image: "/lovable-uploads/ada2116c-40de-4b82-94e8-095128f8c10e.png",
    title: "Team Building Workshop",
    description: "Collaborative team building and knowledge sharing session with tech professionals",
    date: "2024",
    location: "Egypt",
    type: "Workshop"
  },
  {
    id: 15,
    image: "/lovable-uploads/2d6aa27c-0085-47a0-b6a1-bc1ae01c229b.png",
    title: "Large Scale Tech Convention",
    description: "Participating in a major technology convention with hundreds of attendees and industry professionals",
    date: "2024",
    location: "Egypt",
    type: "Conference",
    featured: true
  },
  {
    id: 16,
    image: "/lovable-uploads/5c2895e4-7a79-4776-869c-3dfd07561bb0.png",
    title: "Cybersecurity Workshop",
    description: "Deep dive into cybersecurity concepts and ethical hacking practices with hands-on demonstrations",
    date: "2024",
    location: "Egypt",
    type: "Workshop",
    featured: true
  }
];

export const getTypeColor = (type: string) => {
  const colors = {
    'Conference': 'bg-primary/20 text-primary border-primary/30',
    'Panel': 'bg-accent/20 text-accent border-accent/30',
    'Networking': 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    'Awards': 'bg-gradient-to-r from-electric-blue to-neon-green text-primary-foreground border-primary/30',
    'Presentation': 'bg-muted/20 text-muted-foreground border-muted/30',
    'Workshop': 'bg-primary/10 text-primary border-primary/20'
  };
  return colors[type as keyof typeof colors] || 'bg-muted/20 text-muted-foreground border-muted/30';
};