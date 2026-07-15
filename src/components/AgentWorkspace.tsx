import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ShieldAlert, CheckCircle2, Cpu, Code, Play, RefreshCw, Send, ArrowRight, BookOpen, PenTool, Clipboard, HelpCircle } from 'lucide-react';
import { CouncilMessage, CouncilResponse } from '../types';

interface AgentWorkspaceProps {
  onAddWorkflow: (name: string, description: string, code: string) => void;
  systemLogSetter: (log: string) => void;
}

const AGENT_META = {
  Planner: {
    title: 'Chief Architect & Planner',
    color: 'border-emerald-500/20 text-emerald-400 bg-emerald-950/20',
    avatarColor: 'bg-emerald-500',
    icon: Clipboard
  },
  Researcher: {
    title: 'Platform Research Agent',
    color: 'border-teal-500/20 text-teal-400 bg-teal-950/20',
    avatarColor: 'bg-teal-500',
    icon: BookOpen
  },
  Designer: {
    title: 'Creative UX Designer',
    color: 'border-cyan-500/20 text-cyan-400 bg-cyan-950/20',
    avatarColor: 'bg-cyan-500',
    icon: PenTool
  },
  Coder: {
    title: 'Automated Scripting Coder',
    color: 'border-emerald-500/20 text-emerald-400 bg-emerald-950/20',
    avatarColor: 'bg-emerald-500',
    icon: Code
  },
  Tester: {
    title: 'System Integrity Tester',
    color: 'border-amber-500/20 text-amber-400 bg-amber-950/20',
    avatarColor: 'bg-amber-500',
    icon: ShieldAlert
  }
};

