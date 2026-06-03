/**
 * SKILLS SECTION — "Bento Lab" + Marquee
 *
 * Inspired by the reference's project cards: each skill domain is a bento-grid
 * card with a live animated mini-visualization inside (agent graph, token bars,
 * waveform, heatmap, etc). A scrolling marquee ticker strip of tech names runs
 * across the top. Cursor spotlight follows the mouse on hover. Each card has
 * skill tags, a status indicator, and a unique animated viz that represents
 * the domain visually.
 *
 * Patterns borrowed from reference:
 * - Bento grid (12-col with span-7/5/6 asymmetry)
 * - Cursor-tracking radial gradient spotlight
 * - .proj-viz style mini visualization areas with vlabel/vval overlays
 * - Marquee with glowing dot separators + gradient fade edges
 * - Stats row with accent underline scaleX animation
 * - Card hover: border glow + translateY lift
 *
 * No new dependencies. GPU-only animations. rAF paused off-screen.
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { Brain, Code, Database, Zap, Wrench, Cpu, Layers } from 'lucide-react';

/* ─────────────────────────────────────
 * MARQUEE ITEMS
 * ───────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Agentic AI', 'Gemini', 'n8n Workflows', 'LangChain', 'Python',
  'Supabase', 'RAG Pipelines', 'Multi-Agent', 'Docker', 'TypeScript',
  'MCP Protocol', 'Prompt Engineering', 'FAISS', 'Vercel', 'GPT-4o',
  'Firebase', 'Groq', 'Webhooks', 'Google Cloud', 'Function Calling',
];

/* ─────────────────────────────────────
 * MINI VISUALIZATIONS
 * One per category — each is a unique animated SVG.
 * ───────────────────────────────────── */

/** 1. Agent Graph — DAG nodes with animated data packet */
const AgentGraphViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = [
      { x: 30, y: 50 }, { x: 95, y: 22 }, { x: 95, y: 78 },
      { x: 175, y: 50 }, { x: 255, y: 22 }, { x: 255, y: 78 }, { x: 340, y: 50 },
    ];
    const labels = ['IN', 'PARSE', 'TOOL', 'PLAN', 'ACT', 'MEM', 'OUT'];
    const edges: [number, number][] = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]];

    let s = '';
    edges.forEach(([a, b]) => {
      s += `<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}" stroke="#00d4ff" stroke-opacity=".2" stroke-width="1"/>`;
    });
    nodes.forEach((n, i) => {
      s += `<circle cx="${n.x}" cy="${n.y}" r="5" fill="#090d11" stroke="#00d4ff" stroke-opacity=".5"/>`;
      s += `<text x="${n.x}" y="${n.y + 16}" text-anchor="middle" fill="rgba(255,255,255,.25)" font-size="7" font-family="DM Sans,sans-serif">${labels[i]}</text>`;
    });
    s += `<circle id="agPkt" r="2.5" fill="#00d4ff" opacity="0"/>`;
    svg.innerHTML = s;

    const pkt = svg.querySelector('#agPkt');
    let ei = 0, t = 0, vis = true, raf = 0;
    const obs = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    obs.observe(svg);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!vis || !pkt) return;
      t += 0.02;
      if (t >= 1) { t = 0; ei = (ei + 1) % edges.length; }
      const [ai, bi] = edges[ei];
      pkt.setAttribute('cx', String(nodes[ai].x + (nodes[bi].x - nodes[ai].x) * t));
      pkt.setAttribute('cy', String(nodes[ai].y + (nodes[bi].y - nodes[ai].y) * t));
      pkt.setAttribute('opacity', String(Math.sin(t * Math.PI) * 0.9));
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return <svg ref={svgRef} viewBox="0 0 370 100" className="w-full h-full" />;
};

/** 2. Token Bars — vertical bars that randomize heights */
const TokenBarsViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const n = 40;
    let bars = '';
    for (let i = 0; i < n; i++) {
      const h = 15 + Math.random() * 75;
      bars += `<rect class="tb" x="${i * (400 / n) + 1}" y="${120 - h}" width="${400 / n - 2}" height="${h}" fill="#c084fc" opacity=".65"/>`;
    }
    svg.innerHTML = bars;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rects = svg.querySelectorAll('.tb');
    let vis = true;
    const obs = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    obs.observe(svg);

    const id = setInterval(() => {
      if (!vis) return;
      rects.forEach(r => {
        const h = 15 + Math.random() * 75;
        r.setAttribute('y', String(120 - h));
        r.setAttribute('height', String(h));
        (r as SVGElement).style.transition = 'all .5s cubic-bezier(.16,1,.3,1)';
      });
    }, 600);

    return () => { clearInterval(id); obs.disconnect(); };
  }, []);

  return <svg ref={svgRef} viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full" />;
};

