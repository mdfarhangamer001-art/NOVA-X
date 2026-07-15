import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, ShieldAlert, Sparkles, Database, Play } from 'lucide-react';

interface HolographicStartupProps {
  onComplete: () => void;
}

export default function HolographicStartup({ onComplete }: HolographicStartupProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const startupSteps = [
    { text: 'Initializing IRIS-AI Virtual Core...', delay: 150 },
    { text: 'Indexing Cognitive Memory Vault (SQLite Cluster Database)...', delay: 450 },
    { text: 'Mounting low-level OS automation and PyAutoGUI hook engines...', delay: 800 },
    { text: 'Polling connected USB/ADB mobile devices over loopback port 5037...', delay: 1200 },
    { text: 'Convening Multi-Agent Council discussion channels (Planner, Researcher)...', delay: 1600 },
    { text: 'Configuring AppData Paths (C:\\Users\\AppData\\Local\\NOVA-X)...', delay: 1900 },
    { text: 'Authenticating secure Google OAuth environment manifest keys...', delay: 2200 },
    { text: 'Verification completed: Integrity level matches 100% SECURED.', delay: 250 },
  ];

  useEffect(() => {
    // Progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 120);

    // Logging timers
    const timers = startupSteps.map((step) => {
      return setTimeout(() => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, `[${time}] ${step.text}`]);
      }, step.delay);
    });

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsDone(true);
      }, 400);
    }
  }, [progress]);

  return (
    <div 
      id="holographic-startup" 
      className={`fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 md:p-12 font-mono overflow-hidden text-emerald-400 select-none transition-all duration-700 ${
        isDone ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Sci-fi tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#022c22_1px,transparent_1px),linear-gradient(to_bottom,#022c22_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Header telemetry */}
      <div className="flex justify-between items-start relative z-10 border-b border-emerald-500/20 pb-4 text-[10px] text-emerald-600">
        <div>
          <p className="font-bold uppercase">SYSTEM: IRIS-AI BOOT PROTOCOLS v1.6.3</p>
          <p>CREATOR: TEHZEEB (IG: <span className="text-emerald-400 font-bold">xtehzeeb.x</span>)</p>
        </div>
        <div className="text-right font-mono">
          <p>INTEGRITY: AES-256_VERIFIED</p>
          <p>UTC TIME: {new Date().toISOString()}</p>
        </div>
      </div>

      {/* Main loading orb & progress details */}
      <div className="my-auto flex flex-col items-center justify-center relative z-10 gap-8">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Rotating decorative frames */}
          <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-spin" style={{ animationDuration: '12s' }} />
          <div className="absolute inset-4 rounded-full border border-emerald-400/30 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
          
          {/* Pulsing center sphere */}
          <div className="absolute inset-7 rounded-full bg-emerald-950/20 border border-emerald-400/40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.25)] animate-pulse">
            <Cpu className="w-7 h-7 text-emerald-300 animate-pulse" />
            <span className="text-[13px] font-black mt-1.5 tracking-widest text-emerald-100">{progress}%</span>
          </div>
        </div>

        <div className="text-center space-y-2.5 max-w-xl">
          <h2 className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 uppercase">
            Virtualizing Operating Layer Command Station
          </h2>
          <div className="h-1.5 w-64 bg-neutral-900 border border-emerald-500/20 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-150 ease-out shadow-[0_0_6px_rgba(16,185,129,0.6)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-[9px] text-emerald-500/60 uppercase tracking-widest animate-pulse h-4 mt-2">
            {progress < 100 ? 'Configuring virtual container sectors...' : 'Workspace authorized successfully.'}
          </p>
        </div>

        {/* Real-time ticker terminal logs */}
        <div className="w-full max-w-2xl bg-neutral-950/90 border border-emerald-500/20 rounded-2xl p-4 font-mono text-[10px] text-emerald-400/80 space-y-1 h-40 overflow-y-auto">
          <div className="flex justify-between items-center text-emerald-600 border-b border-emerald-500/10 pb-1 mb-2 text-[8px] uppercase font-bold">
            <span>Terminal Initialization Stream</span>
            <span>Channel: Secure Shell</span>
          </div>
          {logs.map((log, idx) => (
            <p key={idx} className="leading-relaxed truncate">
              {log}
            </p>
          ))}
          {progress < 100 && (
            <p className="text-emerald-400/45 animate-pulse">
              &gt; resolving sector {Math.floor(progress * 15.2)}...
            </p>
          )}
        </div>
      </div>

      {/* Footer trigger controls */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center border-t border-emerald-500/20 pt-4 text-[9px] text-emerald-600 gap-3 w-full">
        <span>SECURITY ENVELOPE: SHA-256_LOCKED</span>
        
        {progress === 100 ? (
          <button
            id="btn-startup-advance"
            onClick={onComplete}
            className="flex items-center gap-2 bg-emerald-950 text-emerald-300 font-bold px-5 py-2 rounded-xl border border-emerald-400/30 cursor-pointer hover:border-emerald-400 transition duration-200 uppercase tracking-wider text-[10px]"
          >
            <span>Enter Core Station</span>
            <Play className="w-3 h-3 fill-current text-emerald-400" />
          </button>
        ) : (
          <button
            id="btn-skip-startup"
            onClick={onComplete}
            className="text-neutral-600 hover:text-emerald-400 tracking-wider uppercase underline transition cursor-pointer"
          >
            Skip Bootloader Sequence
          </button>
        )}
        
        <span>BUILT WITH VITE & REACT</span>
      </div>
    </div>
  );
}
