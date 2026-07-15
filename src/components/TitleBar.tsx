import React from 'react';
import { Shield, Sparkles, Terminal, Mic, RefreshCw, Minus, Square, X, Wifi } from 'lucide-react';

interface TitleBarProps {
  isConnected: boolean;
  isMuted: boolean;
  isSpeaking: boolean;
  onToggleConnection: () => void;
  onToggleMic: () => void;
  appVersion?: string;
  userEmail?: string;
}

export default function TitleBar({
  isConnected,
  isMuted,
  isSpeaking,
  onToggleConnection,
  onToggleMic,
  appVersion = "v1.6.3 Pro",
  userEmail = "mdfarhangamer001@gmail.com"
}: TitleBarProps) {
  return (
    <div id="iris-header-bar" className="bg-[#050505] border-b border-emerald-500/15 h-12 flex items-center justify-between px-4 select-none relative z-50">
      
      {/* 1. Left branding section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 shadow-[0_0_8px_rgba(16,185,129,0.3)] border border-emerald-400/20">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-sans font-black tracking-widest text-xs text-neutral-100">IRIS-AI</span>
          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
            {appVersion}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-neutral-500 border-l border-neutral-800 pl-3">
          <Wifi className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span className="font-mono">HOST: 127.0.0.1:3000</span>
        </div>
      </div>

      {/* 2. Central Live Indicator status bubble */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 bg-neutral-950/60 border border-neutral-900 px-4 py-1 rounded-full text-xs">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? (isSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500') : 'bg-neutral-600'}`} />
          <span className="font-mono text-[10px] text-neutral-300 font-bold uppercase tracking-wider">
            {isConnected ? (isSpeaking ? 'IRIS Speaking' : 'IRIS Connected') : 'Offline Standby'}
          </span>
        </div>

        {isConnected && (
          <div className="flex items-center gap-2 border-l border-neutral-800 pl-3">
            <button
              id="title-btn-mute"
              onClick={onToggleMic}
              className={`p-1 rounded transition duration-200 cursor-pointer ${isMuted ? 'bg-red-950/40 text-red-400 border border-red-500/10' : 'hover:bg-neutral-900 text-emerald-400'}`}
              title={isMuted ? "Unmute Mic" : "Mute Mic"}
            >
              <Mic className={`w-3 h-3 ${isMuted ? 'text-red-400' : 'text-emerald-400 animate-pulse'}`} />
            </button>
            <span className="text-[9px] font-mono text-neutral-500">Latency: 24ms</span>
          </div>
        )}
      </div>

      {/* 3. Right Session indicators & native app control window mimics */}
      <div className="flex items-center gap-4">
        {/* User profile capsule */}
        <div className="hidden lg:flex items-center gap-2 bg-neutral-950/55 border border-neutral-850 px-2.5 py-1 rounded-lg">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-[8px] font-black text-emerald-400 font-mono">
            {userEmail.slice(0, 1).toUpperCase()}
          </div>
          <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[150px]">{userEmail}</span>
        </div>

        {/* Windows titlebar standard buttons */}
        <div className="flex items-center gap-1.5 text-neutral-500">
          <button id="win-btn-minimize" className="p-1 hover:bg-neutral-900 hover:text-white rounded transition cursor-pointer">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button id="win-btn-maximize" className="p-1 hover:bg-neutral-900 hover:text-white rounded transition cursor-pointer">
            <Square className="w-3 h-3" />
          </button>
          <button id="win-btn-close" className="p-1 hover:bg-red-600 hover:text-white rounded transition cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
