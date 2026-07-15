import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import HolographicStartup from './components/HolographicStartup';
import LoginGateway from './components/LoginGateway';
import TitleBar from './components/TitleBar';
import VoiceHUD from './components/VoiceHUD';
import DeveloperNexus from './components/DeveloperNexus';
import MemoryVault from './components/MemoryVault';
import AgentWorkspace from './components/AgentWorkspace';
import DeviceBridge from './components/DeviceBridge';
import SettingsPanel from './components/SettingsPanel';
import APICenter from './components/APICenter';

import {
  PRESET_WORKFLOWS,
  MOCK_ADB_DEVICES,
  SAMPLE_OCR_SCREENS,
  Workflow,
  WorkflowAction,
  ADBDevice
} from './mockData';

import {
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Smartphone,
  CheckCircle2,
  Settings,
  Shield,
  Trash2,
  Plus,
  Play,
  RotateCcw,
  ArrowRight,
  Database,
  HelpCircle,
  Eye,
  LogOut,
  Sliders,
  ChevronRight,
  ShieldAlert,
  FolderOpen,
  Key
} from 'lucide-react';

export default function App() {
  // Pre-load states
  const [showStartup, setShowStartup] = useState(true);
  const [showLoginGateway, setShowLoginGateway] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; avatar: string; localPath?: string } | null>(null);
  const [hasLocalData, setHasLocalData] = useState(false);
  const [authSessionState, setAuthSessionState] = useState<'unauthenticated' | 'google' | 'local' | 'guest'>('unauthenticated');

  // Navigation: VoiceHUD, Automation, DevNexus, MemoryVault, DeviceBridge, AgentCouncil, Settings, APICenter
  const [activeTab, setActiveTab] = useState<'voice' | 'automation' | 'dev_nexus' | 'memory' | 'device' | 'council' | 'settings' | 'api_center'>('voice');

  // Global Audio Transceiver Connection parameters
  const [isConnected, setIsConnected] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Automation states
  const [workflows, setWorkflows] = useState<Workflow[]>(PRESET_WORKFLOWS);
  const [adbDevices, setAdbDevices] = useState<ADBDevice[]>(MOCK_ADB_DEVICES);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(PRESET_WORKFLOWS[0]);
  const [isSimulatingAutomation, setIsSimulatingAutomation] = useState(false);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [activeActionIndex, setActiveActionIndex] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
  const [showCursor, setShowCursor] = useState(false);

  // New Action Form Parameters
  const [newActionType, setNewActionType] = useState<WorkflowAction['type']>('click');
  const [newActionX, setNewActionX] = useState('450');
  const [newActionY, setNewActionY] = useState('220');
  const [newActionText, setNewActionText] = useState('Hello World');
  const [newActionKey, setNewActionKey] = useState('enter');
  const [newActionAppName, setNewActionAppName] = useState('cmd.exe');
  const [newActionDuration, setNewActionDuration] = useState('1000');

  // Shared Central Logging timeline state
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "IRIS-AI System loaded. Operating terminal shell ready.",
    "SQLite Vector Memory Vault loaded 1,482 active records.",
    "PyAutoGUI simulation loop pipeline successfully mapped."
  ]);

  const addSystemLog = (msg: string) => {
    setSystemLogs(prev => [...prev, msg]);
  };

  // Google Login / Setup functions
  const handleLoginGoogleComplete = (profile: { name: string; email: string; avatar: string }) => {
    setIsLoggedIn(true);
    setAuthSessionState('google');
    setUserProfile(profile);
    setShowLoginGateway(false);
    addSystemLog(`AUTH: Handshake validated successfully for Google Profile [${profile.email}]`);
  };

  const handleLoginLocalComplete = (profile: { name: string; email: string; localPath: string }) => {
    setIsLoggedIn(false);
    setAuthSessionState('local');
    setUserProfile({
      name: profile.name,
      email: profile.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      localPath: profile.localPath
    });
    setHasLocalData(true);
    setShowLoginGateway(false);
    addSystemLog(`AUTH: Handshake authorized for Local Workspace Profile: [${profile.name}]`);
  };

  const handleLoginGuestComplete = () => {
    setIsLoggedIn(false);
    setAuthSessionState('guest');
    setUserProfile({
      name: 'Guest User',
      email: 'guest@novax-ephemeral.internal',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    });
    setShowLoginGateway(false);
    addSystemLog("AUTH: Initialized Guest session. Data will not persist outside this tab context.");
  };

  const handleMergeChoiceComplete = (merge: boolean) => {
    if (merge) {
      addSystemLog("SMART_SYNC: Merged Local AppData profiles successfully into central cloud synchronization.");
    } else {
      addSystemLog("SMART_SYNC: Maintained offline database isolated partition.");
    }
    setHasLocalData(false);
  };

  const handleGoogleLogout = () => {
    setIsLoggedIn(false);
    setAuthSessionState('unauthenticated');
    setUserProfile(null);
    setShowLoginGateway(true);
    addSystemLog("AUTH: Connected Google Session has been terminated.");
  };

  // Automation logic
  const handleAddAction = () => {
    const action: WorkflowAction = {
      id: `act-${Date.now()}`,
      type: newActionType,
      params: {
        x: newActionType === 'click' ? parseInt(newActionX) : undefined,
        y: newActionType === 'click' ? parseInt(newActionY) : undefined,
        text: (newActionType === 'type' || newActionType === 'capture') ? newActionText : undefined,
        key: newActionType === 'press' ? newActionKey : undefined,
        appName: newActionType === 'open' ? newActionAppName : undefined,
        duration: newActionType === 'wait' ? parseInt(newActionDuration) : undefined,
      }
    };

    const updatedWorkflow = {
      ...selectedWorkflow,
      actions: [...selectedWorkflow.actions, action]
    };

    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
    addSystemLog(`AUTOMATION: Appended action [${newActionType}] to pipeline: "${selectedWorkflow.name}"`);
  };

  const handleDeleteAction = (actId: string) => {
    const updatedWorkflow = {
      ...selectedWorkflow,
      actions: selectedWorkflow.actions.filter(a => a.id !== actId)
    };
    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
    addSystemLog(`AUTOMATION: Removed action index from pipeline.`);
  };

  const runWorkflowSimulation = () => {
    if (isSimulatingAutomation) return;
    setIsSimulatingAutomation(true);
    setAutomationProgress(0);
    setActiveActionIndex(0);
    setShowCursor(true);
    
    addSystemLog(`SIMULATION: Spawning Windows pywin32 automation threads for "${selectedWorkflow.name}"`);

    let i = 0;
    const actions = selectedWorkflow.actions;

    const executeNext = () => {
      if (i >= actions.length) {
        setIsSimulatingAutomation(false);
        setActiveActionIndex(-1);
        setShowCursor(false);
        setAutomationProgress(100);
        addSystemLog(`SIMULATION: Pipeline execution complete. 100% of actions verified successfully.`);
        return;
      }

      const action = actions[i];
      setActiveActionIndex(i);
      setAutomationProgress(Math.round(((i + 1) / actions.length) * 100));

      // Visual mouse coordinates translation simulation
      if (action.type === 'click' && action.params.x && action.params.y) {
        setCursorPos({ x: action.params.x, y: action.params.y });
      } else if (action.type === 'open') {
        setCursorPos({ x: 200, y: 150 }); // Simulated top left
      }

      addSystemLog(`PYAUTOGUI EXECUTE: Action [${action.type}] executed successfully.`);

      setTimeout(() => {
        i++;
        executeNext();
      }, 1000);
    };

    executeNext();
  };

  // Add a brand-new workflow directly (e.g. from the Multi-Agent Council export)
  const handleAddNewWorkflow = (name: string, description: string, code: string) => {
    const newWf: Workflow = {
      id: `wf-${Date.now()}`,
      name,
      description,
      category: 'System',
      actions: [
        { id: `act-1`, type: 'open', params: { appName: 'PowerShell' } },
        { id: `act-2`, type: 'type', params: { text: 'echo "Initializing custom exported macro code..."' } },
        { id: `act-3`, type: 'press', params: { key: 'enter' } },
        { id: `act-4`, type: 'wait', params: { duration: 1000 } }
      ]
    };
    setWorkflows(prev => [...prev, newWf]);
    setSelectedWorkflow(newWf);
    addSystemLog(`INTEGRATION: Multi-Agent Council exported workflow successfully saved.`);
  };

  // Sound/Speech toggle triggers
  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
    addSystemLog(`AUDIO: System voice transceiver connection toggled to ${!isConnected ? 'ON' : 'OFF'}`);
  };

  const handleToggleMic = () => {
    setIsMuted(!isMuted);
    addSystemLog(`AUDIO: Microphone inputs toggled to ${!isMuted ? 'MUTED' : 'UNMUTED'}`);
  };

  if (showStartup) {
    return <HolographicStartup onComplete={() => setShowStartup(false)} />;
  }

  if (showLoginGateway) {
    return (
      <LoginGateway
        onLoginGoogle={handleLoginGoogleComplete}
        onLoginLocal={handleLoginLocalComplete}
        onLoginGuest={handleLoginGuestComplete}
        hasLocalData={hasLocalData}
        onMergeChoice={handleMergeChoiceComplete}
      />
    );
  }

  return (
    <div id="iris-app-root" className="min-h-screen bg-black text-neutral-200 font-sans flex flex-col overflow-hidden select-none">
      
      {/* 1. Header TitleBar bar */}
      <TitleBar
        isConnected={isConnected}
        isMuted={isMuted}
        isSpeaking={isSpeaking}
        onToggleConnection={handleToggleConnection}
        onToggleMic={handleToggleMic}
        userEmail={userProfile?.email}
      />

      {/* 2. Main interface columns */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION (LEFT RAIL) */}
        <nav id="iris-sidebar-nav" className="w-16 md:w-56 bg-[#040404] border-r border-emerald-500/10 flex flex-col justify-between py-4 px-2 select-none flex-shrink-0">
          
          <div className="space-y-6">
            <div className="hidden md:block px-3 py-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 font-bold block mb-1">COMMAND ROOMS</span>
              <div className="h-0.5 bg-neutral-900 w-full" />
            </div>

            {/* Nav options */}
            <div className="space-y-1">
              {[
                { id: 'voice' as const, label: 'Voice HUD', icon: Sparkles, desc: 'Listen / Active transceiver' },
                { id: 'automation' as const, label: 'Automation', icon: Sliders, desc: 'Macro execution engines' },
                { id: 'dev_nexus' as const, label: 'Dev Nexus', icon: Terminal, desc: 'Live shell & UI coding' },
                { id: 'memory' as const, label: 'Memory Vault', icon: Database, desc: 'SQLite vector coordinates' },
                { id: 'device' as const, label: 'Device Bridge', icon: Smartphone, desc: 'USB ADB mirroring OCR' },
                { id: 'council' as const, label: 'Council Grid', icon: Cpu, desc: '5-Agent collaborative reasoning' },
                { id: 'api_center' as const, label: 'API Center', icon: Key, desc: 'Secure providers & sync' },
                { id: 'settings' as const, label: 'Settings Panel', icon: Settings, desc: 'Updater manifests' }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      addSystemLog(`OS: Focus viewport navigation switched to: "${tab.label}"`);
                    }}
                    className={`w-full flex items-center justify-center md:justify-start gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/20 border-emerald-500/25 text-emerald-400 font-bold shadow-[inset_0_0_8px_rgba(16,185,129,0.05)]'
                        : 'bg-transparent border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-[#070707]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                    <div className="hidden md:block text-left">
                      <p className="text-xs font-sans leading-none">{tab.label}</p>
                      <p className="text-[7px] text-neutral-600 truncate max-w-[120px] font-sans font-normal mt-0.5">{tab.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer of nav */}
          <div className="space-y-3 px-1">
            <div className="hidden md:flex items-center gap-2 bg-[#080808] border border-neutral-900 p-2 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-emerald-950 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                {userProfile?.name?.slice(0, 1).toUpperCase()}
              </div>
              <div className="truncate flex-1">
                <span className="text-[9px] font-mono text-neutral-400 font-bold block leading-none">{userProfile?.name}</span>
                <span className="text-[7px] text-neutral-600 font-mono leading-none truncate block">{authSessionState.toUpperCase()} SESSION</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogout}
              className="w-full flex items-center justify-center md:justify-start gap-3 p-2 rounded-lg text-neutral-600 hover:text-red-400 transition cursor-pointer"
              title="Terminate Connection"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:block text-[10px] font-mono font-bold uppercase">Exit Client</span>
            </button>
          </div>

        </nav>

        {/* WORKSPACE AREA (CENTER / RIGHT PANEL) */}
        <main id="iris-main-viewport" className="flex-1 overflow-hidden relative bg-[#010101]">
          
          {/* Active room selectors */}
          {activeTab === 'voice' && (
            <VoiceHUD
              isConnected={isConnected}
              isMuted={isMuted}
              isSpeaking={isSpeaking}
              onToggleConnection={handleToggleConnection}
              onToggleMic={handleToggleMic}
              systemLogSetter={addSystemLog}
            />
          )}

          {activeTab === 'automation' && (
            <div id="automation-hub-view" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
              
              {/* LEFT: Custom Pipeline Actions list & Form (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">PyAutoGUI Automation Hub</span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase">State: Native Windows</span>
                  </div>

                  {/* Dropdown selectors */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono uppercase text-neutral-500 font-bold">Macro Pipeline</label>
                      <select
                        value={selectedWorkflow.id}
                        onChange={(e) => {
                          const wf = workflows.find(w => w.id === e.target.value);
                          if (wf) {
                            setSelectedWorkflow(wf);
                            addSystemLog(`AUTOMATION: Selected active macro target: "${wf.name}"`);
                          }
                        }}
                        className="bg-neutral-900 border border-neutral-850 rounded-xl px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none"
                      >
                        {workflows.map(wf => (
                          <option key={wf.id} value={wf.id}>{wf.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono uppercase text-neutral-500 font-bold">Category Class</label>
                      <div className="bg-[#070707] border border-neutral-900 px-3 py-1.5 rounded-xl text-xs text-neutral-400 font-mono flex items-center justify-between">
                        <span>{selectedWorkflow.category}</span>
                        <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1 rounded border border-emerald-500/15">LOCAL</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
                    {selectedWorkflow.description}
                  </p>

                  {/* Actions vertical stack list */}
                  <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                    {selectedWorkflow.actions.map((act, index) => {
                      const isActive = isSimulatingAutomation && activeActionIndex === index;
                      return (
                        <div
                          key={act.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                            isActive
                              ? 'bg-emerald-950/20 border-emerald-400/50 shadow-sm'
                              : 'bg-[#070707] border-neutral-900'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-bold text-neutral-500">#{index + 1}</span>
                            <div className="space-y-0.5">
                              <span className="text-xs text-neutral-200 font-sans font-bold capitalize">{act.type} action</span>
                              <p className="text-[9px] font-mono text-neutral-500">
                                {act.type === 'click' && `Coords: (X:${act.params.x}, Y:${act.params.y})`}
                                {act.type === 'type' && `Payload: "${act.params.text}"`}
                                {act.type === 'open' && `Target app: "${act.params.appName}"`}
                                {act.type === 'press' && `Keystroke: [${act.params.key}]`}
                                {act.type === 'wait' && `Timeout: ${act.params.duration}ms`}
                                {act.type === 'capture' && `OCR Frame: "${act.params.text}"`}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteAction(act.id)}
                            className="p-1 text-neutral-600 hover:text-red-400 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Automation trigger simulation footer */}
                <div className="pt-3 border-t border-neutral-900 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={runWorkflowSimulation}
                      disabled={isSimulatingAutomation || selectedWorkflow.actions.length === 0}
                      className="bg-emerald-950 border border-emerald-500/25 hover:border-emerald-400 text-emerald-400 font-mono font-bold text-xs px-5 py-2 rounded-xl transition flex items-center gap-1.5 disabled:opacity-45 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute Macro Simulation</span>
                    </button>
                  </div>

                  {isSimulatingAutomation && (
                    <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-mono animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Simulating: {automationProgress}%</span>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT: Mouse coordinate picker simulation & Add Actions (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col gap-4 justify-between h-full">
                
                {/* Visual coordinate target preview sandbox */}
                <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5 mb-2.5">
                    <Eye className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">OS Cursor Sandbox Monitor</span>
                  </div>

                  <p className="text-[9px] text-neutral-500 font-sans mb-3 leading-normal">
                    Interactive simulation of physical Windows desktops (1920x1080 bounds). Coordinates update on click triggers.
                  </p>

                  {/* The visual coordinate canvas */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const rawX = Math.round(e.clientX - rect.left);
                      const rawY = Math.round(e.clientY - rect.top);
                      
                      // Scale coordinates to 1920x1080 matrix for PyAutoGUI compliance
                      const mappedX = Math.round((rawX / rect.width) * 1920);
                      const mappedY = Math.round((rawY / rect.height) * 1080);

                      setNewActionX(mappedX.toString());
                      setNewActionY(mappedY.toString());
                      addSystemLog(`GUI: Target pixel coordinate mapped dynamically at (X: ${mappedX}, Y: ${mappedY})`);
                    }}
                    className="border border-neutral-900 bg-[#070707] h-40 rounded-xl relative cursor-crosshair overflow-hidden select-none"
                  >
                    {/* Horizontal cross lines */}
                    <div className="absolute inset-x-0 top-1/2 border-t border-neutral-900/50" />
                    <div className="absolute inset-y-0 left-1/2 border-l border-neutral-900/50" />

                    {/* Animated moving simulated physical cursor pointer */}
                    {showCursor && (
                      <motion.div
                        className="absolute z-20 pointer-events-none"
                        animate={{
                          left: `${(cursorPos.x / 1920) * 100}%`,
                          top: `${(cursorPos.y / 1080) * 100}%`
                        }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                      >
                        <div className="relative">
                          <svg className="w-5 h-5 text-emerald-400 fill-current drop-shadow" viewBox="0 0 24 24">
                            <path d="M4.5 3v15.25l4.5-4.5 3.25 7.5 2.5-1.1-3.25-7.5h6L4.5 3z" />
                          </svg>
                          <div className="absolute top-4 left-4 bg-emerald-950 border border-emerald-500/20 px-1 py-0.5 rounded text-[8px] font-mono text-emerald-400 whitespace-nowrap">
                            ({cursorPos.x}, {cursorPos.y})
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="absolute bottom-2.5 left-2.5 text-[8px] font-mono text-neutral-600 bg-neutral-950/80 px-1.5 py-0.5 rounded border border-neutral-900">
                      BOUNDS: 1920 x 1080 PX
                    </div>
                  </div>

                </div>

                {/* Form to append custom actions */}
                <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-2 mb-1.5">
                    <Plus className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Inject Macro Step</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-[10px] font-mono">
                    
                    {/* Action types */}
                    <div className="flex flex-col gap-1">
                      <span className="text-neutral-500 uppercase text-[9px]">Select Action</span>
                      <select
                        value={newActionType}
                        onChange={(e) => setNewActionType(e.target.value as any)}
                        className="bg-neutral-900 border border-neutral-850 rounded-lg p-2 focus:outline-none"
                      >
                        <option value="click">Mouse Click</option>
                        <option value="type">Write string</option>
                        <option value="press">Keystroke</option>
                        <option value="open">Start App</option>
                        <option value="wait">Timeout wait</option>
                        <option value="capture">OCR Scan</option>
                      </select>
                    </div>

                    {/* Parameters conditionally rendered */}
                    {newActionType === 'click' && (
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 uppercase text-[9px]">X/Y Pixel Coordinates</span>
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={newActionX}
                            onChange={(e) => setNewActionX(e.target.value)}
                            className="w-1/2 bg-neutral-900 border border-neutral-850 p-2 rounded-lg text-center"
                            placeholder="X"
                          />
                          <input
                            type="number"
                            value={newActionY}
                            onChange={(e) => setNewActionY(e.target.value)}
                            className="w-1/2 bg-neutral-900 border border-neutral-850 p-2 rounded-lg text-center"
                            placeholder="Y"
                          />
                        </div>
                      </div>
                    )}

                    {(newActionType === 'type' || newActionType === 'capture') && (
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 uppercase text-[9px]">Payload characters</span>
                        <input
                          type="text"
                          value={newActionText}
                          onChange={(e) => setNewActionText(e.target.value)}
                          className="bg-neutral-900 border border-neutral-850 p-2 rounded-lg"
                        />
                      </div>
                    )}

                    {newActionType === 'press' && (
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 uppercase text-[9px]">Key selector</span>
                        <select
                          value={newActionKey}
                          onChange={(e) => setNewActionKey(e.target.value)}
                          className="bg-neutral-900 border border-neutral-850 p-2 rounded-lg"
                        >
                          <option value="enter">Enter key</option>
                          <option value="backspace">Backspace key</option>
                          <option value="space">Space key</option>
                          <option value="tab">Tab key</option>
                        </select>
                      </div>
                    )}

                    {newActionType === 'open' && (
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 uppercase text-[9px]">OS Process path alias</span>
                        <input
                          type="text"
                          value={newActionAppName}
                          onChange={(e) => setNewActionAppName(e.target.value)}
                          className="bg-neutral-900 border border-neutral-850 p-2 rounded-lg"
                        />
                      </div>
                    )}

                    {newActionType === 'wait' && (
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 uppercase text-[9px]">MilliSeconds delay</span>
                        <input
                          type="number"
                          value={newActionDuration}
                          onChange={(e) => setNewActionDuration(e.target.value)}
                          className="bg-neutral-900 border border-neutral-850 p-2 rounded-lg"
                        />
                      </div>
                    )}

                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleAddAction}
                      className="w-full bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 font-mono font-bold text-[10px] uppercase py-2.5 rounded-lg transition cursor-pointer"
                    >
                      Append to active Workflow pipeline
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'dev_nexus' && (
            <DeveloperNexus
              workflows={workflows}
              onTriggerWorkflow={(id) => {
                const matched = workflows.find(w => w.id === id);
                if (matched) {
                  setSelectedWorkflow(matched);
                  setActiveTab('automation');
                  setTimeout(() => runWorkflowSimulation(), 300);
                }
              }}
              systemLogSetter={addSystemLog}
            />
          )}

          {activeTab === 'memory' && (
            <MemoryVault systemLogSetter={addSystemLog} />
          )}

          {activeTab === 'device' && (
            <DeviceBridge devices={adbDevices} systemLogSetter={addSystemLog} />
          )}

          {activeTab === 'council' && (
            <AgentWorkspace onAddWorkflow={handleAddNewWorkflow} systemLogSetter={addSystemLog} />
          )}

          {activeTab === 'api_center' && (
            <APICenter isLoggedIn={authSessionState === 'google'} systemLogSetter={addSystemLog} />
          )}

          {activeTab === 'settings' && (
            <SettingsPanel systemLogs={systemLogs} systemLogSetter={addSystemLog} />
          )}

        </main>

      </div>

    </div>
  );
}