/** 3. Signal Waveform — scrolling sine wave */
const WaveformViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const n = 80;
    let phase = 0, vis = true, raf = 0;
    const obs = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    obs.observe(svg);

    const build = () => {
      let bars = '';
      for (let i = 0; i < n; i++) {
        const v = Math.abs(Math.sin(i * 0.2 + phase) + Math.sin(i * 0.07 + phase * 0.6)) * 0.45;
        const h = 6 + v * 100;
        bars += `<rect x="${i * (400 / n) + 1}" y="${60 - h / 2}" width="${400 / n - 2}" height="${h}" fill="#00ff88" opacity=".7"/>`;
      }
      return bars;
    };

    svg.innerHTML = build();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!vis) return;
      phase += 0.06;
      svg.innerHTML = build();
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return <svg ref={svgRef} viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full" />;
};

/** 4. Attention Heatmap — grid cells with pulsing opacity */
const HeatmapViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const cols = 36, rows = 10, cw = 400 / cols, ch = 120 / rows;
    let s = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = Math.random();
        s += `<rect class="hc" x="${x * cw}" y="${y * ch}" width="${cw - 0.5}" height="${ch - 0.5}" fill="#fbbf24" opacity="${(v * 0.7).toFixed(2)}"/>`;
      }
    }
    svg.innerHTML = s;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rects = svg.querySelectorAll('.hc');
    let vis = true;
    const obs = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    obs.observe(svg);

    const id = setInterval(() => {
      if (!vis) return;
      for (let k = 0; k < 20; k++) {
        const r = rects[Math.floor(Math.random() * rects.length)] as SVGElement;
        r.setAttribute('opacity', (Math.random() * 0.85).toFixed(2));
        r.style.transition = 'opacity .6s cubic-bezier(.16,1,.3,1)';
      }
    }, 400);

    return () => { clearInterval(id); obs.disconnect(); };
  }, []);

  return <svg ref={svgRef} viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full" />;
};

/** 5. Code Tokenization — animated "cursor" highlighting tokens */
const CodeStreamViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = [
      { tokens: [{ t: 'def', c: '#fb7185' }, { t: ' train', c: '#fff' }, { t: '(model,', c: '#fbbf24' }, { t: ' data):', c: '#fbbf24' }] },
      { tokens: [{ t: '  for', c: '#c084fc' }, { t: ' epoch', c: '#fff' }, { t: ' in', c: '#c084fc' }, { t: ' range(', c: '#00d4ff' }, { t: '100):', c: '#00d4ff' }] },
      { tokens: [{ t: '    loss', c: '#fff' }, { t: ' =', c: '#fff' }, { t: ' model.', c: '#00ff88' }, { t: 'forward(', c: '#00ff88' }, { t: 'batch)', c: '#fbbf24' }] },
      { tokens: [{ t: '    loss.', c: '#00ff88' }, { t: 'backward()', c: '#00ff88' }] },
      { tokens: [{ t: '    optim.', c: '#00d4ff' }, { t: 'step()', c: '#00d4ff' }] },
      { tokens: [{ t: '  return', c: '#c084fc' }, { t: ' model.', c: '#00ff88' }, { t: 'eval()', c: '#00ff88' }] },
    ];

    let s = '';
    lines.forEach((line, li) => {
      let xOff = 10;
      line.tokens.forEach((tok, ti) => {
        const w = tok.t.length * 7;
        s += `<rect class="ct" data-li="${li}" data-ti="${ti}" x="${xOff - 1}" y="${li * 18 + 8}" width="${w + 2}" height="14" fill="${tok.c}" opacity="0" rx="1"/>`;
        s += `<text x="${xOff}" y="${li * 18 + 19}" fill="${tok.c}" opacity=".7" font-size="11" font-family="monospace">${tok.t}</text>`;
        xOff += w;
      });
    });
    svg.innerHTML = s;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rects = svg.querySelectorAll('.ct');
    let vis = true, idx = 0;
    const obs = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    obs.observe(svg);

    const id = setInterval(() => {
      if (!vis) return;
      rects.forEach(r => { r.setAttribute('opacity', '0'); });
      rects[idx % rects.length].setAttribute('opacity', '0.12');
      idx++;
    }, 350);

    return () => { clearInterval(id); obs.disconnect(); };
  }, []);

  return <svg ref={svgRef} viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full" />;
};

