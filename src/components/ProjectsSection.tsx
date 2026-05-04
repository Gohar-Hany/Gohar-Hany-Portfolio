import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Utensils, Headphones, Users, BarChart3, Search, MapPin, Palette, Clock, Zap, Shield, Database, Code, ArrowRight, ExternalLink, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState('overview');

    const projects = [
        {
            id: 1,
            title: 'Lead Generation & AI Research Pipeline',
            subtitle: 'Automated Lead Enrichment, Name Normalization, and Cold Email Drafting',
            category: 'Sales Automation',
            icon: Search,
            gradient: 'from-sky-500/20 to-blue-500/20',
            iconColor: 'text-sky-400',
            borderGlow: 'group-hover:border-sky-500/30',
            technologies: ['n8n', 'GPT-4o-mini', 'Groq 120B', 'Serper API', 'OpenRouter', 'Google Drive', 'Google Sheets'],
            status: 'Production',
            overview: 'Raw lead spreadsheets required heavy manual enrichment and inconsistent follow-up. I built an AI pipeline that watches Drive, validates rows, researches each company, normalizes contact names, drafts cold emails, and writes results back to a structured sheet.',
            goal: 'Turn raw lead lists into ready-to-contact rows with consistent research, clean contact data, and personalized outreach drafts.',
            architecture: [
                'Google Drive trigger pulls new Excel files and extracts rows',
                'Validation filter removes records missing email or website',
                'Batch processor runs a research agent with 5-8 web searches per lead',
                'Name normalization LLM enforces strict JSON and filters generic inboxes',
                'Cold email generator with structured output parser and safe formatting',
                'Google Sheets append with mapped columns and error logging'
            ],
            features: [
                { title: 'AI Lead Research', description: 'Multi-search enrichment for ads, tools, marketing ownership, and the top opportunity', iconName: 'Search' },
                { title: 'Contact Cleanup', description: 'Name normalization with invalid and generic inbox filtering to avoid poor personalization', iconName: 'Users' },
                { title: 'Email Drafting', description: 'Company-centric openers built from research with strict JSON output parsing', iconName: 'Code' },
                { title: 'Sheet-Ready Output', description: 'Structured fields and drafts appended to Google Sheets for handoff and tracking', iconName: 'Database' }
            ],
            metrics: [
                { label: 'Searches', value: '5-8x' },
                { label: 'Retries', value: '2x' },
                { label: 'Output', value: '1 row' }
            ],
            technicalDetails: [
                'Serper API web search tool with dynamic query injection',
                'Research output schema: ads_running, manual_work, who_handles_marketing, main_opportunity, notes, report',
                'Name normalization prompt removes generic inboxes and invalid strings',
                'Cold email generator outputs strict JSON and plain text body',
                'Google Sheets mapping consolidates contact data, research fields, and draft email'
            ],
            workflow: [
                'New Excel file detected in Google Drive',
                'Rows parsed and filtered for valid email and website',
                'Lead fields mapped and batched for processing',
                'Research agent performs web searches and creates a detailed report',
                'Contact name normalized and validated',
                'Cold email draft generated from research summary',
                'Enriched lead data appended to Google Sheets'
            ]
        },
        {
            id: 2,
            title: 'ProSkills WhatsApp Sales Agent',
            subtitle: 'Multimodal support, CRM sync, and payment verification for digital services',
            category: 'Commerce Automation',
            icon: Users,
            gradient: 'from-rose-500/20 to-orange-500/20',
            iconColor: 'text-rose-400',
            borderGlow: 'group-hover:border-rose-500/30',
            technologies: ['n8n', 'Evolution API', 'GPT-4o-mini', 'GPT-OSS-120B', 'Gemini 2.5 Flash', 'ElevenLabs', 'Groq Whisper', 'Google Sheets', 'Telegram'],
            status: 'Production',
            overview: 'Pro Skills needed WhatsApp automation that could handle text, voice, and images while protecting sales flows. I built a guarded agent pipeline that syncs CRM records, routes product questions through a live products KB, and verifies payments with human approval.',
            goal: 'Provide fast WhatsApp support and sales automation with safe, auditable payment verification.',
            architecture: [
                'Webhook intake for WhatsApp messages via Evolution API',
                'Input router for text, voice, and image with STT and vision analysis',
                'Security gateway with keyword, regex, and jailbreak scoring',
                'CRM lookup and updates in Google Sheets',
                'Orchestrator agent with memory, think tool, and Products KB',
                'Payment flow with receipt request, Telegram approval, and link unlock'
            ],
            features: [
                { title: 'Multimodal Inputs', description: 'Text, voice, and image handling with transcription and image understanding', iconName: 'Headphones' },
                { title: 'Security Guardrails', description: 'Keyword and regex screening plus AI jailbreak scoring with alerting', iconName: 'Shield' },
                { title: 'CRM Sync', description: 'Create, update, and enrich customer records with every interaction', iconName: 'Database' },
                { title: 'Payment Verification', description: 'Human-in-the-loop approval with receipt analysis and secure activation links', iconName: 'Code' }
            ],
            metrics: [
                { label: 'Inputs', value: '3 modes' },
                { label: 'Guardrails', value: '3-layer' },
                { label: 'Approval', value: 'Human-in-loop' }
            ],
            technicalDetails: [
                'Guardrails: keyword blocklist, regex patterns, and GPT-OSS jailbreak scoring',
                'Structured output schema with status and product_id fields',
                'Products KB tool backed by Google Sheets',
                'Receipt verification via Telegram approval and Apps Script link unlock',
                'Gemini vision for images and ElevenLabs/Groq Whisper for voice'
            ],
            workflow: [
                'WhatsApp message received through webhook',
                'Input type detected and normalized (text, voice, image)',
                'Guardrails validate content and alert security if needed',
                'Customer record retrieved or created in CRM sheet',
                'Orchestrator responds and routes product requests',
                'If payment: request receipt and send for approval',
                'Approved payments unlock link, record sale, and confirm'
            ]
        },
        {
            id: 3,
            title: 'AI Customer Service System',
            subtitle: 'Enterprise Agentic Support with 3-Tier Security & MCP Protocol',
            category: 'Enterprise AI',
            icon: Shield,
            gradient: 'from-purple-500/20 to-pink-500/20',
            iconColor: 'text-purple-400',
            borderGlow: 'group-hover:border-purple-500/30',
            technologies: ['n8n', 'Claude 3.5 Haiku', 'Gemini 2.0 Flash', 'MCP Protocol', 'Telegram API'],
            status: 'Production',
            overview: 'Support automation required enterprise-grade safety and reliability. I designed a master-agent architecture with layered prompt-injection defense, multimodal processing, and MCP-enabled execution for real support operations.',
            goal: 'Deliver secure, scalable customer support automation that routes requests intelligently and executes tasks through controlled AI tooling.',
            architecture: [
                '3-Tier Security Gateway: Keyword blocklist → Regex patterns → AI jailbreak detection',
                'Master Orchestrator Agent with Claude 3.5 Haiku for intent routing',
                'Specialized Sub-Agents for different domains (support, billing, technical)',
                'MCP Protocol integration for Email and Calendar operations',
                'Multimodal processing: Text, Voice (Whisper), Image (Gemini Vision)'
            ],
            features: [
                { title: '3-Tier Security', description: '100+ keyword blocklist, regex patterns (Base64, SQL injection, shell commands), AI jailbreak detection with 0.7 threshold', iconName: 'Shield' },
                { title: 'MCP Protocol', description: 'Model Context Protocol integration enabling Email composition/sending and Calendar event creation/management', iconName: 'Code' },
                { title: 'Multimodal Input', description: 'Text processing, Whisper voice transcription, and Gemini Vision image analysis for comprehensive input handling', iconName: 'Zap' },
                { title: 'Think Tool', description: 'Internal reasoning capability allowing the agent to analyze queries before responding, improving accuracy', iconName: 'Brain' }
            ],
            metrics: [
                { label: 'Security Check', value: '<500ms' },
                { label: 'AI Response', value: '2-5s' },
                { label: 'Total Flow', value: '5-10s' }
            ],
            technicalDetails: [
                'Security Layer 1: 100+ forbidden keywords with exact match detection',
                'Security Layer 2: Custom regex for Base64, SQL injection, shell commands',
                'Security Layer 3: Gemini 2.0 Flash with jailbreak detection probability scoring',
                'MCP Tools: SendEmail, GetCalendar, CreateEvent with structured schemas'
            ],
            workflow: [
                'User message received via Telegram',
                'Security gateway performs 3-tier validation',
                'Multimodal processing (voice/image if applicable)',
                'Master Agent analyzes intent and routes to Sub-Agent',
                'Sub-Agent processes with domain-specific knowledge',
                'MCP tools executed if external operations needed',
                'Response formatted and sent back to user'
            ]
        },
        {
            id: 4,
            title: 'Restaurant Order & Stock Management System',
            subtitle: 'Full-Stack AI Backend with Conversational Ordering & Real-Time Operations',
            category: 'AI Automation',
            icon: Utensils,
            gradient: 'from-blue-500/20 to-cyan-500/20',
            iconColor: 'text-blue-400',
            borderGlow: 'group-hover:border-blue-500/30',
            technologies: ['n8n', 'GPT-4o-mini', 'Pusher', 'Google Sheets', 'Supabase Vector Store'],
            status: 'Production',
            overview: 'Restaurant operations were fragmented across order intake, stock control, and reporting. I built a unified AI backend with conversational ordering, real-time event broadcasting, and operational analytics to streamline execution.',
            goal: 'Centralize restaurant workflows in one AI automation system that improves order speed, stock visibility, and management decision-making.',
            architecture: [
                'AI Order Agent (Bahri Plaza) with GPT-4o-mini for conversational ordering',
                'Real-time event broadcasting via Pusher WebSocket (3 dedicated nodes)',
                'Bilingual menu CRUD with duplicate prevention and validation',
                'Business Analytics Engine calculating COGS, profit margins, and trends',
                'Document RAG pipeline with PDF extraction and Supabase Vector Store'
            ],
            features: [
                { title: 'AI Order Agent', description: 'Conversational ordering in English/Arabic with delivery vs dine-in routing, upselling prompts, and natural language understanding', iconName: 'Headphones' },
                { title: 'Real-Time Events', description: 'Pusher WebSocket integration broadcasting order updates to kitchen, delivery, and management dashboards with <100ms latency', iconName: 'Zap' },
                { title: 'Business Analytics', description: 'Automated COGS calculation, profit margin analysis, top-selling item detection, and inventory optimization recommendations', iconName: 'BarChart3' },
                { title: 'Document RAG', description: 'PDF menu extraction, chunking, embedding generation, and Supabase Vector Store integration for knowledge retrieval', iconName: 'Database' }
            ],
            metrics: [
                { label: 'Latency', value: '<100ms' },
                { label: 'Response', value: '2-5s' },
                { label: 'Uptime', value: '99.9%' }
            ],
            technicalDetails: [
                'System Prompt: Bahri Plaza AI agent with Arabic/English support, menu knowledge, order routing logic',
                'Memory: Window buffer (last 20 messages) for conversation context',
                'Validation: Item availability check, price calculation, delivery zone verification',
                'Integration: Google Sheets for menu data, Supabase for vector embeddings, Pusher for real-time'
            ],
            workflow: [
                'Customer initiates order via webhook',
                'AI Agent processes natural language request',
                'Menu RAG retrieves relevant items from vector store',
                'Agent confirms order details and upsells',
                'Order validated and stored in Google Sheets',
                'Pusher broadcasts to kitchen/delivery dashboards',
                'Analytics engine updates business metrics'
            ]
        },
        {
            id: 5,
            title: 'HR Recruitment Pipeline',
            subtitle: 'AI-Powered Candidate Scoring with Dual-Track Analysis',
            category: 'HR Automation',
            icon: Users,
            gradient: 'from-emerald-500/20 to-teal-500/20',
            iconColor: 'text-emerald-400',
            borderGlow: 'group-hover:border-emerald-500/30',
            technologies: ['n8n', 'Claude 3 Haiku', 'Google Drive', 'Telegram', 'WhatsApp'],
            status: 'Production',
            overview: 'Manual screening was slow and inconsistent. I built a dual-track AI recruitment pipeline that evaluates CVs and LinkedIn profiles, prevents duplicates, and automates reporting and notifications.',
            goal: 'Reduce time-to-screen while improving candidate evaluation consistency and recruitment workflow reliability.',
            architecture: [
                'Form trigger receiving candidate submissions with CV and LinkedIn URL',
                'Dual-track AI Analysis: CV Optimization + LinkedIn Profile Audit',
                'Structured JSON output with scoring across multiple dimensions',
                'Google Drive archiving with organized folder structure per candidate',
                'Multi-channel notifications via Telegram and WhatsApp'
            ],
            features: [
                { title: 'CV Optimization', description: 'ATS keyword match scoring, experience relevance analysis, impact metrics evaluation, skills gap identification', iconName: 'Database' },
                { title: 'LinkedIn Audit', description: 'Searchability score, personal branding score, SEO keyword analysis, 3 headline rewrite suggestions', iconName: 'Search' },
                { title: 'Duplicate Detection', description: 'Email-based CRM lookup preventing repeat applications, with existing candidate flagging', iconName: 'Shield' },
                { title: 'Auto-Archiving', description: 'Google Drive folder creation per candidate, CV storage with metadata, structured logging', iconName: 'Database' }
            ],
            metrics: [
                { label: 'Parse Time', value: '<1s' },
                { label: 'Analysis', value: '5-10s' },
                { label: 'Pipeline', value: '15-20s' }
            ],
            technicalDetails: [
                'CV Analysis: Structured evaluation of ATS compatibility, experience relevance, achievements',
                'LinkedIn: Profile completeness, headline optimization, keyword density analysis',
                'Output schema: JSON with scores object, feedback array, classification enum',
                'Classification: Needs Improvement, Strong Candidate, Top Tier'
            ],
            workflow: [
                'Candidate submits form with CV and LinkedIn URL',
                'Duplicate check against CRM by email',
                'CV extracted and sent to Claude 3 Haiku',
                'LinkedIn profile scraped and analyzed',
                'Results merged into structured report',
                'CV archived to Google Drive with metadata',
                'Notifications sent via Telegram and WhatsApp'
            ]
        },
        {
            id: 6,
            title: 'Content Strategy Engine',
            subtitle: '30-Day Content Calendar Generator with AI Art Direction',
            category: 'Marketing AI',
            icon: Palette,
            gradient: 'from-amber-500/20 to-orange-500/20',
            iconColor: 'text-amber-400',
            borderGlow: 'group-hover:border-amber-500/30',
            technologies: ['n8n', 'Google Gemini', 'Google Sheets'],
            status: 'Production',
            overview: 'Content planning and creative direction were difficult to scale across platforms. I built an AI strategy engine that generates structured 30-day calendars, platform-aware copy, and production-ready creative direction.',
            goal: 'Enable faster campaign planning and consistent multi-platform content execution with AI-assisted strategy and copy generation.',
            architecture: [
                'AI Agent Role: Universal Senior Content Strategist & Master Art Director',
                'AIDA Framework: Attention → Interest → Desire → Action copywriting',
                '30-day content matrix with daily entries across multiple platforms',
                'Ultra-precise art direction prompts for AI image generation',
                'Multi-platform targeting: LinkedIn, Instagram, X, TikTok'
            ],
            features: [
                { title: '30-Day Calendar', description: 'Complete content matrix with daily entries including platform, format, hook, caption, and visual specs', iconName: 'BarChart3' },
                { title: 'AIDA Copywriting', description: 'Attention-grabbing hooks, Interest-building content, Desire-creating benefits, Action-driving CTAs', iconName: 'Code' },
                { title: 'Art Direction', description: 'Ultra-precise visual specifications including color palettes, composition rules, typography, mood', iconName: 'Palette' },
                { title: 'Multi-Platform', description: 'Strategic theme alignment ensuring content supports brand positioning across platforms', iconName: 'Database' }
            ],
            metrics: [
                { label: 'Generation', value: '20-40s' },
                { label: 'Output', value: '30 posts' },
                { label: 'Platforms', value: '4+' }
            ],
            technicalDetails: [
                'System Prompt: 15+ years experience content strategist with platform-specific expertise',
                'Output: Platform target, content format, scroll-stopping hook, full caption, visual overlay',
                'Art direction: Color psychology, composition type, typography style, mood descriptors',
                'JSON schema enforced for consistent parsing and Google Sheets integration'
            ],
            workflow: [
                'Brand brief and goals submitted via form',
                'AI analyzes brand voice and target audience',
                'Content pillars and themes generated',
                '30-day calendar created with daily entries',
                'Art direction prompts generated per post',
                'AIDA copy written for each platform',
                'Results exported to Google Sheets'
            ]
        }
    ];

    const getIconComponent = (iconName: string) => {
        const icons: Record<string, any> = { Headphones, Zap, BarChart3, Database, Shield, Code, Search, MapPin, Clock, Palette, Utensils, Users, Activity };
        return icons[iconName] || Zap;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeProject();
        };
        window.addEventListener('keydown', handleEsc);

        // Cleanup and re-enable scroll if component unmounts while modal is open
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, []);

    const openProject = (id: number) => {
        setSelectedProject(id);
        setActiveTab('overview');
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const currentProject = projects.find(p => p.id === selectedProject);

    return (
        <section ref={sectionRef} id="projects" className="py-24 lg:py-32 relative bg-background overflow-hidden selection:bg-primary/30">

            {/* Background ambient lighting */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-60 pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] opacity-60 pointer-events-none mix-blend-screen" />

            <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 bg-primary"></div>
                            <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Portfolio</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Work</span>
                        </h2>
                    </div>
                    <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
                        Enterprise-grade AI automation systems driving real-world impact.
                    </p>
                </div>

                {/* Bento Grid Layout for Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((project, index) => {
                        const IconComponent = project.icon;
                        const delay = index * 150;

                        return (
                            <div
                                key={project.id}
                                className={`group cursor-pointer relative rounded-[2.5rem] p-10 pb-16 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl overflow-hidden transition-all duration-700 ease-out
                                hover:-translate-y-2 hover:bg-white/[0.03] ${project.borderGlow} hover:shadow-2xl hover:shadow-black/50
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                                `}
                                style={{ transitionDelay: `${200 + delay}ms` }}
                                onClick={() => openProject(project.id)}
                            >
                                {/* Active / Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] -z-10`} />

                                {/* Category & Status Tags */}
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="text-[11px] font-bold text-white uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        {project.status}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 justify-between relative z-10">
                                    <div className="mb-12">
                                        <div className="flex items-start gap-5 mb-5">
                                            <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg`}>
                                                <IconComponent className={`w-8 h-8 ${project.iconColor}`} />
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold font-syne text-white leading-tight mt-1 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className="text-[16px] text-white/50 font-dmsans leading-relaxed max-w-lg">
                                            {project.subtitle}
                                        </p>
                                    </div>

                                    <div className="flex flex-col mt-auto">
                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2.5 mb-10">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <span key={tech} className="px-4 py-1.5 rounded-xl text-[12px] font-semibold text-white/70 bg-white/[0.04] border border-white/[0.06] backdrop-blur-md">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white/40 bg-white/[0.02] border border-white/[0.03]">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* View Details Action / Metrics Footer */}
                                        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-10 mt-2">
                                            <div className="flex items-center gap-8 sm:gap-12">
                                                {project.metrics.map((m, i) => (
                                                    <div key={i} className="flex flex-col group/metric">
                                                        <span className={`text-[18px] xl:text-[22px] font-bold font-syne ${project.iconColor} group-hover/metric:text-white transition-colors leading-none mb-2.5`}>
                                                            {m.value}
                                                        </span>
                                                        <span className="text-[10px] text-white/30 font-dmsans font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                                                            {m.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.05] group-hover:bg-primary group-hover:border-primary transition-all duration-500 flex-shrink-0 shadow-2xl group-hover:shadow-primary/20`}>
                                                <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className={`mt-16 sm:mt-20 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="relative rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.05] p-10 md:p-16 text-center group flex flex-col items-center justify-center backdrop-blur-xl hover:bg-white/[0.03] transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        <Activity className="w-12 h-12 text-primary/50 mb-6 group-hover:scale-110 group-hover:text-primary transition-all duration-500" />
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-syne text-white mb-6">Ready to Automate?</h3>
                        <p className="text-white/60 font-dmsans mb-10 max-w-2xl text-lg lg:text-xl leading-relaxed">
                            I architect and deploy production AI systems from agent workflows to LLM-powered automation pipelines. Let's build a solution with clear technical and business impact.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-black hover:bg-neutral-200 font-syne font-bold px-10 py-7 rounded-full text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                        >
                            Start a Project
                        </Button>
                    </div>
                </div>

            </div>

            {/* Modern Glassmorphic Project Modal */}
            {currentProject && createPortal(
                (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={closeProject}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-modal-title"
                    >
                        <div
                            className="relative w-full max-w-6xl max-h-[90vh] lg:max-h-[85vh] flex flex-col lg:flex-row bg-[#0A0A0B] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <button
                                onClick={closeProject}
                                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors text-white/70 hover:text-white"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Sidebar / Header Details */}
                            <div className="w-full lg:w-[400px] flex-shrink-0 bg-white/[0.02] border-r border-white/5 p-8 flex flex-col relative overflow-y-auto custom-scroll">
                                <div className={`absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b ${currentProject.gradient} opacity-20 pointer-events-none`} />

                                <div className="relative z-10 flex-1 flex flex-col">
                                    {/* Icon & Badges */}
                                    <div className="flex flex-col gap-6 mb-8">
                                        <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-lg`}>
                                            <currentProject.icon size={32} className={currentProject.iconColor} />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                                                {currentProject.category}
                                            </span>
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                {currentProject.status}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-bold font-syne text-white leading-[1.15] mb-4">
                                        {currentProject.title}
                                    </h2>
                                    <p className="text-base text-white/50 font-dmsans leading-relaxed mb-8">
                                        {currentProject.subtitle}
                                    </p>

                                    <div className="space-y-6 mb-10">
                                        <div>
                                            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Key Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {currentProject.technologies.map((tech) => (
                                                    <span key={tech} className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-white/70 bg-white/[0.04] border border-white/[0.05]">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Area */}
                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <Button className="w-full bg-white text-black hover:bg-neutral-200 font-syne font-bold py-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                            <ExternalLink size={18} /> View Live Project
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 flex flex-col min-h-0 bg-transparent">

                                {/* Tabs Navigation */}
                                <div className="flex overflow-x-auto gap-1 px-8 pt-8 pb-4 border-b border-white/5 no-scrollbar">
                                    {[
                                        { id: 'overview', label: 'Overview' },
                                        { id: 'architecture', label: 'Architecture' },
                                        { id: 'features', label: 'Features & Workflow' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-syne font-medium transition-all whitespace-nowrap
                        ${activeTab === tab.id
                                                    ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20'
                                                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="flex-1 overflow-y-auto px-8 py-8 custom-scroll">
                                    <div className="max-w-3xl animate-in slide-in-from-right-4 duration-300">

                                        {/* OVERVIEW TAB */}
                                        {activeTab === 'overview' && (
                                            <div className="space-y-10">
                                                <section>
                                                    <h3 className="text-xl font-syne font-bold text-white mb-4">Project Overview</h3>
                                                    <p className="text-[16px] text-white/60 font-dmsans leading-[1.8]">{currentProject.overview}</p>
                                                </section>

                                                <section>
                                                    <h3 className="text-xl font-syne font-bold text-white mb-4">Core Objective</h3>
                                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                                        <p className="text-[16px] text-white/70 font-dmsans leading-[1.8]">{currentProject.goal}</p>
                                                    </div>
                                                </section>

                                                <section>
                                                    <h3 className="text-xl font-syne font-bold text-white mb-6">Performance Metrics</h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {currentProject.metrics.map((m, idx) => (
                                                            <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-center">
                                                                <span className={`text-2xl font-bold font-syne mb-1 ${currentProject.iconColor}`}>{m.value}</span>
                                                                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{m.label}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>
                                        )}

                                        {/* ARCHITECTURE TAB */}
                                        {activeTab === 'architecture' && (
                                            <div className="space-y-10">
                                                <section>
                                                    <h3 className="text-xl font-syne font-bold text-white mb-6">System Architecture</h3>
                                                    <div className="space-y-4">
                                                        {currentProject.architecture.map((item, i) => (
                                                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white/[0.05] border border-white/10 ${currentProject.iconColor}`}>
                                                                    <Zap size={12} />
                                                                </div>
                                                                <span className="text-[15px] font-dmsans text-white/70 leading-relaxed mt-0.5">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>

                                                <section className="pt-4">
                                                    <h3 className="text-xl font-syne font-bold text-white mb-6">Technical Deep Dive</h3>
                                                    <div className="space-y-4">
                                                        {currentProject.technicalDetails.map((detail, idx) => (
                                                            <div key={idx} className="p-4 rounded-xl bg-[#050505] border border-white/10 font-mono text-sm text-green-400 leading-relaxed overflow-x-auto">
                                                                <span className="text-white/20 mr-4">{(idx + 1).toString().padStart(2, '0')}</span>
                                                                {detail}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>
                                        )}

                                        {/* FEATURES & WORKFLOW TAB */}
                                        {activeTab === 'features' && (
                                            <div className="space-y-12">
                                                <section>
                                                    <h3 className="text-xl font-syne font-bold text-white mb-6">Execution Workflow</h3>
                                                    <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8">
                                                        {currentProject.workflow.map((step, idx) => (
                                                            <div key={idx} className="relative">
                                                                {/* Timeline Dot */}
                                                                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full border-[3px] border-[#0A0A0B] bg-white ring-1 ring-white/20`} />
                                                                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                                                                    <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-2">Step {idx + 1}</div>
                                                                    <p className="text-[15px] text-white/70 font-dmsans leading-relaxed">{step}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>

                                                <section>
                                                    <h3 className="text-xl font-syne font-bold text-white mb-6">Key Features</h3>
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {currentProject.features.map((feature, idx) => {
                                                            const FeatureIcon = getIconComponent(feature.iconName);
                                                            return (
                                                                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors group/feature">
                                                                    <div className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 group-hover/feature:scale-110 transition-transform duration-300`}>
                                                                        <FeatureIcon size={18} className={currentProject.iconColor} />
                                                                    </div>
                                                                    <h4 className="text-[16px] font-syne font-bold text-white mb-2">{feature.title}</h4>
                                                                    <p className="text-[14px] text-white/50 font-dmsans leading-relaxed">{feature.description}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </section>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ),
                document.body
            )}
        </section>
    );
};

export default ProjectsSection;
