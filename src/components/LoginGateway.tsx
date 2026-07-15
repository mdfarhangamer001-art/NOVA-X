import React, { useState } from 'react';
import { LogIn, User, Smartphone, ShieldCheck, Database, Folder, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface LoginGatewayProps {
  onLoginGoogle: (profile: { name: string; email: string; avatar: string }) => void;
  onLoginLocal: (profile: { name: string; email: string; localPath: string }) => void;
  onLoginGuest: () => void;
  hasLocalData: boolean;
  onMergeChoice: (merge: boolean) => void;
}

export default function LoginGateway({
  onLoginGoogle,
  onLoginLocal,
  onLoginGuest,
  hasLocalData,
  onMergeChoice,
}: LoginGatewayProps) {
  const [authMode, setAuthMode] = useState<'options' | 'local_form' | 'local_loading' | 'merge_prompt'>('options');
  const [localName, setLocalName] = useState('Farhan Gamer');
  const [localEmail, setLocalEmail] = useState('farhan.offline@novax.ai');
  const [creationLogs, setCreationLogs] = useState<string[]>([]);
  const [creationProgress, setCreationProgress] = useState(0);

  // Simulated Google Sign In
  const handleGoogleSignInSim = () => {
    if (hasLocalData) {
      setAuthMode('merge_prompt');
    } else {
      onLoginGoogle({
        name: 'Farhan Gamer',
        email: 'mdfarhangamer001@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      });
    }
  };

  // Create Local Profile Simulation
  const handleCreateLocalProfile = () => {
    setAuthMode('local_loading');
    setCreationProgress(5);
    
    const formattedName = localName.replace(/\s+/g, '_');
    const userPath = `C:\\Users\\${formattedName}\\AppData\\Local\\NOVA-X`;

    const logSteps = [
      { text: `CMD: mkdir -p "${userPath}"`, p: 20, delay: 250 },
      { text: `CMD: mkdir "${userPath}\\chats" "${userPath}\\workflows" "${userPath}\\plugins"`, p: 50, delay: 650 },
      { text: `SQLITE: Initializing local SQLite database: "${userPath}\\memory.db"`, p: 75, delay: 1100 },
      { text: `SYS: Local Windows AppData credentials mapped successfully!`, p: 100, delay: 1600 }
    ];

    setCreationLogs([`[05:31:00] AUTH: Creating local profile target paths...`]);

    logSteps.forEach((step) => {
      setTimeout(() => {
        setCreationProgress(step.p);
        setCreationLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${step.text}`]);
        
        if (step.p === 100) {
          setTimeout(() => {
            onLoginLocal({
              name: localName,
              email: localEmail,
              localPath: userPath
            });
          }, 450);
        }
      }, step.delay);
    });
  };

  return (
    <div id="login-gateway-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Dynamic tech circles background */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-neutral-950 border border-emerald-500/20 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden relative">
        {/* Accent top bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 w-full" />
        
        <div className="p-6 md:p-8 flex flex-col gap-6">
          
          {/* LOGO AREA */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-md mb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-base font-black tracking-widest text-neutral-100 uppercase">IRIS SECURED SIGN-IN</h2>
            <p className="text-[10px] text-neutral-500 mt-1 font-sans">Authenticate your session parameters to launch the virtual station command panel.</p>
          </div>

          {/* MAIN CHANNELS SELECT */}
          {authMode === 'options' && (
            <div className="flex flex-col gap-4">
              
              {/* Option 1: Google login (Primary) */}
              <button
                id="btn-login-google"
                onClick={handleGoogleSignInSim}
                className="w-full text-left p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 hover:bg-emerald-950/20 transition flex items-center justify-between group cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.05)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-100 group-hover:text-emerald-400 transition">Sign In with Google</h4>
                    <p className="text-[9px] text-neutral-500 mt-0.5">Enables automatic Cloud Backup & Sync</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition" />
              </button>

              {/* Option 2: Local Account (Fallback) */}
              <button
                id="btn-login-local"
                onClick={() => setAuthMode('local_form')}
                className="w-full text-left p-4 rounded-xl border border-neutral-900 bg-neutral-900/10 hover:border-emerald-500/10 hover:bg-[#070707] transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-500/15 transition">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-200 group-hover:text-neutral-100 transition">Continue with Local Offline Profile</h4>
                    <p className="text-[9px] text-neutral-500 mt-0.5">Saves states securely inside AppData directory structures</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 transition" />
              </button>

              {/* Option 3: Guest Mode (Ephemeral) */}
              <button
                id="btn-login-guest"
                onClick={onLoginGuest}
                className="w-full text-center p-2 rounded-lg border border-neutral-900 text-neutral-500 hover:text-neutral-300 hover:border-neutral-800 text-[9px] font-bold tracking-wider uppercase transition cursor-pointer"
              >
                LAUNCH GUEST SESSION (EPHEMERAL)
              </button>

              <div className="border-t border-neutral-900 mt-2 pt-3 flex justify-between items-center text-[8px] font-mono text-neutral-600">
                <span>SECURITY RING: SYSTEM-LOCK</span>
                <span>DESKTOP VERSION v1.6.3</span>
              </div>
            </div>
          )}

          {/* LOCAL PROFILE REGISTRATION FORM */}
          {authMode === 'local_form' && (
            <div className="flex flex-col gap-4">
              <div className="bg-neutral-900/30 p-3 rounded-xl border border-neutral-900 text-[9px] text-neutral-400 leading-normal font-mono">
                <span className="font-bold text-emerald-400 block mb-0.5">Offline AppData Standard:</span> 
                IRIS-AI registers database partitions in your local filesystem. Safe, offline, and 100% private.
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-500 font-mono">Profile Owner Name</label>
                <input
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs focus:border-emerald-500/20 outline-none text-neutral-200 font-mono"
                  placeholder="Farhan Gamer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-500 font-mono">System Email Alias</label>
                <input
                  type="email"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs focus:border-emerald-500/20 outline-none text-neutral-200 font-mono"
                  placeholder="farhan@novax-local.internal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold tracking-wider text-neutral-500 font-mono">Simulated Install Path</label>
                <div className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-[10px] font-mono text-neutral-600 flex items-center gap-2 select-none truncate">
                  <Folder className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500/30" />
                  C:\Users\{localName.replace(/\s+/g, '_')}\AppData\Local\NOVA-X
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  id="btn-local-cancel"
                  onClick={() => setAuthMode('options')}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-850 text-neutral-500 text-xs font-bold py-2 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  id="btn-local-submit"
                  onClick={handleCreateLocalProfile}
                  disabled={!localName.trim()}
                  className="flex-1 bg-emerald-950 border border-emerald-500/25 text-emerald-400 text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5"
                >
                  <span>Build Profile</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* LOCAL LOADER MOUNTS */}
          {authMode === 'local_loading' && (
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-xs font-bold text-emerald-400 font-mono animate-pulse uppercase tracking-wider">MAPPING SECURE DIRECTORY BLOCKS</h3>
              
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${creationProgress}%` }} />
              </div>

              <div className="bg-[#050505] p-3.5 border border-neutral-900 rounded-xl h-40 font-mono text-[9px] text-left text-neutral-500 space-y-1 overflow-y-auto">
                {creationLogs.map((log, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {log}
                  </p>
                ))}
                {creationProgress < 100 && (
                  <p className="text-emerald-500/50 animate-pulse font-mono">_ scanning physical clusters...</p>
                )}
              </div>
            </div>
          )}

          {/* DATA MERGING DIALOGUE BOX */}
          {authMode === 'merge_prompt' && (
            <div className="flex flex-col gap-4 font-mono">
              <div className="flex gap-3 items-start bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase">Active Local SQLite Profiles Found</h4>
                  <p className="text-[10px] text-neutral-500 leading-normal font-sans">
                    Existing offline profiles, workflows, and memory clusters identified in local directory.
                  </p>
                </div>
              </div>

              <div className="bg-[#050505] border border-neutral-900 p-3.5 rounded-xl flex flex-col gap-2 text-[10px] text-neutral-400">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Local Cache:</span>
                  <span className="text-emerald-400 truncate max-w-[180px]">%LOCALAPPDATA%\Local\NOVA-X</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sync Pipeline:</span>
                  <span className="text-teal-400">Disk ➔ Encrypted Sync</span>
                </div>
              </div>

              <p className="text-[10px] text-neutral-500 leading-relaxed text-center font-sans">
                Would you like to sync local database records with Google Cloud backups, or overwrite from cloud?
              </p>

              <div className="flex flex-col gap-2 mt-2">
                <button
                  id="btn-merge-yes"
                  onClick={() => {
                    onMergeChoice(true);
                    onLoginGoogle({
                      name: 'Farhan Gamer',
                      email: 'mdfarhangamer001@gmail.com',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    });
                  }}
                  className="w-full bg-emerald-950 border border-emerald-500/20 text-emerald-400 hover:border-emerald-400 font-bold text-xs py-2.5 rounded-lg transition cursor-pointer"
                >
                  YES, MERGE LOCAL CACHE TO CLOUD
                </button>
                <button
                  id="btn-merge-no"
                  onClick={() => {
                    onMergeChoice(false);
                    onLoginGoogle({
                      name: 'Farhan Gamer',
                      email: 'mdfarhangamer001@gmail.com',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                    });
                  }}
                  className="w-full bg-neutral-900 text-neutral-400 hover:text-neutral-200 font-bold text-xs py-2.5 rounded-lg transition cursor-pointer"
                >
                  NO, KEEP SEPARATE SESSION (OVERWRITE)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