/** 6. Deploy Curve — descending loss curve with animated dot */
const DeployCurveViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const pts: number[] = [];
    let v = 2.2;
    for (let i = 0; i < 50; i++) { v = Math.max(0.05, v * (0.92 + Math.random() * 0.04)); pts.push(v); }
    const max = Math.max(...pts), min = Math.min(...pts);
    const d = pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * 400;
      const y = 120 - ((p - min) / (max - min)) * 95 - 10;
      return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }).join(' ');

    svg.innerHTML = `
      <defs><linearGradient id="lcg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#818cf8" stop-opacity=".3"/>
        <stop offset="100%" stop-color="#818cf8" stop-opacity="0"/>
      </linearGradient></defs>
      <g stroke="rgba(255,255,255,.04)" stroke-width=".5">
        <line x1="0" y1="30" x2="400" y2="30"/><line x1="0" y1="60" x2="400" y2="60"/>
        <line x1="0" y1="90" x2="400" y2="90"/>
      </g>
      <path d="${d} L400 120 L0 120 Z" fill="url(#lcg)"/>
      <path d="${d}" fill="none" stroke="#818cf8" stroke-width="1.5"/>
      <circle id="lcDot" cx="0" cy="0" r="3" fill="#818cf8"/>
    `;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = svg.querySelector('#lcDot');
    let t = 0, vis = true, raf = 0;
    const obs = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    obs.observe(svg);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!vis || !dot) return;
      t = (t + 0.003) % 1;
      const i = Math.floor(t * (pts.length - 1));
      const x = (i / (pts.length - 1)) * 400;
      const y = 120 - ((pts[i] - min) / (max - min)) * 95 - 10;
      dot.setAttribute('cx', x.toFixed(1));
      dot.setAttribute('cy', y.toFixed(1));
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return <svg ref={svgRef} viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full" />;
};

/* ─────────────────────────────────────
 * SKILL CATEGORIES DATA
 * ───────────────────────────────────── */
const CATEGORIES = [
  {
    icon: Brain,
    label: 'AI ARCHITECTURE',
    title: 'Agentic AI Systems',
    desc: 'End-to-end agentic pipelines with multi-agent orchestration, tool calling, memory systems, and guardrails for production-safe AI.',
    color: '#00d4ff',
    status: 'ACTIVE · CORE',
    vizLabel: 'AGENT GRAPH · 7 NODES',
    vizVal: 'EXEC',
    Viz: AgentGraphViz,
    gridClass: 'lg:col-span-7',
    vizHeight: 'h-[120px] lg:h-[150px]',
    skills: ['Agentic AI Systems', 'Multi-Agent Orchestration', 'MCP Protocol', 'Tool Calling', 'Memory Systems', 'Planning & Reasoning', 'AI Guardrails', 'Prompt Engineering'],
  },
  {
    icon: Cpu,
    label: 'LLM ENGINEERING',
    title: 'Large Language Models',
    desc: 'Production model routing across Gemini, GPT-4o, Claude, and open models with structured outputs and function calling.',
    color: '#c084fc',
    status: 'ACTIVE',
    vizLabel: 'TOKEN STREAM',
    vizVal: '128 t/s',
    Viz: TokenBarsViz,
    gridClass: 'lg:col-span-5',
    vizHeight: 'h-[120px]',
    skills: ['Gemini API', 'GPT-4o-mini', 'Claude 3.5', 'Groq (Llama 4)', 'OpenRouter', 'Model Routing', 'Structured Outputs', 'Function Calling'],
  },
  {
    icon: Zap,
    label: 'AUTOMATION',
    title: 'Workflow Automation',
    desc: 'Event-driven automation with n8n, webhook orchestration, and real-time messaging across Telegram, WhatsApp, and Pusher.',
    color: '#00ff88',
    status: 'ACTIVE',
    vizLabel: 'SIGNAL WAVEFORM',
    vizVal: 'LIVE',
    Viz: WaveformViz,
    gridClass: 'lg:col-span-5',
    vizHeight: 'h-[120px]',
    skills: ['n8n Workflows', 'Webhook Orchestration', 'Telegram API', 'WhatsApp API', 'Pusher Realtime', 'Google Sheets API', 'REST API Integration', 'Event-Driven Pipelines'],
  },
  {
    icon: Database,
    label: 'DATA SYSTEMS',
    title: 'RAG & Vector Search',
    desc: 'Retrieval-augmented generation pipelines with vector stores, embedding strategies, and knowledge base architecture.',
    color: '#fbbf24',
    status: 'ACTIVE',
    vizLabel: 'ATTENTION MATRIX',
    vizVal: '8 heads',
    Viz: HeatmapViz,
    gridClass: 'lg:col-span-7',
    vizHeight: 'h-[120px]',
    skills: ['LangChain', 'RAG Pipelines', 'FAISS', 'Supabase Vector Store', 'Embeddings', 'Chunking Strategies', 'Retrieval Tuning', 'Knowledge Bases'],
  },
  {
    icon: Code,
    label: 'LANGUAGES',
    title: 'Core Languages',
    desc: 'Full-stack fluency from Python ML pipelines to TypeScript frontends, with SQL databases and shell scripting.',
    color: '#fb7185',
    status: 'DAILY',
    vizLabel: 'CODE TOKENIZER',
    vizVal: 'SCAN',
    Viz: CodeStreamViz,
    gridClass: 'lg:col-span-6',
    vizHeight: 'h-[120px]',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'Go', 'C++', 'Bash'],
  },
  {
    icon: Wrench,
    label: 'PLATFORMS',
    title: 'Platforms & MLOps',
    desc: 'Cloud-native deployment with Supabase, Firebase, GCP, Docker, and experiment tracking with MLflow and Jupyter.',
    color: '#818cf8',
    status: 'INFRA',
    vizLabel: 'DEPLOY METRICS · 50 EPOCHS',
    vizVal: '0.042',
    Viz: DeployCurveViz,
    gridClass: 'lg:col-span-6',
    vizHeight: 'h-[120px]',
    skills: ['Supabase', 'Google Cloud', 'Firebase', 'Docker', 'Git & GitHub', 'Jupyter', 'MLflow', 'Vercel'],
  },
];

