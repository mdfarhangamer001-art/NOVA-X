import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code, Play, RefreshCw, Send, CheckCircle2, Cpu, Eye, Sparkles, Database, Globe, Smartphone, HelpCircle } from 'lucide-react';
import { Workflow } from '../types';

interface DeveloperNexusProps {
  workflows: Workflow[];
  onTriggerWorkflow: (id: string) => void;
  systemLogSetter: (log: string) => void;
}

interface SandboxItem {
  id: string;
  name: string;
  description: string;
  element: React.ReactNode;
}

export default function DeveloperNexus({
  workflows,
  onTriggerWorkflow,
  systemLogSetter
}: DeveloperNexusProps) {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "NOVA-X DEVELER NEXUS SHELL [Version 1.6.3]",
    "Virtual environment node activated on port 3000.",
    "FastAPI automation daemon connected over pipeline port 8000.",
    "Type 'help' to review native hooks or 'execute wf-1' to trigger workflows."
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [sandboxPrompt, setSandboxPrompt] = useState('Crypto Wallet Widget');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Custom sandbox components that are dynamically rendered
  const [activeSandbox, setActiveSandbox] = useState<SandboxItem>({
    id: 'crypto',
    name: 'Generated Crypto Widget',
    description: 'A dynamic visual component representing digital holdings, live index spikes, and instant swap controls.',
    element: (
      <div className="p-4 bg-neutral-900 border border-emerald-500/20 rounded-2xl space-y-3 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="font-sans font-bold text-xs text-neutral-100">BTC Portfolio</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">+4.82%</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider">Estimated Balance</span>
          <p className="text-xl font-mono font-black text-white">$43,180.24</p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] py-1.5 rounded-lg font-bold uppercase hover:bg-emerald-900/30 transition">Deposit</button>
          <button className="bg-neutral-950 border border-neutral-800 text-neutral-400 font-mono text-[9px] py-1.5 rounded-lg uppercase hover:text-white transition">Withdraw</button>
        </div>
      </div>
    )
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Terminal commands handling
  const handleTerminalSubmit = () => {
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    setTerminalLogs(prev => [...prev, `\n> ${cmd}`]);
    setTerminalInput('');
    systemLogSetter(`Terminal command executed: "${cmd}"`);

    setTimeout(() => {
      const lower = cmd.toLowerCase();
      let res: string[] = [];

      if (lower === 'help') {
        res = [
          "AVAILABLE IRIS-SHELL COMMANDS:",
          "  help               - List all available terminal shell utilities",
          "  clear              - Wipe the console logs history",
          "  adb devices        - Poll low-level Android debug bridges",
          "  workflows          - Print list of executable system workflows",
          "  execute <wf_id>    - Dispatches a workflow automation block",
          "  sys-info           - Query system performance telemetry parameters"
        ];
      } else if (lower === 'clear') {
        setTerminalLogs([]);
        return;
      } else if (lower === 'adb devices') {
        res = [
          "LIST OF CONNECTED ADB PORTS:",
          "  * daemon not running; starting now on port 5037",
          "  * daemon started successfully",
          "  dev-9883921af7     Google Pixel 8 Pro (USB_BRIDGE)   AUTHORIZED",
          "  dev-192.168.1.15   Samsung Galaxy S24 (WIFI_PORT)    AUTHORIZED"
        ];
      } else if (lower === 'workflows') {
        res = [
          "SYSTEM WORKFLOW BLOCKS CACHED:",
          ...workflows.map(wf => `  [${wf.id}] ${wf.name} (${wf.category}) - ${wf.actions.length} actions`)
        ];
      } else if (lower.startsWith('execute ')) {
        const wfId = lower.split(' ')[1];
        const match = workflows.find(w => w.id === wfId);
        if (match) {
          onTriggerWorkflow(match.id);
          res = [
            `DISPATCHING WORKFLOW [${match.id}]: "${match.name}"`,
            "Handshaking with FastAPI daemon...",
            `Queued ${match.actions.length} actions in automation background thread.`,
            "Status: QUEUED"
          ];
        } else {
          res = [`ERROR: Workflow "${wfId}" not found in local AppData config database.`];
        }
      } else if (lower === 'sys-info') {
        res = [
          "SYSTEM TELEMETRY REPORT:",
          "  OS Platform: Windows 11 Pro build 22631",
          "  Host Node: AMD Ryzen 9 5900X 12-Core Processor",
          "  GPU Hardware: NVIDIA GeForce RTX 4070 Ti Super",
          "  FastAPI Bridge: Running at http://127.0.0.1:8000"
        ];
      } else {
        res = [`Command not found: "${cmd}". Type 'help' for support list.`];
      }

      setTerminalLogs(prev => [...prev, ...res]);
    }, 400);
  };

  // Live Coding Sandbox generator simulation
  const handleGenerateSandbox = () => {
    if (!sandboxPrompt.trim()) return;
    setIsGenerating(true);
    systemLogSetter(`Initializing real-time AI Sandbox synthesis for: "${sandboxPrompt}"`);

    setTimeout(() => {
      const lower = sandboxPrompt.toLowerCase();
      let newItem: SandboxItem;

      if (lower.includes('weather') || lower.includes('temperature')) {
        newItem = {
          id: 'weather',
          name: 'Bento Weather Widget',
          description: 'A stylish, dynamic layout displaying current barometrics, relative humidity, and precipitation predictions.',
          element: (
            <div className="grid grid-cols-2 gap-2 bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 border border-emerald-500/20 rounded-2xl">
              <div className="col-span-2 flex justify-between items-center border-b border-neutral-900 pb-2 mb-1">
                <span className="font-sans font-bold text-[11px] text-neutral-200">Berlin, DE</span>
                <span className="font-mono text-[9px] text-neutral-400">14:00 UTC</span>
              </div>
              <div className="space-y-1 py-1">
                <span className="text-[14px] font-bold text-white tracking-tight">24°C</span>
                <p className="text-[9px] font-mono text-neutral-500">Scattered Clouds</p>
              </div>
              <div className="flex flex-col justify-end items-end space-y-1">
                <span className="text-[9px] font-mono text-emerald-400">Rain: 12%</span>
                <span className="text-[9px] font-mono text-emerald-400">Wind: 8km/h</span>
              </div>
            </div>
          )
        };
      } else if (lower.includes('chart') || lower.includes('graph') || lower.includes('analytics')) {
        newItem = {
          id: 'chart',
          name: 'Server Analytics Monitor',
          description: 'A visual density index illustrating CPU frequency fluctuations, memory leaks, and incoming gateway payloads.',
          element: (
            <div className="p-4 bg-neutral-900 border border-emerald-500/20 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-mono text-neutral-300 uppercase font-bold">Network Payload Logs</span>
                <span className="font-mono text-emerald-400">98.4% uptime</span>
              </div>
              <div className="h-16 flex items-end gap-1.5 pt-2">
                {[40, 20, 60, 80, 50, 90, 45, 75, 30, 85, 95, 60].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-emerald-500/20 hover:bg-emerald-400 rounded-t-sm transition duration-150 relative group cursor-pointer"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-neutral-950 text-white text-[8px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition z-10">{h}%</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[8px] font-mono text-neutral-500">
                <span>05:00 UTC</span>
                <span>06:00 UTC</span>
              </div>
            </div>
          )
        };
      } else {
        newItem = {
          id: 'custom',
          name: `Custom Generated UI`,
          description: `A responsive viewport sandbox rendering a modular visual element customized for: "${sandboxPrompt}"`,
          element: (
            <div className="p-4 bg-neutral-900 border border-emerald-500/20 rounded-2xl text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="font-sans font-bold text-xs text-neutral-200">Sandbox: {sandboxPrompt}</span>
                <p className="text-[10px] font-mono text-emerald-500">Status: Synthesized successfully.</p>
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                A custom template visual node representing real-time system feedback, styled dynamically.
              </p>
            </div>
          )
        };
      }

      setActiveSandbox(newItem);
      setIsGenerating(false);
      systemLogSetter(`AI sandbox component synthesized successfully: [${newItem.id}] ${newItem.name}`);
    }, 1200);
  };

  return (
    <div id="developer-nexus" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT COLUMN: Shell Emulator Terminal (6 Columns) */}
      <div className="lg:col-span-6 flex flex-col justify-between bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-4 overflow-hidden h-[480px] lg:h-full relative font-mono">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase text-neutral-200">IRIS Virtual Shell</span>
          </div>
          <span className="text-[9px] text-emerald-500 bg-emerald-950/25 border border-emerald-500/10 px-1.5 py-0.5 rounded">CONNECTED</span>
        </div>

        {/* Lines content */}
        <div className="flex-1 overflow-y-auto text-xs space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed text-emerald-300/90 font-mono">
              {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt line */}
        <div className="mt-3 pt-2 border-t border-neutral-900 flex items-center gap-2">
          <span className="text-emerald-400 font-bold font-mono text-xs">{'>'}</span>
          <input
            type="text"
            placeholder="Type 'help' for instructions list..."
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTerminalSubmit()}
            className="flex-1 bg-transparent text-emerald-100 font-mono text-xs border-none focus:outline-none placeholder:text-neutral-700 py-1"
          />
          <button
            onClick={handleTerminalSubmit}
            className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* RIGHT COLUMN: Interactive Sandbox Generator & Workflows Executor (6 Columns) */}
      <div className="lg:col-span-6 flex flex-col gap-5">
        
        {/* UI Sandbox Generator panel */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 flex flex-col justify-between">
          
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Interactive UI Live Coding</span>
            </div>
            <p className="text-[10px] text-neutral-500 font-sans">Generate, test, and render reactive React mock dashboard components dynamically in real-time.</p>
          </div>

          <div className="flex gap-2 mb-4 bg-neutral-900/60 border border-neutral-850 p-1.5 rounded-xl">
            <input
              type="text"
              placeholder="e.g. Bento Weather, Server Monitor Chart..."
              value={sandboxPrompt}
              onChange={(e) => setSandboxPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateSandbox()}
              className="flex-1 bg-transparent text-xs text-neutral-200 px-3 focus:outline-none"
            />
            <button
              onClick={handleGenerateSandbox}
              disabled={isGenerating}
              className="p-1.5 px-3 rounded-lg bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {isGenerating ? 'Synthesizing...' : 'Live Code'}
            </button>
          </div>

          {/* Sandbox Render Box */}
          <div className="border border-neutral-900 bg-[#070707] rounded-xl p-4 min-h-[160px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-neutral-900/80 px-2 py-0.5 rounded-full border border-neutral-800 text-[8px] font-mono text-neutral-500">
              <Eye className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              LIVE CONTAINER PREVIEW
            </div>

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-2 text-center"
                >
                  <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Injecting Stylesheets...</span>
                </motion.div>
              ) : (
                <motion.div
                  key={activeSandbox.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {activeSandbox.element}
                  <div className="text-[10px] font-sans text-neutral-500 leading-normal pl-1.5 border-l border-emerald-500/20">
                    <span className="font-bold text-neutral-400">{activeSandbox.name}:</span> {activeSandbox.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Workflow executor selection box */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">System Macro Pipelines</span>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase">PyAutoGUI Integrations</span>
          </div>

          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-900 bg-[#080808] hover:border-emerald-500/15 transition group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-200 font-sans font-bold group-hover:text-emerald-400 transition">{wf.name}</span>
                    <span className="text-[8px] font-mono text-neutral-500 px-1 py-0.5 rounded border border-neutral-850 uppercase">{wf.category}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 truncate max-w-[280px]">{wf.description}</p>
                </div>
                <button
                  onClick={() => onTriggerWorkflow(wf.id)}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-400 hover:text-emerald-400 text-neutral-400 transition cursor-pointer"
                  title="Execute Macro Workflow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
