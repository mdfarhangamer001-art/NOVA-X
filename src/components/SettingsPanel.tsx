import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  RefreshCw, 
  Key, 
  ShieldCheck, 
  HelpCircle, 
  Activity, 
  Play, 
  CheckCircle, 
  ToggleLeft, 
  ToggleRight, 
  List, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Download,
  Flame,
  ArrowRight
} from 'lucide-react';

interface SettingsPanelProps {
  systemLogs: string[];
  systemLogSetter: (log: string) => void;
}

export default function SettingsPanel({
  systemLogs,
  systemLogSetter
}: SettingsPanelProps) {
  const [currentVersion, setCurrentVersion] = useState("v1.6.3");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [silentUpdates, setSilentUpdates] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string>("July 15, 2026 at 07:36 AM");
  
  // Interactive update simulation states
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [updatePhase, setUpdatePhase] = useState<'idle' | 'downloading' | 'verifying' | 'backing_up' | 'installing' | 'complete'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Initial mock changelogs
  const changelogs = [
    { version: "v1.7.0", date: "Latest Update Available", desc: "Added secure API Center supporting OpenAI, Gemini, Claude, Groq, OpenRouter and Ollama. Configured automated GitHub Actions CI compiler pipelines and Electron-updater client structures." },
    { version: "v1.6.3", date: "July 2026", desc: "Patched low-level ADB USB connectivity pipelines. Upgraded local sqlite vector indices from 768 to 1536 dims. Integrated custom multi-agent Council debate workflows." },
    { version: "v1.5.0", date: "April 2026", desc: "Added full OAuth login profiles sync mechanisms and AppData background cache file directories compression." },
    { version: "v1.2.1", date: "January 2026", desc: "First stable Windows release. Configured Electron main process window transparencies and native titlebar hooks." }
  ];

  const handleCheckManualUpdates = () => {
    setCheckingUpdate(true);
    setUpdateMessage(null);
    systemLogSetter("OS_SHELL: Querying github.com/mdfarhangamer001/react-example release manifests...");

    setTimeout(() => {
      setCheckingUpdate(false);
      setLastChecked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " Today");
      setShowUpdatePrompt(true);
      setUpdateMessage("NOVA-X v1.7.0 Core Update available on remote release index!");
      systemLogSetter("OS_SHELL: Found update candidate NOVA-X v1.7.0. Prompting client operator.");
    }, 1500);
  };

  const triggerUpdateInstallation = () => {
    setShowUpdatePrompt(false);
    setUpdatePhase('downloading');
    setDownloadProgress(0);
    systemLogSetter("UPDATER: Requesting release binary package: 'NOVA-X_v1.7.0_Setup.exe'...");

    // 1. Download Simulation
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 2. Verification Phase
          setUpdatePhase('verifying');
          systemLogSetter("UPDATER: Verifying SHA-256 integrity check signature hashes...");
          
          setTimeout(() => {
            // 3. AppData backup simulation
            setUpdatePhase('backing_up');
            systemLogSetter("UPDATER: Compressing active caches: Backing up SQLite and Key matrices to AppData/Local/NOVA-X/backups/...");
            
            setTimeout(() => {
              // 4. Installing Patch simulation
              setUpdatePhase('installing');
              systemLogSetter("UPDATER: Applying executable patches to native Windows container directories...");
              
              setTimeout(() => {
                // 5. Complete Phase
                setUpdatePhase('complete');
                setCurrentVersion("v1.7.0");
                systemLogSetter("UPDATER: Handshake Hot Restart complete. User database profiles fully restored.");
              }, 1200);
            }, 1000);
          }, 1000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toggleAutoUpdate = () => {
    const next = !autoUpdate;
    setAutoUpdate(next);
    systemLogSetter(`UPDATER: Auto Update polling set to: ${next ? 'ENABLED' : 'DISABLED'}`);
  };

  const toggleSilentUpdates = () => {
    const next = !silentUpdates;
    setSilentUpdates(next);
    systemLogSetter(`UPDATER: Silent background installation set to: ${next ? 'ENABLED' : 'DISABLED'}`);
  };

  return (
    <div id="settings-panel-hud" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT COLUMN: Auto-Update & Env Variable Monitors (6 Columns) */}
      <div className="lg:col-span-6 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 justify-between relative overflow-hidden">
        
        <div className="space-y-4 z-10">
          <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5">
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Updater & OS Hooks</span>
          </div>

          <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
            Configure automatic Windows installer fetching, check stable channel manifests, and configure silent background downloads.
          </p>

          {/* Version panel */}
          <div className="bg-[#070707] border border-neutral-900 p-3.5 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-sans font-medium">Current Installed Version</span>
              <span className="font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/10 px-2 py-0.5 rounded uppercase font-bold text-[9px]">
                {currentVersion} Pro Stable
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] border-t border-neutral-900/60 pt-2.5">
              <span className="text-neutral-500 font-mono">Last Checked</span>
              <span className="font-mono text-neutral-300 text-[10px]">{lastChecked}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] border-t border-neutral-900/60 pt-2.5">
              <span className="text-neutral-500 font-mono">Auto Updates</span>
              <span className={`font-mono text-[9.5px] font-bold ${autoUpdate ? 'text-emerald-400' : 'text-neutral-500'}`}>
                {autoUpdate ? 'ON' : 'OFF'}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCheckManualUpdates}
                disabled={checkingUpdate || updatePhase !== 'idle'}
                className="w-full bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 font-mono font-bold text-[10px] uppercase py-2 rounded-lg transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingUpdate ? 'animate-spin' : ''}`} />
                {checkingUpdate ? 'Connecting to channel...' : 'Check for Updates'}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {updateMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-2.5 bg-emerald-950/20 border border-emerald-500/15 rounded-lg text-[9px] font-mono text-emerald-400 text-center leading-normal"
                >
                  {updateMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle controls lists */}
          <div className="space-y-2.5 pt-1.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#070707] border border-neutral-900">
              <div className="space-y-0.5">
                <span className="text-xs text-neutral-300 font-sans font-bold block">Auto Updates Polling</span>
                <span className="text-[9px] text-neutral-500 font-sans">Poll update servers automatically during application cold boots.</span>
              </div>
              <button onClick={toggleAutoUpdate} className="text-neutral-400 hover:text-emerald-400 transition cursor-pointer">
                {autoUpdate ? <ToggleRight className="w-8 h-8 text-emerald-400" /> : <ToggleLeft className="w-8 h-8 text-neutral-700" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#070707] border border-neutral-900">
              <div className="space-y-0.5">
                <span className="text-xs text-neutral-300 font-sans font-bold block">Silent Background Updates</span>
                <span className="text-[9px] text-neutral-500 font-sans">Unpack and download updates in background threads with zero notifications.</span>
              </div>
              <button onClick={toggleSilentUpdates} className="text-neutral-400 hover:text-emerald-400 transition cursor-pointer">
                {silentUpdates ? <ToggleRight className="w-8 h-8 text-emerald-400" /> : <ToggleLeft className="w-8 h-8 text-neutral-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* System Keys Verification Checkmarks */}
        <div className="mt-4 pt-3 border-t border-neutral-900 space-y-2 z-10">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-400">
            <Key className="w-3.5 h-3.5 text-emerald-500" />
            <span>Environment Credentials Check</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
            {[
              { key: "GOOGLE_CLIENT_ID", active: true },
              { key: "GOOGLE_CLIENT_SECRET", active: true },
              { key: "FIREBASE_API_KEY", active: true },
              { key: "UPDATE_URL", active: true }
            ].map((k) => (
              <div key={k.key} className="p-1.5 rounded bg-[#070707] border border-neutral-900 flex items-center justify-between">
                <span className="text-neutral-500 truncate mr-1.5">{k.key}</span>
                <span className="text-[8px] font-black text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  OK
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* OVERLAYS FOR THE SIMULATED UPDATE FLOWS */}
        <AnimatePresence>
          {showUpdatePrompt && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-black/95 z-40 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-neutral-100 font-sans tracking-tight mb-2">
                NOVA-X v1.7.0 Available
              </h4>
              <p className="text-[10px] text-neutral-400 max-w-sm leading-relaxed mb-6">
                An automated critical system package has been compiled on mdfarhangamer001/react-example release nodes. All settings, database memory layers, and active provider api keys will be preserved.
              </p>
              <div className="flex gap-3 w-full max-w-xs">
                <button
                  onClick={triggerUpdateInstallation}
                  className="flex-1 bg-emerald-950 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 text-[10.5px] font-mono font-bold py-2 rounded-xl transition cursor-pointer"
                >
                  Update Now
                </button>
                <button
                  onClick={() => {
                    setShowUpdatePrompt(false);
                    systemLogSetter("UPDATER: Postponed automated executable patch installation.");
                  }}
                  className="flex-1 bg-neutral-900 border border-neutral-800 hover:text-white text-neutral-400 text-[10.5px] font-mono py-2 rounded-xl transition cursor-pointer"
                >
                  Later
                </button>
              </div>
            </motion.div>
          )}

          {updatePhase !== 'idle' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6"
            >
              <div className="w-full max-w-xs space-y-4">
                <div className="text-center space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest animate-pulse block">
                    {updatePhase === 'downloading' && 'Downloading Release Binaries'}
                    {updatePhase === 'verifying' && 'Validating Signature Hashes'}
                    {updatePhase === 'backing_up' && 'Creating Snapshot Backups'}
                    {updatePhase === 'installing' && 'Injecting Binary Packages'}
                    {updatePhase === 'complete' && 'Systems Re-initialized'}
                  </span>
                  <h5 className="text-xs font-bold text-neutral-200 font-sans">
                    {updatePhase === 'downloading' && `Streaming setup files... ${downloadProgress}%`}
                    {updatePhase === 'verifying' && 'Running SHA-256 validation checks'}
                    {updatePhase === 'backing_up' && 'Securing C:\\Users\\...\\AppData'}
                    {updatePhase === 'installing' && 'Recompiling Electron dependencies'}
                    {updatePhase === 'complete' && 'Hot-Reload Handshake Complete!'}
                  </h5>
                </div>

                {/* Progress bar container */}
                {updatePhase === 'downloading' && (
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-800">
                    <motion.div 
                      className="bg-emerald-500 h-full rounded-full"
                      animate={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}

                {updatePhase !== 'downloading' && updatePhase !== 'complete' && (
                  <div className="flex justify-center py-2">
                    <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
                  </div>
                )}

                {updatePhase === 'complete' && (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-pulse" />
                    </div>
                    <button
                      onClick={() => setUpdatePhase('idle')}
                      className="w-full bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 text-[10.5px] font-mono py-2 rounded-xl transition cursor-pointer"
                    >
                      Return to console panel
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* RIGHT COLUMN: Interactive System Logs & Changelog releases (6 Columns) */}
      <div className="lg:col-span-6 flex flex-col gap-4">
        
        {/* Scrolling releases changelogs timeline */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5 mb-3">
            <List className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Releases & Changelogs</span>
          </div>

          <div className="space-y-3.5 max-h-[170px] overflow-y-auto pr-1">
            {changelogs.map((c, idx) => (
              <div key={idx} className="space-y-1 relative pl-4 border-l border-neutral-900">
                <div className="absolute top-1 left-[-4.5px] w-2 h-2 rounded-full bg-emerald-500" />
                <div className="flex justify-between items-baseline text-[10px] font-mono">
                  <span className="font-bold text-neutral-200">{c.version} Release</span>
                  <span className="text-neutral-500">{c.date}</span>
                </div>
                <p className="text-[10px] text-neutral-400 leading-normal font-sans">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic scrollable log timeline */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 flex-1 flex flex-col justify-between overflow-hidden">
          
          <div className="space-y-3 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">System Activity Telemetry</span>
              </div>
              <span className="text-[9px] font-mono text-neutral-500">Live Logging</span>
            </div>

            <div className="flex-1 bg-[#060606] border border-neutral-900 rounded-xl p-3 h-32 overflow-y-auto text-[10px] font-mono space-y-1 text-emerald-400/90 leading-tight scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {systemLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-neutral-700">
                  <span>No client telemetry events processed yet.</span>
                </div>
              ) : (
                [...systemLogs].reverse().map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    <span className="text-neutral-500">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> {log}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