const STATS = [
  { label: 'AI Systems Delivered', value: 15, suffix: '+' },
  { label: 'Automation Workflows', value: 50, suffix: '+' },
  { label: 'LLM Integrations', value: 8, suffix: '+' },
  { label: 'Tools & Platforms', value: 20, suffix: '+' },
];

/* ─────────────────────────────────────
 * SKILL CARD COMPONENT
 * ───────────────────────────────────── */
const SkillCard = ({ cat, visible, index }: { cat: typeof CATEGORIES[0]; visible: boolean; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = cat.icon;

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      className={`${cat.gridClass} md:col-span-1 relative overflow-hidden flex flex-col
        border border-white/[0.06] p-6 lg:p-8
        transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
        hover:border-white/[0.12] hover:-translate-y-1
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}
        group`}
      style={{
        background: 'rgba(12, 15, 20, 0.85)',
        transitionDelay: visible ? `${0.1 + index * 0.08}s` : '0s',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}50` }}
      />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(450px circle at var(--mx, 50%) var(--my, 50%), ${cat.color}0c, transparent 40%)`,
        }}
      />

      {/* Top bar: icon + label + status */}
      <div className="relative z-10 flex justify-between items-center text-[10.5px] tracking-[0.14em] uppercase font-dmsans mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="p-1.5 rounded-md transition-all duration-500 group-hover:scale-110"
            style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}20` }}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: cat.color, filter: `drop-shadow(0 0 6px ${cat.color}60)` }}
            />
          </div>
          <span className="text-white/35">{cat.label}</span>
        </div>
        <span className="flex items-center gap-1.5" style={{ color: cat.color }}>
          <span
            className="w-[6px] h-[6px] rounded-full"
            style={{
              backgroundColor: cat.color,
              boxShadow: `0 0 8px ${cat.color}`,
              animation: 'skills-pulse-dot 2.2s infinite',
            }}
          />
          {cat.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl lg:text-2xl font-syne font-bold text-white tracking-tight leading-tight mb-2">
        {cat.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-[13px] font-dmsans text-white/40 mb-5 max-w-[520px] leading-relaxed">
        {cat.desc}
      </p>

      {/* Skill tags */}
      <div className="relative z-10 flex flex-wrap gap-[5px] mb-5">
        {cat.skills.map((skill) => (
          <span
            key={skill}
            className="text-[11px] px-2.5 py-[5px] border text-white/55 tracking-wide font-dmsans
              hover:text-white transition-all duration-300"
            style={{
              borderColor: `${cat.color}15`,
              background: `${cat.color}06`,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = `${cat.color}40`;
              (e.target as HTMLElement).style.background = `${cat.color}12`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = `${cat.color}15`;
              (e.target as HTMLElement).style.background = `${cat.color}06`;
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Mini visualization */}
      <div
        className={`relative z-10 mt-auto border border-white/[0.05] overflow-hidden ${cat.vizHeight}`}
        style={{ background: 'rgba(6, 7, 10, 0.5)' }}
      >
        {/* Viz labels */}
        <span className="absolute top-2 left-2.5 text-[9px] text-white/25 tracking-[0.15em] uppercase z-10 font-dmsans">
          {cat.vizLabel}
        </span>
        <span
          className="absolute top-2 right-2.5 text-[9px] tracking-[0.1em] z-10 font-dmsans tabular-nums"
          style={{ color: cat.color }}
        >
          {cat.vizVal}
        </span>
        <cat.Viz />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
 * MAIN SECTION
 * ───────────────────────────────────── */
const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [counters, setCounters] = useState<number[]>(STATS.map(() => 0));
  const hasCountered = useRef(false);

  /* ── Intersection Observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Counter animation ── */
  useEffect(() => {
    if (!isVisible || hasCountered.current) return;
    hasCountered.current = true;
    const easeOut = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
    const dur = 1800, t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setCounters(STATS.map((s) => Math.floor(s.value * easeOut(p))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const tid = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(tid);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 lg:py-24 relative bg-background overflow-hidden selection:bg-primary/30"
    >
      {/* ═══ HEADER ═══ */}
      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">
        <div className={`mb-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section number + rule */}
          <div className="flex items-baseline gap-4 mb-5">
            <span className="text-primary font-dmsans text-sm tracking-[0.1em]">/ 03</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white tracking-tight leading-none">
              Skills <span className="text-white/20">&</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Expertise</span>
            </h2>
            <div className="flex-1 h-[1px] bg-white/[0.06] ml-2.5 relative hidden md:block">
              <div className="absolute left-0 -top-[1px] h-[3px] w-8 bg-primary" style={{ boxShadow: '0 0 10px var(--neon-blue)' }} />
            </div>
          </div>
          {/* Subtitle */}
          <p className="text-sm md:text-base font-dmsans text-white/35 max-w-2xl leading-relaxed">
            The tools, platforms, and technologies I use daily to build production AI systems — 
            from agentic architectures to deployment infrastructure.
          </p>
        </div>
      </div>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div
        className={`relative border-t border-b border-white/[0.06] overflow-hidden py-4 mb-10 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'rgba(12, 15, 20, 0.6)' }}
      >
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #090d11, transparent)' }} />
        <div className="absolute top-0 bottom-0 right-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #090d11, transparent)' }} />

        {/* Track */}
        <div className="flex gap-12 whitespace-nowrap w-max hover:[animation-play-state:paused]" style={{ animation: 'skills-marquee 55s linear infinite' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={`font-syne font-bold tracking-tight inline-flex items-center gap-12
                ${i % 3 === 0 ? 'text-white' : 'text-white/30'}
                text-xl md:text-2xl lg:text-[28px]`}
            >
              {item}
              <span className="w-[6px] h-[6px] rounded-full bg-primary flex-shrink-0" style={{ boxShadow: '0 0 10px var(--neon-blue)' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ═══ BENTO GRID ═══ */}
      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} visible={isVisible} index={i} />
          ))}
        </div>

        {/* ═══ STATS ═══ */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-0 mt-10 border-t border-b border-white/[0.05] transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative py-7 px-5 lg:px-8 overflow-hidden
                lg:border-r lg:border-white/[0.05] lg:last:border-r-0
                ${i % 2 === 0 ? 'border-r border-white/[0.05]' : ''}
                ${i < 2 ? 'border-b border-white/[0.05] lg:border-b-0' : ''}
              `}
            >
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] transition-transform duration-[800ms] ease-[cubic-bezier(.16,1,.3,1)] origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                style={{
                  background: 'var(--neon-blue)',
                  boxShadow: '0 0 8px var(--neon-blue)',
                  transitionDelay: `${1200 + i * 200}ms`,
                }}
              />
              <div className="text-3xl lg:text-5xl font-syne font-bold text-white tracking-tight leading-none tabular-nums">
                {counters[i]}
                <sup className="text-[0.4em] text-primary ml-1 font-dmsans">{stat.suffix}</sup>
              </div>
              <div className="mt-3 text-[10.5px] font-dmsans text-white/30 tracking-[0.15em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SCOPED KEYFRAMES ═══ */}
      <style>{`
        @keyframes skills-marquee {
          to { transform: translateX(-50%); }
        }
        @keyframes skills-pulse-dot {
          0%, 100% { box-shadow: 0 0 6px currentColor; }
          50% { box-shadow: 0 0 16px currentColor; }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;