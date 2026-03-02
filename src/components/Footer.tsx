import { Code2, Heart, ExternalLink, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/goharhany' },
        { name: 'GitHub', href: 'https://github.com/Gohar-Hany' },
        { name: 'Twitter', href: 'https://twitter.com/goharhany' },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-background border-t border-white/[0.05] overflow-hidden pt-16 pb-8 selection:bg-primary/30">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-primary/5 to-transparent blur-[100px] opacity-40 pointer-events-none" />

            <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Info */}
                    <div className="md:col-span-5 lg:col-span-4 space-y-6">
                        <button
                            onClick={scrollToTop}
                            className="group flex flex-col items-start text-left focus:outline-none"
                        >
                            <h3 className="text-3xl font-bold font-syne text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-500">
                                Gohar<span className="text-primary">.</span>
                            </h3>
                            <p className="text-sm font-dmsans text-white/50 mt-2 max-w-xs group-hover:text-white/70 transition-colors duration-300">
                                Crafting digital experiences focused on performance, aesthetics, and agentic AI integrations.
                            </p>
                        </button>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-full w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">Available for Opportunities</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-3 lg:col-span-4 flex flex-col md:items-center">
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold font-syne text-white uppercase tracking-widest">Navigation</h4>
                            <ul className="space-y-3">
                                {footerLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-white/60 hover:text-primary font-dmsans text-[15px] transition-colors duration-300 flex items-center gap-2 group w-fit"
                                        >
                                            <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Socials & Connect */}
                    <div className="md:col-span-4 flex flex-col md:items-end text-left md:text-right">
                        <div className="space-y-6 max-w-xs">
                            <h4 className="text-sm font-bold font-syne text-white uppercase tracking-widest">Connect</h4>
                            <ul className="space-y-3">
                                {socialLinks.map((link) => (
                                    <li key={link.name} className="flex md:justify-end">
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/60 hover:text-accent font-dmsans text-[15px] transition-colors duration-300 flex items-center gap-1 group w-fit"
                                        >
                                            {link.name}
                                            <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 mt-4 border-t border-white/[0.05]">
                                <a
                                    href="mailto:goharhany9@gmail.com"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/10 hover:border-primary/50 hover:bg-primary/10 rounded-xl text-white font-medium font-dmsans transition-all duration-300 group"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform duration-300">Start a Dialogue</span>
                                    <ExternalLink size={16} className="text-primary opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 absolute right-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar Bento */}
                <div className="relative p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 group">

                    <div className="flex items-center gap-2 text-white/50 text-[13px] font-dmsans text-center md:text-left">
                        <span>© {currentYear} Gohar Hany. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/40 text-[13px] font-dmsans">
                        <span>Built with</span>
                        <Code2 size={14} className="text-white/20 group-hover:text-primary transition-colors duration-500" />
                        <span>and</span>
                        <Heart size={14} className="text-white/20 group-hover:text-red-500 transition-colors duration-500 fill-transparent group-hover:fill-red-500" />
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
