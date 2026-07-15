import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, RefreshCw, Key, ShieldCheck, HelpCircle, Activity, Play, CheckCircle, ToggleLeft, ToggleRight, List, AlertTriangle } from 'lucide-react';

interface SettingsPanelProps {
  systemLogs: string[];
  systemLogSetter: (log: string) => void;
}

export default function SettingsPanel({
  systemLogs,
  systemLogSetter
}: SettingsPanelProps) {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [silentUpdates, setSilentUpdates] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Initial mock changelogs
  const changelogs = [
    { version: "v1.6.3", date: "July 2026", desc: "Patched low-level ADB USB connectivity pipelines. Upgraded local sqlite vector indices from 768 to 1536 dims. Integrated custom multi-agent Council debate workflows." },
    { version: "v1.5.0", date: "April 2026", desc: "Added full OAuth login profiles sync mechanisms and AppData background cache file directories compression." },
    { version: "v1.2.1", date: "January 2026", desc: "First stable Windows release. Configured Electron main process window transparencies and native titlebar hooks." }
  ];

  const handleCheckManualUpdates = () => {
    setCheckingUpdate(true);
    setUpdateMessage(null);
    systemLogSetter("Initiating manual update checking handshake with server update URL.");

    setTimeout(() => {
      setCheckingUpdate(false);
      setUpdateMessage("Your IRIS-AI client is up to date (v1.6.3 Pro). No new installer builds available.");
      systemLogSetter("Update check completed. Client matched stable cloud version.");
    }, 1200);
  };

  const toggleAutoUpdate = () => {
    const next = !autoUpdate;
    setAutoUpdate(next);
    systemLogSetter(`Auto Update polling set to: ${next ? 'ENABLED' : 'DISABLED'}`);
  };

  const toggleSilentUpdates = () => {
    const next = !silentUpdates;
    setSilentUpdates(next);
    systemLogSetter(`Silent background installation set to: ${next ? 'ENABLED' : 'DISABLED'}`);
  };

  return (
    <div id="settings-panel-hud" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT COLUMN: Auto-Update & Env Variable Monitors (6 Columns) */}
      <div className="lg:col-span-6 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 justify-between">
        
        <div className="space-y-4">
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
              <span className="text-neutral-400 font-sans">Current Installed Version</span>
              <span className="font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/10 px-2 py-0.5 rounded uppercase font-bold text-[9px]">
                v1.6.3 Pro Stable
              </span>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-neutral-900/60 pt-2.5">
              <span className="text-neutral-400 font-sans">Update Manifest Provider</span>
              <span className="font-mono text-neutral-300 text-[10px]">https://updates.novax.ai/win64</span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCheckManualUpdates}
                disabled={checkingUpdate}
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
        <div className="mt-4 pt-3 border-t border-neutral-900 space-y-2">
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