export default function AgentWorkspace({
  onAddWorkflow,
  systemLogSetter
}: AgentWorkspaceProps) {
  const [prompt, setPrompt] = useState('Create an automated backup script that uploads C:\\Users\\AppData folders to Google Drive, handles missing keys gracefully, and logs status.');
  const [isLoading, setIsLoading] = useState(false);
  const [discussion, setDiscussion] = useState<CouncilMessage[]>([]);
  const [conclusion, setConclusion] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [currentAgentTyping, setCurrentAgentTyping] = useState<string | null>(null);

  const discussionEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    discussionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [discussion, currentAgentTyping]);

  const handleConveneCouncil = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setDiscussion([]);
    setConclusion('');
    setActiveStepIndex(-1);
    setCurrentAgentTyping(null);
    systemLogSetter('Convening the AI Council of 5 specialized agents...');

    try {
      const res = await fetch('/api/council', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        throw new Error(`Failed to convene council: Status ${res.status}`);
      }

      const data: CouncilResponse = await res.json();
      
      // Step-by-step theatrical replay of the debate!
      let step = 0;
      const debateSteps = data.discussion;
      
      const playNextStep = () => {
        if (step >= debateSteps.length) {
          setCurrentAgentTyping(null);
          setConclusion(data.conclusion);
          setIsLoading(false);
          systemLogSetter('AI Council debate completed successfully.');
          return;
        }

        const nextMsg = debateSteps[step];
        setCurrentAgentTyping(nextMsg.agent);
        setActiveStepIndex(step);

        // Simulated typing delay
        setTimeout(() => {
          setDiscussion(prev => [...prev, nextMsg]);
          step++;
          playNextStep();
        }, 1200); // Optimized for faster and smoother user experience
      };

      playNextStep();

    } catch (err: any) {
      console.error(err);
      systemLogSetter(`Council Error: ${err.message || 'Error executing multi-agent debate.'}`);
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-council-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT AREA: Config & Avatars Grid (4 Columns) */}
      <div className="lg:col-span-4 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 justify-between">
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Autonomous Council Grid</span>
          </div>

          <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
            The Multi-Agent Council orchestrates specialized local models to construct complete workflows, secure sensitive operations, and debug scripts.
          </p>

          {/* Agents Grid list */}
          <div className="space-y-2">
            {(Object.keys(AGENT_META) as Array<keyof typeof AGENT_META>).map((agentName) => {
              const meta = AGENT_META[agentName];
              const isSpeaking = currentAgentTyping === agentName;
              const Icon = meta.icon;
              return (
                <div
                  key={agentName}
                  className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                    isSpeaking
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-neutral-900/30 border-neutral-900/60'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${meta.avatarColor} flex items-center justify-center text-neutral-950 flex-shrink-0 shadow-md ${isSpeaking ? 'animate-bounce' : 'opacity-70'}`}>
                    <Icon className="w-4 h-4 text-neutral-950" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-neutral-200 font-sans">{agentName}</p>
                    <p className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">{isSpeaking ? 'Debating...' : 'STANDBY'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input box to Convene */}
        <div className="pt-4 border-t border-neutral-900 space-y-2">
          <textarea
            id="input-council-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your macro prompt or issue for the AI Council..."
            disabled={isLoading}
            rows={2}
            className="w-full bg-neutral-900/60 border border-neutral-850 rounded-xl px-3 py-2 text-xs focus:outline-none text-neutral-200 focus:border-emerald-500/20 placeholder-neutral-700 font-sans"
          />
          <button
            id="btn-convene-council"
            onClick={handleConveneCouncil}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 font-mono font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-45 cursor-pointer"
          >
            {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
            <span>CONVENE COUNCIL</span>
          </button>
        </div>

      </div>

      {/* RIGHT AREA: Debate Discussion Ticker Stream (8 Columns) */}
      <div className="lg:col-span-8 flex flex-col justify-between bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 overflow-hidden min-h-[380px] lg:h-full relative">
        
        {/* Header ticker bar */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Active Debate Streams</span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-emerald-950/40 text-emerald-400 border border-emerald-500/15 px-2 py-0.5 rounded">
            COUNCIL_ONLINE
          </span>
        </div>

        {/* Discussions text logs */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {discussion.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <Cpu className="w-8 h-8 text-neutral-850 mb-2 animate-pulse" />
              <p className="text-xs text-neutral-600 font-mono">No active debate sessions. Use the controller panel on the left to convene the council.</p>
            </div>
          )}

          {discussion.map((msg, idx) => {
            const meta = AGENT_META[msg.agent];
            const Icon = meta.icon;
            const isCoder = msg.agent === 'Coder';
            return (
              <div key={idx} className="flex gap-3 items-start border-b border-neutral-900/60 pb-3">
                <div className={`w-7 h-7 rounded-full ${meta.avatarColor} flex items-center justify-center text-neutral-950 flex-shrink-0 shadow-sm`}>
                  <Icon className="w-3.5 h-3.5 text-neutral-950" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-neutral-200">{msg.agent}</span>
                    <span className="text-[8px] font-mono uppercase text-neutral-500 bg-neutral-900 border border-neutral-850 px-1.5 py-0.5 rounded">
                      {meta.title}
                    </span>
                  </div>

                  {isCoder && msg.message.includes('import') ? (
                    <div className="space-y-2 mt-1">
                      <p className="text-xs text-neutral-300 leading-relaxed">{msg.message.split('```')[0]}</p>
                      <pre className="p-3 bg-neutral-900 border border-neutral-850 rounded-xl text-[10px] text-emerald-400 font-mono overflow-x-auto leading-relaxed max-w-full">
                        <code>
                          {msg.message.includes('```') ? msg.message.split('```')[1]?.replace(/^python\n/, '') : msg.message}
                        </code>
                      </pre>
                      {msg.message.split('```')[2] && (
                        <p className="text-xs text-neutral-300 leading-relaxed">{msg.message.split('```')[2]}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Active animation */}
          {currentAgentTyping && (
            <div className="flex gap-2.5 items-center text-xs text-emerald-400 font-mono bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/10 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Agent <strong>{currentAgentTyping}</strong> is compiling synthesis debate arguments...</span>
            </div>
          )}

          {/* Conclusion Box */}
          {conclusion && (
            <div className="bg-gradient-to-tr from-emerald-950/20 to-teal-950/10 border border-emerald-500/20 p-4 rounded-xl mt-4 space-y-2.5 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>COUNCIL FINAL CONSOLIDATED RECOMMENDATION</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
                {conclusion}
              </p>
              
              <div className="pt-1 flex justify-end">
                <button
                  id="btn-council-export"
                  onClick={() => {
                    const coderMsg = discussion.find(d => d.agent === 'Coder')?.message || '# No code';
                    onAddWorkflow(`Council: ${prompt.slice(0, 30)}...`, `Generated based on custom prompt: "${prompt}"`, coderMsg);
                  }}
                  className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-500/30 hover:border-emerald-400 hover:text-emerald-400 text-emerald-400 font-mono font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg transition"
                >
                  <span>Export to System Macro Pipelines</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
