import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Play, Square, Volume2, ShieldCheck, List, Sparkles, MessageSquare, CornerDownLeft, VolumeX, AlertTriangle } from 'lucide-react';

interface VoiceHUDProps {
  isConnected: boolean;
  isMuted: boolean;
  isSpeaking: boolean;
  onToggleConnection: () => void;
  onToggleMic: () => void;
  systemLogSetter: (log: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'iris';
  text: string;
  timestamp: string;
}

export default function VoiceHUD({
  isConnected,
  isMuted,
  isSpeaking,
  onToggleConnection,
  onToggleMic,
  systemLogSetter
}: VoiceHUDProps) {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { id: '1', sender: 'iris', text: "System Boot Successful. Greetings, Developer. I am IRIS-AI. All low-level Windows integration hooks and vector databases are fully synced. How can I assist you in your digital environment today?", timestamp: "05:30" }
  ]);
  const [volume, setVolume] = useState(85);
  const [permissions, setPermissions] = useState({
    keyboard: true,
    mouse: true,
    apps: true,
    screen: true,
    clipboard: true
  });
  const [voiceInputDb, setVoiceInputDb] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Simulate volume orb movement/wave amplification when speaking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected && !isMuted) {
      interval = setInterval(() => {
        setVoiceInputDb(Math.floor(Math.random() * (isSpeaking ? 80 : 25)));
      }, 100);
    } else {
      setVoiceInputDb(0);
    }
    return () => clearInterval(interval);
  }, [isConnected, isMuted, isSpeaking]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    systemLogSetter(`USER: "${userMsg.text}" processed via chat gateway.`);

    // Simulated IRIS reply
    setTimeout(() => {
      let replyText = "Understood. I have simulated the low-level Windows automated script. Let me know if I should dispatch PyAutoGUI hooks.";
      if (userMsg.text.toLowerCase().includes('hello') || userMsg.text.toLowerCase().includes('hey')) {
        replyText = "Hello Developer. Audio telemetry channels are open. Input levels are crystal clear.";
      } else if (userMsg.text.toLowerCase().includes('status') || userMsg.text.toLowerCase().includes('system')) {
        replyText = "All systems reporting operational. SQLite database matches 100% integrity. Cloud sync channels secured.";
      } else if (userMsg.text.toLowerCase().includes('clear')) {
        setChatHistory([]);
        return;
      }

      const irisMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'iris',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, irisMsg]);
      systemLogSetter(`IRIS: "${irisMsg.text}" dispatched via audio synth.`);
    }, 1000);
  };

  const togglePermission = (key: keyof typeof permissions) => {
    const next = !permissions[key];
    setPermissions(prev => ({ ...prev, [key]: next }));
    systemLogSetter(`Security permission: ${String(key).toUpperCase()} set to ${next ? 'GRANTED' : 'REVOKED'}.`);
  };

  const triggerVoiceResponse = () => {
    onToggleConnection();
    if (!isConnected) {
      systemLogSetter("Voice session channels initialized. Audio devices authorized.");
    } else {
      systemLogSetter("Voice session channels closed. Entering offline cache mode.");
    }
  };

  return (
    <div id="iris-voice-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT SECTION: Voice HUD Orb Controller (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-6 relative overflow-hidden">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* 1. Header with metadata */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">Audio Transceiver</span>
          </div>
          <span className="text-[9px] font-mono text-neutral-500 uppercase">Input: Default Mic (Realtek)</span>
        </div>

        {/* 2. Interactive CENTRAL ORB */}
        <div className="my-10 relative flex flex-col items-center justify-center">
          
          {/* External pulsating rings */}
          <AnimatePresence>
            {isConnected && !isMuted && (
              <>
                <motion.div
                  className="absolute w-64 h-64 rounded-full border border-emerald-500/10 bg-emerald-500/[0.01]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-48 h-48 rounded-full border border-teal-500/20 bg-teal-500/[0.01]"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className="absolute w-36 h-36 rounded-full border border-emerald-400/40 bg-emerald-400/[0.03]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Central click target button */}
          <button
            id="voice-orb-button"
            onClick={triggerVoiceResponse}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center relative z-20 cursor-pointer transition-all duration-300 focus:outline-none ${
              isConnected
                ? isMuted
                  ? 'bg-gradient-to-tr from-neutral-900 to-neutral-850 shadow-[0_0_20px_rgba(239,68,68,0.2)] border border-red-500/40'
                  : 'bg-gradient-to-tr from-emerald-950 to-teal-900 shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-400/50'
                : 'bg-gradient-to-tr from-neutral-900 to-neutral-950 shadow-inner border border-neutral-800 hover:border-emerald-500/30'
            }`}
          >
            {isConnected ? (
              isMuted ? (
                <MicOff className="w-8 h-8 text-red-400" />
              ) : (
                <Mic className={`w-8 h-8 text-emerald-300 ${isSpeaking ? 'scale-110 animate-bounce' : 'animate-pulse'}`} />
              )
            ) : (
              <Play className="w-8 h-8 text-neutral-400 hover:text-emerald-400 ml-1 transition" />
            )}
            <span className="text-[9px] font-mono mt-1 text-neutral-400 uppercase tracking-wider font-bold">
              {isConnected ? (isMuted ? 'Muted' : (isSpeaking ? 'Speaking' : 'Listening')) : 'Idle Core'}
            </span>
          </button>

          {/* Waveform visualizer */}
          <div className="mt-8 w-full flex items-center justify-center gap-1 h-8 px-8">
            {Array.from({ length: 18 }).map((_, i) => {
              // Calculate randomized heights based on connection state
              const height = isConnected && !isMuted
                ? Math.max(4, Math.sin(i * 0.4) * (isSpeaking ? 32 : 12) + (Math.random() * (isSpeaking ? 16 : 8)))
                : 3;
              return (
                <motion.div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-100 ${isConnected ? (isMuted ? 'bg-red-500/30' : 'bg-emerald-400') : 'bg-neutral-800'}`}
                  style={{ height: `${height}px` }}
                  animate={isConnected && !isMuted ? { scaleY: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.5 + (i % 3) * 0.1 }}
                />
              );
            })}
          </div>
        </div>

        {/* 3. Controls & volume */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-t border-neutral-900 pt-4 text-xs">
            <span className="font-mono text-neutral-500">Audio Telemetry</span>
            <span className="font-mono text-emerald-400">{voiceInputDb} dB SPL</span>
          </div>

          <div className="flex items-center gap-3 bg-neutral-900/40 border border-neutral-900 p-2.5 rounded-xl">
            <button
              onClick={() => setVolume(v => v === 0 ? 80 : 0)}
              className="p-1.5 rounded bg-neutral-950 border border-neutral-850 hover:border-emerald-500/20 text-neutral-400 cursor-pointer"
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-neutral-850 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <span className="font-mono text-[10px] text-neutral-500 w-6 text-right">{volume}%</span>
          </div>
        </div>

      </div>

      {/* RIGHT SECTION: Chat Transcript Companion & Sensitive Permissions (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-5 h-full">
        
        {/* Chat bubble console */}
        <div className="flex-1 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Session Transcript</span>
            </div>
            <button
              onClick={() => setChatHistory([])}
              className="text-[10px] font-mono text-neutral-500 hover:text-emerald-400 transition"
            >
              Clear Transcript
            </button>
          </div>

          {/* Dialog list */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <MessageSquare className="w-8 h-8 text-neutral-800 mb-2" />
                <p className="text-xs text-neutral-600 font-mono">No chat transcript log. Type in the box below or click the Orb to speak.</p>
              </div>
            ) : (
              chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[9px] font-mono text-neutral-500 font-bold uppercase">
                      {msg.sender === 'user' ? 'Developer' : 'IRIS System'}
                    </span>
                    <span className="text-[8px] font-mono text-neutral-600">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs font-sans leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-neutral-900 text-emerald-300 border border-emerald-500/10 rounded-tr-none'
                        : 'bg-emerald-950/20 text-neutral-100 border border-emerald-500/15 rounded-tl-none shadow-[0_0_10px_rgba(16,185,129,0.03)]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Typing box */}
          <div className="mt-4 pt-3 border-t border-neutral-900">
            <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-850 rounded-xl p-1.5 focus-within:border-emerald-500/30 transition-all">
              <input
                type="text"
                placeholder="Message IRIS-AI..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent text-xs text-neutral-200 px-3 focus:outline-none py-1.5"
              />
              <button
                onClick={handleSendMessage}
                className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 transition cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Permissions & security locks dashboard */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 border-b border-neutral-900 pb-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">OS Security & Vault Rules</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { key: 'keyboard' as const, label: 'Key-Logger hooks' },
              { key: 'mouse' as const, label: 'Mouse hooks' },
              { key: 'apps' as const, label: 'OS Executables' },
              { key: 'screen' as const, label: 'Screen OCR' },
              { key: 'clipboard' as const, label: 'Secure Buffer' }
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => togglePermission(p.key)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition cursor-pointer ${
                  permissions[p.key]
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 shadow-[inset_0_0_8px_rgba(16,185,129,0.1)]'
                    : 'bg-neutral-900/40 border-neutral-900 text-neutral-500'
                }`}
              >
                <span className="text-[10px] font-sans font-bold leading-none">{p.label}</span>
                <span className={`text-[8px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                  permissions[p.key] ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-950 text-neutral-600'
                }`}>
                  {permissions[p.key] ? 'ACTIVE' : 'LOCKED'}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-yellow-500/80 bg-yellow-500/[0.03] border border-yellow-500/10 p-2.5 rounded-xl">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-mono">Security Note: Revoking permission blocks IRIS from carrying out background PyAutoGUI automation.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
