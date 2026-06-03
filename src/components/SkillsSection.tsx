/**
 * SKILLS SECTION — "Neural Graph" 
 *
 * Inspired by mission-critical AI system visualizations:
 * A full neural constellation graph where each skill is an absolutely-positioned
 * node connected to a central "core" node by SVG synapse lines. Animated data
 * packets travel along the synapses in real-time. Grid background, level badges,
 * color-coded categories, sticky legend sidebar. The whole thing feels ALIVE.
 *
 * Colors: site palette extended (blue, purple, green, amber, rose, indigo).
 * Fonts: Syne (display) + DM Sans (body). No new deps.
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { Brain, Code, Database, Zap, Wrench, Cpu, Layers } from 'lucide-react';

/* ──────────────────────────────────────────────────────
 * DATA
 * ────────────────────────────────────────────────────── */
interface SkillNode {
  label: string;
  level: string;           // EXPERT | ADV | INT
  color: string;           // hex
  x: number; y: number;    // percent of container
}

const CATEGORIES = [
  { name: 'Agentic AI', color: '#00d4ff', count: 8 },
  { name: 'LLMs', color: '#c084fc', count: 8 },
  { name: 'Automation', color: '#00ff88', count: 8 },
  { name: 'RAG & Data', color: '#fbbf24', count: 8 },
  { name: 'Languages', color: '#fb7185', count: 8 },
  { name: 'Platforms', color: '#818cf8', count: 8 },
];

