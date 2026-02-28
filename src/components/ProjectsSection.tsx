import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Utensils, Headphones, Users, BarChart3, Search, MapPin, Palette, Clock, Zap, Shield, Database, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const projects = [
    {
      id: 1,
      title: 'Restaurant Order & Stock Management System',
      subtitle: 'Full-Stack AI Backend with Conversational Ordering & Real-Time Operations',
      category: 'AI Automation',
      icon: Utensils,
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-primary/10',
      technologies: ['n8n', 'GPT-4o-mini', 'Pusher', 'Google Sheets', 'Supabase Vector Store'],
      status: 'Production',
      overview: 'A comprehensive 3-workflow restaurant management system that combines AI-powered conversational ordering, real-time WebSocket updates, stock management intelligence, and business analytics into a unified backend platform.',
      goal: 'Build a full-stack restaurant backend with conversational AI ordering, real-time WebSocket updates, stock management, and business analytics.',
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
        { label: 'Order Processing', value: '<500ms' },
        { label: 'AI Conversation', value: '2-5s' },
        { label: 'Pusher Broadcast', value: '<100ms' },
        { label: 'Analytics Report', value: '1-2s' }
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
      id: 2,
      title: 'AI Customer Service System',
      subtitle: 'Enterprise Agentic Support with 3-Tier Security & MCP Protocol',
      category: 'Enterprise AI',
      icon: Headphones,
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-accent/10',
      technologies: ['n8n', 'Claude 3.5 Haiku', 'Gemini 2.0 Flash', 'MCP Protocol', 'Telegram API'],
      status: 'Production',
      overview: 'An enterprise-grade customer service system featuring a Master-Agent orchestrating specialized Sub-Agents, with comprehensive security guardrails, multimodal input processing, and MCP protocol integration.',
      goal: 'Build enterprise agentic customer service with prompt injection defense, MCP protocol integration, multimodal input processing, and sub-agent orchestration.',
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
        { title: 'Think Tool', description: 'Internal reasoning capability allowing the agent to analyze queries before responding, improving accuracy', iconName: 'Database' }
      ],
      metrics: [
        { label: 'Security Check', value: '<500ms' },
        { label: 'AI Response', value: '2-5s' },
        { label: 'Image Analysis', value: '3-5s' },
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
      id: 3,
      title: 'HR Recruitment & CV Analysis Pipeline',
      subtitle: 'AI-Powered Candidate Scoring with Dual-Track Analysis',
      category: 'HR Automation',
      icon: Users,
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-primary/10',
      technologies: ['n8n', 'Claude 3 Haiku', 'Google Drive', 'Telegram', 'WhatsApp'],
      status: 'Production',
      overview: 'An intelligent recruitment pipeline that performs dual-track AI analysis on both CV documents and LinkedIn profiles, with duplicate detection, automated archiving, and multi-channel notifications.',
      goal: 'Build intelligent recruitment pipeline with CV optimization, LinkedIn profile auditing, duplicate detection, and automated notifications.',
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
        { label: 'Form Processing', value: '<1s' },
        { label: 'CV Analysis', value: '5-10s' },
        { label: 'Full Pipeline', value: '15-20s' },
        { label: 'Classification', value: '3 tiers' }
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
      id: 4,
      title: 'Marketing Content Strategy Engine',
      subtitle: '30-Day Content Calendar Generator with AI Art Direction',
      category: 'Marketing AI',
      icon: BarChart3,
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-accent/10',
      technologies: ['n8n', 'Google Gemini', 'Google Sheets'],
      status: 'Production',
      overview: 'An AI-powered content strategy engine that generates complete 30-day content calendars with ultra-precise art direction prompts, AIDA copywriting, and multi-platform optimization.',
      goal: 'Build intelligent marketing with content calendar generation, art direction prompts, multi-platform targeting, and AIDA copywriting.',
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
        { label: 'AI Generation', value: '20-40s' },
        { label: 'Items per Run', value: '30 posts' },
        { label: 'Full Pipeline', value: '1-2 min' },
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
    },
    {
      id: 5,
      title: 'Competitor Intelligence Scanner',
      subtitle: 'Multi-Layer Vision Analysis with Strategic Synthesis',
      category: 'Vision AI',
      icon: Search,
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-primary/10',
      technologies: ['n8n', 'Groq Vision API (Llama 4)', 'GPT-4o-mini', 'Google Sheets'],
      status: 'Production',
      overview: 'A comprehensive competitor intelligence system that scrapes Facebook profiles, extracts visual assets, performs multi-dimensional AI analysis using Groq Vision API, and synthesizes strategic insights.',
      goal: 'Build AI-powered brand analysis with Groq Vision API and LangChain agent orchestration for competitive intelligence.',
      architecture: [
        'Facebook profile and posts scraping with parallel data collection',
        'Image extraction with deduplication and engagement metadata',
        'Groq Vision API (Llama 4 Scout) for 7-dimension visual analysis',
        'Tool-augmented agent synthesis using GPT-4o-mini',
        'Google Sheets database for analysis storage and retrieval'
      ],
      features: [
        { title: '7-Dimension Analysis', description: 'Visual elements, branding, content analysis, marketing strategy, technical quality, competitive insights, assessment', iconName: 'Search' },
        { title: 'Vision AI', description: 'Groq Vision API analyzing images for color psychology, composition, brand consistency, and design quality', iconName: 'Zap' },
        { title: 'Agent Synthesis', description: 'GPT-4o-mini agent accessing visual database for high-level strategic analysis and SWOT generation', iconName: 'Database' },
        { title: 'SWOT Output', description: 'Structured analysis with strengths, weaknesses, opportunities, threats, and recommendations', iconName: 'BarChart3' }
      ],
      metrics: [
        { label: 'Profile Scrape', value: '2-5s' },
        { label: 'Per-Image', value: '3-8s' },
        { label: 'Agent Synthesis', value: '10-20s' },
        { label: 'Complete', value: '2-5 min' }
      ],
      technicalDetails: [
        '7 dimensions: visual_elements, branding, content, marketing, technical, competitive, assessment',
        'Color psychology extraction with hex codes and emotional associations',
        'Typography analysis: fonts, hierarchy, readability scores',
        'Google Sheets schema: 22 columns storing all analysis dimensions'
      ],
      workflow: [
        'Facebook URL submitted via webhook',
        'Profile and posts scraped in parallel',
        'Images extracted with deduplication',
        'Each image analyzed via Groq Vision API',
        'Results stored in Google Sheets database',
        'Agent synthesizes all analyses',
        'SWOT report generated with recommendations'
      ]
    },
    {
      id: 6,
      title: 'Lead Generation System',
      subtitle: 'Google Maps Scraper with Exponential Backoff',
      category: 'Data Pipeline',
      icon: MapPin,
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-accent/10',
      technologies: ['n8n', 'Google Maps Places API', 'Google Sheets'],
      status: 'Production',
      overview: 'A production-grade Google Maps scraper that extracts business leads by ZIP code and category, featuring exponential backoff for rate limits and Place ID deduplication.',
      goal: 'Build automated B2B lead discovery with ZIP-based search, duplicate prevention, rate limit handling, and structured data export.',
      architecture: [
        'ZIP-based iteration with status tracking for pause/resume',
        'Google Maps Places API with optimized field mask',
        'Exponential backoff algorithm (2s to 1024s) for rate limits',
        'AppendOrUpdate operation for Place ID deduplication',
        'Status tracking: empty, scraped, error states'
      ],
      features: [
        { title: 'ZIP-Based Search', description: 'Category + location queries iterating through ZIP codes with status tracking for pause/resume', iconName: 'MapPin' },
        { title: 'Exponential Backoff', description: 'Retry delays starting at 2s, doubling each attempt up to 1024s, max 10 retries', iconName: 'Clock' },
        { title: 'Deduplication', description: 'AppendOrUpdate using Google Place ID as unique key, preventing duplicate entries', iconName: 'Shield' },
        { title: 'Data Extraction', description: 'Business name, phone, website, address, GPS, rating, review count, categories', iconName: 'Database' }
      ],
      metrics: [
        { label: 'API Call', value: '~500ms' },
        { label: 'Results/Query', value: '20 max' },
        { label: 'Rate Limit', value: '~100 QPM' },
        { label: 'Max Retries', value: '10' }
      ],
      technicalDetails: [
        'Field mask: places.id, displayName, formattedAddress, phone, rating, websiteUri, location',
        'Backoff formula: waitTime = Math.pow(2, retryCount) * 1000ms',
        'Status values: empty (not processed), scraped (success), error (failed)',
        'OAuth2 authentication for Google Maps Places API'
      ],
      workflow: [
        'Configure settings (Sheet URL, Category)',
        'Read ZIPs where status != scraped',
        'Build query: {category} {zip}',
        'Call Google Maps Places API',
        'Success: Extract data → Append → Mark scraped',
        'Error: Exponential backoff → Retry up to 10x',
        'Repeat until all ZIPs processed'
      ]
    },
    {
      id: 7,
      title: 'AI Design Brief Processor',
      subtitle: 'Prompt Engineering Pipeline with Multi-Stage Image Generation',
      category: 'Creative AI',
      icon: Palette,
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-primary/10',
      technologies: ['n8n', 'Google Gemini', 'Apify ImageFX', 'Webhook API'],
      status: 'Production',
      overview: 'A sophisticated design-to-image pipeline that processes structured design briefs through conditional routing, generates production-ready AI prompts, and produces images with comprehensive error handling.',
      goal: 'Build design brief processing with conditional routing, prompt optimization, and multi-stage image generation.',
      architecture: [
        '7-section design brief parser with UUID submission tracking',
        'Conditional routing: Logo vs Social Media vs General design paths',
        'Gemini AI prompt optimization (150-300 words, production-ready)',
        'ImageFX generation via Apify with proxy configuration',
        '6+ error categories with solutions and fallback suggestions'
      ],
      features: [
        { title: '7-Section Parser', description: 'Project overview, brand info, visual identity, logo-specific, social-specific, references, notes', iconName: 'Code' },
        { title: 'Conditional Routing', description: 'Automatic detection of design type with type-specific brief formatting and prompt templates', iconName: 'Zap' },
        { title: 'Prompt Engineering', description: 'Gemini-powered optimization generating 150-300 word prompts with design fundamentals', iconName: 'Database' },
        { title: 'Error Handling', description: 'Auth, rate limit, timeout, proxy, API token errors with specific solutions', iconName: 'Shield' }
      ],
      metrics: [
        { label: 'Brief Parsing', value: '<100ms' },
        { label: 'Prompt Gen', value: '2-5s' },
        { label: 'Image Gen', value: '30-120s' },
        { label: 'Success Rate', value: '85-90%' }
      ],
      technicalDetails: [
        'Sections: A (Project), B (Brand), C (Visual), D (Logo), E (Social), F (References), G (Notes)',
        'Prompt: Design type, dimensions, color palette (hex), typography, composition, quality',
        'ImageFX: 1000 char max, newline removal, proxy, 5 max retries',
        'Error response: errorType, message, solution, alternativeServices array'
      ],
      workflow: [
        'Design brief submitted via webhook',
        '7-section parser extracts structured data',
        'Conditional routing determines design type',
        'Type-specific brief formatter applied',
        'Gemini generates optimized AI prompt',
        'Prompt cleaned and truncated for ImageFX',
        'Image generated and returned with Base64 + URL'
      ]
    }
  ];

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = { Headphones, Zap, BarChart3, Database, Shield, Code, Search, MapPin, Clock, Palette };
    return icons[iconName] || Zap;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('projects');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
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
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <div className="section-tag mx-auto justify-center">Work</div>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground font-dmsans max-w-3xl mx-auto mt-6">
            7 enterprise-grade AI automation systems — click any project for full technical details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className={`group cursor-pointer rounded-2xl p-6 lg:p-8 transition-all duration-500 relative overflow-hidden bg-card border border-border hover:border-primary/30 hover:bg-[#0d2040] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(0,200,255,0.06)] ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                onClick={() => openProject(project.id)}
              >
                {/* Category & Status Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                    {project.status}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-xl lg:text-2xl font-bold font-syne text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.subtitle}
                </p>

                {/* Metrics */}
                <div className="space-y-2 mb-6">
                  {project.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="flex items-center text-xs">
                      <Zap size={12} className="text-primary mr-2" />
                      <span className="text-muted-foreground mr-1">{metric.label}:</span>
                      <span className="text-white/80 font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* View Details Link */}
                <div className="mt-auto">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest flex items-center group-hover:text-primary/80 transition-colors">
                    VIEW DETAILS <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <div className="stat-card p-8 max-w-2xl mx-auto shadow-glow-blue">
            <h3 className="text-2xl font-bold font-syne text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">Ready to Build Something Intelligent?</h3>
            <p className="text-white/80 font-dmsans mb-6">I specialize in AI automation systems that scale — from conversational agents to enterprise workflows.</p>
            <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary hover:bg-primary/80 text-white font-syne border-none mt-2 px-8">
              Let's Build Together
            </Button>
          </div>
        </div>
      </div>

      {currentProject && createPortal(
        (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={closeProject}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row gap-6 animate-scale-in h-full lg:h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column - Sticky Details Card */}
              <div className="w-full lg:w-[400px] flex-shrink-0 bg-[#0a1122] border border-primary/20 rounded-2xl p-6 lg:p-8 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(0,180,255,0.1)]">
                <button onClick={closeProject} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-white/10 flex items-center justify-center transition-colors lg:hidden z-10">
                  <X size={16} className="text-white" />
                </button>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 border border-primary/20 flex-shrink-0 flex items-center justify-center">
                    <currentProject.icon size={28} className={currentProject.color} />
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-3xl font-bold font-syne text-white leading-tight mb-2 tracking-tight">{currentProject.title}</h2>
                    <p className="text-sm text-white/70 font-dmsans leading-relaxed mb-4">{currentProject.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1 text-center rounded-xl border border-primary/20 bg-primary/10">{currentProject.status}</span>
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-3 py-1 text-center rounded-xl border border-white/10 bg-white/5">{currentProject.category}</span>
                    </div>
                  </div>
                </div>

                {/* Push tech tags to the bottom */}
                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] font-bold text-white/60 uppercase tracking-widest px-3 py-1.5 rounded-xl border border-white/5 bg-white/5">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Transparent Background with Content */}
              <div className="flex-1 flex flex-col min-h-0 relative lg:pl-4">
                <button onClick={closeProject} className="absolute -top-2 -right-2 z-50 w-10 h-10 rounded-full bg-[#0a1122] border border-primary/20 hover:bg-primary/20 hidden lg:flex items-center justify-center transition-colors shadow-lg">
                  <X size={18} className="text-white" />
                </button>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 lg:gap-4 custom-scroll border-b-2 border-[#122340] pb-0 mb-6">
                  {['overview', 'features', 'technical', 'workflow'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-syne font-semibold transition-all relative ${activeTab === tab ? 'text-primary' : 'text-white/40 hover:text-white/80'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(0,180,255,0.8)]" />}
                    </button>
                  ))}
                </div>

                {/* Scrollable Content Area */}
                <div className="overflow-y-auto custom-scroll flex-1 pr-2 lg:pr-4">
                  {activeTab === 'overview' && (
                    <div className="space-y-8 font-dmsans max-w-3xl">
                      <div className="bg-[#0a1122]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8">
                        <h3 className="text-lg lg:text-xl font-syne font-bold text-white mb-4 flex items-center gap-2"><div className="w-1.5 h-6 bg-primary rounded-full"></div> Overview</h3>
                        <p className="text-white/60 leading-relaxed text-[15px]">{currentProject.overview}</p>
                      </div>

                      <div className="bg-[#0a1122]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8">
                        <h3 className="text-lg lg:text-xl font-syne font-bold text-white mb-4 flex items-center gap-2"><div className="w-1.5 h-6 bg-accent rounded-full"></div> Goal</h3>
                        <p className="text-white/60 leading-relaxed text-[15px]">{currentProject.goal}</p>
                      </div>

                      <div className="bg-[#0a1122]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8">
                        <h3 className="text-lg lg:text-xl font-syne font-bold text-white mb-6 flex items-center gap-2"><div className="w-1.5 h-6 bg-blue-500 rounded-full"></div> Architecture</h3>
                        <div className="space-y-4 text-[15px]">
                          {currentProject.architecture.map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${currentProject.color === 'text-primary' ? 'bg-primary shadow-[0_0_10px_rgba(0,180,255,0.8)]' : 'bg-accent shadow-[0_0_10px_rgba(0,255,150,0.8)]'}`} />
                              <span className="text-white/70 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#0a1122]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8 mb-8">
                        <h3 className="text-lg lg:text-xl font-syne font-bold text-white mb-6 flex items-center gap-2"><div className="w-1.5 h-6 bg-purple-500 rounded-full"></div> Performance Specs</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {currentProject.metrics.map((m) => (
                            <div key={m.label} className="bg-[#0a1122] border border-white/5 rounded-xl p-4 text-center">
                              <div className="font-syne font-bold text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">{m.value}</div>
                              <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6 font-dmsans pb-8">
                      {currentProject.features.map((f) => {
                        const Icon = getIconComponent(f.iconName);
                        return (
                          <div key={f.title} className="bg-[#0a1122]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-primary/20 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-[#040d1a] border border-white/5 flex items-center justify-center">
                                <Icon size={24} className={currentProject.color} />
                              </div>
                              <h4 className="font-syne font-bold text-lg text-white">{f.title}</h4>
                            </div>
                            <p className="text-[15px] text-white/60 leading-relaxed">{f.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className="space-y-4 font-dmsans max-w-3xl pb-8">
                      {currentProject.technicalDetails.map((d, i) => (
                        <div key={i} className="bg-[#0a1122]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 border-l-4 border-l-primary/50">
                          <code className="text-[14px] text-primary/90 font-mono block leading-relaxed">{d}</code>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'workflow' && (
                    <div className="bg-[#0a1122]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 lg:p-8 max-w-3xl pb-8">
                      <div className="relative pl-4">
                        {currentProject.workflow.map((step, i) => (
                          <div key={i} className="flex items-start gap-6 pb-8 last:pb-0 relative">
                            {/* Vertical Line */}
                            {i < currentProject.workflow.length - 1 && (
                              <div className={`absolute top-10 left-[15px] bottom-[-20px] w-0.5 ${currentProject.color === 'text-primary' ? 'bg-primary/20' : 'bg-accent/20'}`} />
                            )}

                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold border-2 relative z-10 ${currentProject.color === 'text-primary' ? 'bg-[#040d1a] border-primary text-primary shadow-[0_0_15px_rgba(0,180,255,0.4)]' : 'bg-[#040d1a] border-accent text-accent shadow-[0_0_15px_rgba(0,255,150,0.4)]'}`}>
                              {i + 1}
                            </div>

                            <div className="flex-1 bg-[#040d1a] border border-white/5 rounded-xl p-5 transform transition-transform hover:-translate-y-1">
                              <p className="text-white/80 leading-relaxed text-[15px]">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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