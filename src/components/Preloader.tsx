import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

/*
 * Color Palette (from project CSS variables):
 * ─────────────────────────────────────────────
 * Background:      #090d11  (--background)
 * Primary Blue:    #00d4ff  (--primary)
 * Accent Green:    #00ff88  (--accent)
 * Primary Glow:    #66e6ff  (--primary-glow)
 * Accent Glow:     #66ffbb  (--accent-glow)
 * Foreground:      #fafafa  (--foreground)
 * Muted Text:      #999999  (--muted-foreground)
 * Border:          #273040  (--border)
 * Green-400:       #4ade80
 * Yellow-400:      #facc15
 * Red-500:         #ef4444
 * Yellow-500:      #eab308
 * Green-500:       #22c55e
 */

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set([preloaderRef.current, progressBarRef.current, logoRef.current], {
      opacity: 1,
    });

    // Logo entrance
    tl.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
      // Progress bar fill
      .to(progressBarRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          gsap.to(progressBarRef.current?.parentElement, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              gsap.to(preloaderRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                  onComplete();
                },
              });
            },
          });
        },
      }, '-=0.4');

    // Floating logo loop
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden font-mono"
      style={{ background: '#090d11' }}
    >
      {/* ========================================== */}
      {/* 1. BACKGROUND LAYER                       */}
      {/* ========================================== */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay: primary ↔ accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,255,136,0.06) 0%, transparent 50%)',
          }}
        />

        {/* Neural Network SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#00ff88" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.8} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Curved neural paths */}
          <g stroke="url(#neuralGrad)" strokeWidth="1" fill="none" filter="url(#glow)">
            <path d="M100,200 Q300,100 500,200 T900,200" className="animate-pulse" style={{ animationDuration: '3s' }} />
            <path d="M200,400 Q400,300 600,400 T800,400" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
            <path d="M150,600 Q350,500 550,600 T850,600" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
            <path d="M300,800 Q500,700 700,800 T900,800" className="animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
            {/* Vertical connections */}
            <line x1="200" y1="200" x2="250" y2="400" className="animate-pulse" style={{ animationDuration: '2s' }} />
            <line x1="500" y1="200" x2="550" y2="400" className="animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
            <line x1="350" y1="400" x2="400" y2="600" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.7s' }} />
            <line x1="650" y1="400" x2="700" y2="600" className="animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1.2s' }} />
          </g>
          {/* Neural nodes */}
          {[
            { x: 200, y: 200 }, { x: 500, y: 200 }, { x: 800, y: 200 },
            { x: 250, y: 400 }, { x: 550, y: 400 }, { x: 750, y: 400 },
            { x: 300, y: 600 }, { x: 600, y: 600 }, { x: 800, y: 600 },
            { x: 400, y: 800 }, { x: 700, y: 800 },
          ].map((n, i) => (
            <circle
              key={i} cx={n.x} cy={n.y} r="3" fill="#00d4ff"
              className="animate-pulse"
              style={{ animationDuration: `${2 + (i % 3)}s`, animationDelay: `${i * 0.2}s`, filter: 'url(#glow)' }}
            />
          ))}
        </svg>

        {/* Circuit grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #00d4ff 1px, transparent 1px), radial-gradient(circle at 80% 80%, #00ff88 1px, transparent 1px), linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px, 120px 120px, 20px 20px, 20px 20px',
          }}
        />

        {/* Scanning lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-full animate-pulse opacity-60"
            style={{ top: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)', animationDuration: '4s', boxShadow: '0 0 20px #00d4ff' }}
          />
          <div
            className="absolute w-full animate-pulse opacity-40"
            style={{ top: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, #00ff88, transparent)', animationDuration: '5s', animationDelay: '1s', boxShadow: '0 0 15px #00ff88' }}
          />
        </div>

        {/* Particles (deterministic positions – no Math.random) */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${(i * 5.3) % 100}%`,
                top: `${(i * 7.1 + 5) % 95}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                backgroundColor: i % 2 === 0 ? '#00d4ff' : '#00ff88',
                opacity: i % 2 === 0 ? 0.4 : 0.3,
                animationDelay: `${(i * 0.4) % 4}s`,
                animationDuration: `${3 + (i % 3)}s`,
                boxShadow: `0 0 ${4 + (i % 5)}px currentColor`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. AI BOOT SEQUENCE OVERLAYS (low opacity) */}
      {/* ========================================== */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.15] pointer-events-none select-none">
        {/* Top-left: AI_CORE */}
        <div className="absolute top-4 left-4 text-xs font-mono" style={{ color: '#00d4ff' }}>
          <div className="animate-pulse" style={{ animationDuration: '3s' }}>
            <div>🧠 AI_CORE_v3.0 INITIALIZING...</div>
            <div className="ml-4" style={{ color: '#4ade80' }}>► Neural networks: ONLINE</div>
            <div className="ml-4" style={{ color: '#00ff88' }}>► Machine learning: ACTIVE</div>
            <div className="ml-4" style={{ color: '#facc15' }}>► Pattern recognition: BOOTING<span className="animate-ping">|</span></div>
          </div>
        </div>

        {/* Top-right: AUTOMATION_ENGINE */}
        <div className="absolute top-24 right-4 text-xs font-mono animate-pulse" style={{ color: '#00ff88', animationDelay: '1s', animationDuration: '4s' }}>
          <div>🤖 AUTOMATION_ENGINE_v2.1</div>
          <div style={{ color: '#4ade80' }}>✓ Process optimization loaded</div>
          <div style={{ color: '#4ade80' }}>✓ Smart workflows enabled</div>
          <div style={{ color: '#facc15' }}>⟳ Intelligent routing active</div>
        </div>

        {/* Bottom-left: QUANTUM_PROCESSOR code block */}
        <div className="absolute bottom-32 left-4 text-xs font-mono animate-pulse" style={{ color: '#999999', animationDelay: '2s', animationDuration: '5s' }}>
          <div>🚀 QUANTUM_PROCESSOR.init() &#123;</div>
          <div className="ml-4">parallel_computing: true,</div>
          <div className="ml-4">ai_acceleration: "ENABLED",</div>
          <div className="ml-4">cognitive_load: optimizing...</div>
          <div>&#125;</div>
        </div>

        {/* Right-center: PREDICTIVE_ANALYTICS */}
        <div className="absolute top-1/2 right-8 text-xs font-mono animate-pulse" style={{ color: 'rgba(0,212,255,0.5)', animationDelay: '2.5s', animationDuration: '4.5s' }}>
          <div>🔮 PREDICTIVE_ANALYTICS</div>
          <div style={{ color: 'rgba(0,255,136,0.7)' }}>├─ Data mining: 99.7%</div>
          <div style={{ color: 'rgba(0,255,136,0.7)' }}>├─ Trend analysis: COMPLETE</div>
          <div style={{ color: 'rgba(74,222,128,0.7)' }}>└─ Insights ready: TRUE</div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. CENTER: TERMINAL LOGO WINDOW            */}
      {/* ========================================== */}
      <div ref={logoRef} className="mb-12 text-center relative z-10">
        <div
          className="rounded-lg p-6 backdrop-blur-sm"
          style={{ background: 'rgba(26,32,48,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
        >
          {/* Traffic-light dots + shell prompt */}
          <div className="flex items-center justify-between mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,212,255,0.2)' }}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.7)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(234,179,8,0.7)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(34,197,94,0.7)' }} />
            </div>
            <div className="text-xs" style={{ color: '#999999' }}>gohar@portfolio:~$</div>
          </div>

          {/* Terminal commands */}
          <div className="text-left space-y-1 mb-4">
            <div className="text-sm" style={{ color: '#4ade80' }}>$ npm start portfolio</div>
            <div className="text-xs" style={{ color: '#999999' }}>Starting development server...</div>
            <div className="text-xs" style={{ color: '#00d4ff' }}>Loading Gohar Hany Portfolio v2.0</div>
          </div>

          {/* Logo: gradient text */}
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
              &gt; Gohar_<span className="animate-ping" style={{ color: '#00d4ff' }}>|</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 4. CENTER: TERMINAL PROGRESS BAR           */}
      {/* ========================================== */}
      <div className="w-96 max-w-md mx-auto relative z-10">
        <div
          className="rounded-lg p-4 backdrop-blur-sm"
          style={{ background: 'rgba(26,32,48,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}
        >
          {/* Header: LOADING_PROGRESS  [097%] */}
          <div className="flex justify-between items-center mb-3 text-xs">
            <span style={{ color: '#00ff88' }}>LOADING_PROGRESS</span>
            <span className="font-bold" style={{ color: '#00d4ff' }}>[{progress.toString().padStart(3, '0')}%]</span>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="text-xs mb-1" style={{ color: '#999999' }}>$ loading --progress --verbose</div>
            <div
              className="relative h-6 rounded overflow-hidden font-mono text-xs"
              style={{ background: 'rgba(26,32,48,0.2)', border: '1px solid rgba(0,212,255,0.3)' }}
            >
              {/* Filled portion: gradient + block chars */}
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full flex items-center justify-center font-bold"
                style={{
                  width: '0%',
                  background: 'linear-gradient(90deg, rgba(0,212,255,0.8), rgba(0,255,136,0.8))',
                  boxShadow: '0 0 20px rgba(0,212,255,0.6)',
                  color: '#090d11',
                }}
              >
                {'█'.repeat(Math.floor(progress / 5))}
              </div>
              {/* Overlay: percentage + empty blocks */}
              <div
                className="absolute inset-0 flex items-center justify-center font-bold"
                style={{ color: '#fafafa' }}
              >
                {progress}% {'█'.repeat(Math.floor((100 - progress) / 10))}
              </div>
            </div>
          </div>

          {/* Status messages */}
          <div className="space-y-1 text-xs">
            <div style={{ color: '#4ade80' }}>✓ AI modules initialized</div>
            <div style={{ color: '#4ade80' }}>✓ Neural networks synced</div>
            <div className="animate-pulse" style={{ color: '#facc15' }}>⟳ Automating experience...</div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 5. BOTTOM STATUS PANELS                    */}
      {/* ========================================== */}
      {/* Bottom-left: system_status */}
      <div className="absolute bottom-8 left-8 text-xs font-mono z-10">
        <div
          className="rounded p-2 backdrop-blur-sm"
          style={{ background: 'rgba(26,32,48,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
        >
          <div style={{ color: '#00d4ff' }}>$ system_status --check</div>
          <div style={{ color: '#4ade80' }}>AI_CORE: ONLINE</div>
          <div style={{ color: '#00ff88' }}>VERSION: 2.0.1</div>
        </div>
      </div>

      {/* Bottom-right: build --production */}
      <div className="absolute bottom-8 right-8 text-xs font-mono z-10">
        <div
          className="rounded p-2 backdrop-blur-sm"
          style={{ background: 'rgba(26,32,48,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}
        >
          <div style={{ color: '#00ff88' }}>$ build --production</div>
          <div style={{ color: '#4ade80' }}>ASSETS: READY</div>
          <div style={{ color: '#00d4ff' }}>STATUS: ACTIVE<span className="animate-ping">_</span></div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 6. CORNER BRACKETS                         */}
      {/* ========================================== */}
      <div className="absolute top-4 left-4 text-2xl font-mono" style={{ color: 'rgba(0,212,255,0.5)' }}>⌜</div>
      <div className="absolute top-4 right-4 text-2xl font-mono" style={{ color: 'rgba(0,255,136,0.5)' }}>⌝</div>
      <div className="absolute bottom-4 left-4 text-2xl font-mono" style={{ color: 'rgba(0,255,136,0.5)' }}>⌞</div>
      <div className="absolute bottom-4 right-4 text-2xl font-mono" style={{ color: 'rgba(0,212,255,0.5)' }}>⌟</div>
    </div>
  );
};

export default Preloader;