const NODES: SkillNode[] = [
  // ── Agentic AI (top-left cluster) ──
  { label: 'Agentic AI Systems', level: 'EXPERT', color: '#00d4ff', x: 16, y: 14 },
  { label: 'Multi-Agent',        level: 'EXPERT', color: '#00d4ff', x: 8,  y: 30 },
  { label: 'MCP Protocol',       level: 'ADV',    color: '#00d4ff', x: 18, y: 44 },
  { label: 'Tool Calling',       level: 'EXPERT', color: '#00d4ff', x: 6,  y: 56 },
  { label: 'Memory Systems',     level: 'ADV',    color: '#00d4ff', x: 12, y: 70 },
  { label: 'Planning',           level: 'ADV',    color: '#00d4ff', x: 22, y: 82 },
  { label: 'AI Guardrails',      level: 'ADV',    color: '#00d4ff', x: 8,  y: 84 },
  { label: 'Prompt Eng.',        level: 'EXPERT', color: '#00d4ff', x: 26, y: 26 },

  // ── LLMs (top-right cluster) ──
  { label: 'Gemini API',         level: 'EXPERT', color: '#c084fc', x: 64, y: 10 },
  { label: 'GPT-4o-mini',        level: 'EXPERT', color: '#c084fc', x: 82, y: 16 },
  { label: 'Claude 3.5',         level: 'EXPERT', color: '#c084fc', x: 88, y: 32 },
  { label: 'Groq (Llama 4)',     level: 'ADV',    color: '#c084fc', x: 76, y: 42 },
  { label: 'OpenRouter',         level: 'ADV',    color: '#c084fc', x: 90, y: 52 },
  { label: 'Model Routing',      level: 'ADV',    color: '#c084fc', x: 84, y: 68 },
  { label: 'Structured Out',     level: 'EXPERT', color: '#c084fc', x: 74, y: 28 },
  { label: 'Function Calling',   level: 'EXPERT', color: '#c084fc', x: 92, y: 82 },

  // ── Automation (mid-left) ──
  { label: 'n8n Workflows',      level: 'EXPERT', color: '#00ff88', x: 30, y: 16 },
  { label: 'Webhooks',           level: 'EXPERT', color: '#00ff88', x: 24, y: 58 },
  { label: 'Telegram API',       level: 'EXPERT', color: '#00ff88', x: 10, y: 46 },
  { label: 'WhatsApp API',       level: 'ADV',    color: '#00ff88', x: 20, y: 68 },
  { label: 'Pusher Realtime',    level: 'ADV',    color: '#00ff88', x: 34, y: 38 },
  { label: 'Google Sheets API',  level: 'ADV',    color: '#00ff88', x: 28, y: 72 },
  { label: 'REST APIs',          level: 'EXPERT', color: '#00ff88', x: 36, y: 52 },
  { label: 'Event Pipelines',    level: 'ADV',    color: '#00ff88', x: 16, y: 92 },

  // ── RAG & Data (bottom) ──
  { label: 'LangChain',          level: 'EXPERT', color: '#fbbf24', x: 44, y: 8 },
  { label: 'RAG Pipelines',      level: 'EXPERT', color: '#fbbf24', x: 56, y: 86 },
  { label: 'FAISS',              level: 'ADV',    color: '#fbbf24', x: 42, y: 90 },
  { label: 'Supabase Vector',    level: 'ADV',    color: '#fbbf24', x: 72, y: 82 },
  { label: 'Embeddings',         level: 'ADV',    color: '#fbbf24', x: 62, y: 70 },
  { label: 'Chunking',           level: 'ADV',    color: '#fbbf24', x: 48, y: 74 },
  { label: 'Retrieval Tuning',   level: 'ADV',    color: '#fbbf24', x: 80, y: 90 },
  { label: 'Knowledge Bases',    level: 'ADV',    color: '#fbbf24', x: 34, y: 86 },

  // ── Languages (inner ring) ──
  { label: 'Python',             level: 'EXPERT', color: '#fb7185', x: 36, y: 28 },
  { label: 'JavaScript',         level: 'EXPERT', color: '#fb7185', x: 66, y: 30 },
  { label: 'TypeScript',         level: 'ADV',    color: '#fb7185', x: 66, y: 64 },
  { label: 'SQL',                level: 'ADV',    color: '#fb7185', x: 36, y: 64 },
  { label: 'Java',               level: 'INT',    color: '#fb7185', x: 56, y: 22 },
  { label: 'Go',                 level: 'INT',    color: '#fb7185', x: 58, y: 54 },
  { label: 'C++',                level: 'INT',    color: '#fb7185', x: 44, y: 56 },
  { label: 'Bash',               level: 'ADV',    color: '#fb7185', x: 44, y: 38 },

  // ── Platforms & MLOps (right) ──
  { label: 'Supabase',           level: 'EXPERT', color: '#818cf8', x: 52, y: 18 },
  { label: 'Google Cloud',       level: 'ADV',    color: '#818cf8', x: 52, y: 76 },
  { label: 'Firebase',           level: 'EXPERT', color: '#818cf8', x: 74, y: 54 },
  { label: 'Docker',             level: 'ADV',    color: '#818cf8', x: 86, y: 44 },
  { label: 'Git & GitHub',       level: 'EXPERT', color: '#818cf8', x: 78, y: 74 },
  { label: 'Jupyter',            level: 'ADV',    color: '#818cf8', x: 60, y: 42 },
  { label: 'MLflow',             level: 'ADV',    color: '#818cf8', x: 68, y: 52 },
  { label: 'Vercel',             level: 'ADV',    color: '#818cf8', x: 90, y: 62 },
];

const stats = [
  { label: 'AI Systems Delivered', value: 15, suffix: '+', icon: Layers },
  { label: 'Automation Workflows', value: 50, suffix: '+', icon: Zap },
  { label: 'LLM Integrations', value: 8, suffix: '+', icon: Cpu },
  { label: 'Tools & Platforms', value: 20, suffix: '+', icon: Wrench },
];

/* ──────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────── */
const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const neuralRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>(0);
  const packetsRef = useRef<Array<{ t: number; target: number; speed: number }>>([]);
  const positionsRef = useRef<Array<{ x: number; y: number; col: string }>>([]);
  const centerRef = useRef({ cx: 0, cy: 0 });
  const visibleRef = useRef(false);
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));

  /* ── Intersection Observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Draw SVG lines + start packet animation ── */
  const drawLines = useCallback(() => {
    const wrap = neuralRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const r = wrap.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);

    // Find core node center
    const core = wrap.querySelector('[data-core]') as HTMLElement;
    if (!core) return;
    const cr = core.getBoundingClientRect();
    const cx = cr.left + cr.width / 2 - r.left;
    const cy = cr.top + cr.height / 2 - r.top;
    centerRef.current = { cx, cy };

    // Gather all node positions
    const nodeEls = wrap.querySelectorAll('[data-node]');
    const positions: Array<{ x: number; y: number; col: string }> = [];
    let linesHtml = '';

    nodeEls.forEach((n) => {
      const nr = (n as HTMLElement).getBoundingClientRect();
      const x = nr.left + nr.width / 2 - r.left;
      const y = nr.top + nr.height / 2 - r.top;
      const col = (n as HTMLElement).dataset.color || '#00d4ff';
      positions.push({ x, y, col });
      linesHtml += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${col}" stroke-opacity=".12" stroke-width="1"/>`;
    });

    // Add packet circles
    for (let i = 0; i < 8; i++) {
      linesHtml += `<circle class="pkt" data-pkt="${i}" r="2.5" fill="#00d4ff" opacity="0"/>`;
    }

    svg.innerHTML = linesHtml;
    positionsRef.current = positions;

    // Initialize packets
    if (packetsRef.current.length === 0) {
      packetsRef.current = Array.from({ length: 8 }, () => ({
        t: Math.random(),
        target: Math.floor(Math.random() * positions.length),
        speed: 0.003 + Math.random() * 0.006,
      }));
    }
  }, []);

  /* ── Packet animation loop ── */
  useEffect(() => {
    if (!isVisible) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initial draw (with delay for layout)
    const drawTimer = setTimeout(() => {
      drawLines();
    }, 400);

    const resizeHandler = () => drawLines();
    window.addEventListener('resize', resizeHandler);

    // Neural area visibility observer
    const neuralObs = new IntersectionObserver(
      (es) => { visibleRef.current = es[0].isIntersecting; },
      { threshold: 0 }
    );
    if (neuralRef.current) neuralObs.observe(neuralRef.current);

    // Animation loop
    if (!reducedMotion) {
      const loop = () => {
        animRef.current = requestAnimationFrame(loop);
        if (!visibleRef.current || positionsRef.current.length === 0) return;

        const svg = svgRef.current;
        if (!svg) return;
        const { cx, cy } = centerRef.current;

        packetsRef.current.forEach((p, i) => {
          const el = svg.querySelector(`[data-pkt="${i}"]`);
          if (!el) return;

          p.t += p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.target = Math.floor(Math.random() * positionsRef.current.length);
            p.speed = 0.003 + Math.random() * 0.006;
          }

          const tgt = positionsRef.current[p.target];
          if (!tgt) return;
          const x = cx + (tgt.x - cx) * p.t;
          const y = cy + (tgt.y - cy) * p.t;

          el.setAttribute('cx', String(x));
          el.setAttribute('cy', String(y));
          el.setAttribute('fill', tgt.col);
          el.setAttribute('opacity', String(Math.sin(p.t * Math.PI) * 0.85));
        });
      };
      animRef.current = requestAnimationFrame(loop);
    }

    // Counter animation
    const easeOut = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
    const dur = 2000;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setCounters(stats.map((s) => Math.floor(s.value * easeOut(p))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const counterTimer = setTimeout(() => requestAnimationFrame(tick), 600);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(counterTimer);
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animRef.current);
      neuralObs.disconnect();
    };
  }, [isVisible, drawLines]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 lg:py-32 relative bg-background overflow-hidden selection:bg-primary/30"
    >
      {/* Ambient glow */}
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-primary/6 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary" />
              <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Build</span> With
            </h2>
          </div>
          <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
            A constellation, not a checklist. Proximity to the core reflects real production usage. Watch the synapses — that's data flow.
          </p>
        </div>

        {/* ═══ SKILLS LAYOUT: Legend + Neural Graph ═══ */}
        <div className={`grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          {/* ── Legend Sidebar ── */}
          <aside className="lg:sticky lg:top-28 self-start">
            <h3 className="text-xl lg:text-2xl font-syne font-bold text-white mb-3 tracking-tight leading-tight">
              A constellation, not a checklist.
            </h3>
            <p className="text-sm font-dmsans text-white/40 mb-6 leading-relaxed">
              Each node is a tool I reach for in real projects. The synapses carry animated data packets — that's how these skills connect in production systems.
            </p>

            <div className="flex flex-col">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center gap-3 py-3 border-b border-white/[0.05] text-sm font-dmsans text-white/60 hover:text-white hover:pl-1.5 transition-all duration-300 cursor-default"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: cat.color,
                      boxShadow: `0 0 8px ${cat.color}80`,
                    }}
                  />
                  <span className="flex-1">{cat.name}</span>
                  <span className="text-white/25 text-xs tabular-nums">{cat.count}</span>
                </div>
              ))}
            </div>

            {/* Level key */}
            <div className="mt-6 pt-4 border-t border-white/[0.04]">
              <span className="text-[10px] font-dmsans font-bold text-white/20 uppercase tracking-[0.2em] block mb-3">Proficiency</span>
              <div className="flex gap-4 text-[11px] font-dmsans text-white/40">
                <span>EXPERT</span>
                <span>ADV</span>
                <span>INT</span>
              </div>
            </div>
          </aside>

          {/* ── Neural Constellation Graph ── */}
          <div
            ref={neuralRef}
            className="relative overflow-hidden border border-white/[0.06]"
            style={{
              minHeight: '560px',
              background: `
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px) 0 0 / 40px 40px,
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px) 0 0 / 40px 40px,
                var(--bg-dark, #090d11)
              `,
            }}
          >
            {/* SVG synapse lines + animated packets */}
            <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }} />

            {/* Core node */}
            <div
              data-core
              className="absolute z-10 flex items-center gap-2.5 px-5 py-3.5 border border-white/[0.12] backdrop-blur-sm cursor-default font-syne font-bold text-[15px] text-white tracking-tight"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(19, 24, 32, 0.9)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
                style={{
                  boxShadow: '0 0 12px var(--neon-blue)',
                  animation: 'skills-core-pulse 2s infinite',
                }}
              />
              gohar.hany()
            </div>

            {/* Skill nodes */}
            {NODES.map((node, i) => (
              <div
                key={node.label}
                data-node
                data-color={node.color}
                className="absolute z-10 flex items-center gap-2 px-3 py-2 border border-white/[0.06] text-[12px] font-dmsans tracking-wide text-white/80 whitespace-nowrap cursor-default transition-all duration-300 hover:z-20 hover:scale-105"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(9, 13, 17, 0.85)',
                  ['--c' as string]: node.color,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = node.color;
                  el.style.boxShadow = `0 0 0 1px ${node.color}60, 0 0 24px ${node.color}30`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Color dot */}
                <span
                  className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: node.color,
                    boxShadow: `0 0 6px ${node.color}80`,
                  }}
                />
                {node.label}
                {/* Level badge */}
                <span className="text-[9px] text-white/25 tracking-widest ml-1.5 font-medium">
                  {node.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ STATS ═══ */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-0 mt-14 border-t border-b border-white/[0.05] transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative py-8 px-6 lg:px-8 border-r border-white/[0.05] last:border-r-0 overflow-hidden group"
            >
              {/* Bottom accent line — animates in */}
              <div
                className={`absolute left-0 right-0 bottom-0 h-[1px] transition-transform duration-1000 ease-out origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                style={{
                  background: 'var(--neon-blue)',
                  boxShadow: '0 0 8px var(--neon-blue)',
                  transitionDelay: `${1000 + i * 200}ms`,
                }}
              />
              <div className="text-4xl lg:text-5xl font-syne font-bold text-white tracking-tight leading-none tabular-nums">
                {counters[i]}
                <sup className="text-[0.4em] text-primary ml-1 font-dmsans">{stat.suffix}</sup>
              </div>
              <div className="mt-3 text-[11px] font-dmsans text-white/35 tracking-[0.15em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes skills-core-pulse {
          0%, 100% { box-shadow: 0 0 6px var(--neon-blue, #00d4ff); }
          50% { box-shadow: 0 0 18px var(--neon-blue, #00d4ff); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;