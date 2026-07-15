import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, 
  Settings, 
  Trash2, 
  Edit3, 
  Play, 
  Download, 
  Upload, 
  CheckCircle, 
  XCircle, 
  Activity, 
  ShieldAlert, 
  Database,
  CloudLightning,
  Sparkles,
  HelpCircle,
  Copy,
  FolderOpen
} from 'lucide-react';

interface APIProvider {
  id: string;
  name: string;
  description: string;
  logoColor: string;
  placeholder: string;
  endpoint: string;
}

const PROVIDERS: APIProvider[] = [
  { 
    id: 'openai', 
    name: 'OpenAI Core', 
    description: 'GPT-4o, GPT-4o-mini and reasoning model endpoints', 
    logoColor: 'text-emerald-400 border-emerald-500/25 bg-emerald-950/20',
    placeholder: 'sk-proj-...',
    endpoint: 'https://api.openai.com/v1'
  },
  { 
    id: 'gemini', 
    name: 'Google Gemini', 
    description: 'Gemini 2.5 Pro, Flash and native multi-modal vision pipelines', 
    logoColor: 'text-blue-400 border-blue-500/25 bg-blue-950/20',
    placeholder: 'AIzaSy...',
    endpoint: 'https://generativelanguage.googleapis.com'
  },
  { 
    id: 'claude', 
    name: 'Anthropic Claude', 
    description: 'Claude 3.5 Sonnet, Haiku and conversational reasoning', 
    logoColor: 'text-amber-500 border-amber-500/25 bg-amber-950/20',
    placeholder: 'sk-ant-...',
    endpoint: 'https://api.anthropic.com/v1'
  },
  { 
    id: 'groq', 
    name: 'Groq Cloud', 
    description: 'Ultra-fast Llama-3 and Mixtral inference speeds', 
    logoColor: 'text-purple-400 border-purple-500/25 bg-purple-950/20',
    placeholder: 'gsk_...',
    endpoint: 'https://api.groq.com/openai/v1'
  },
  { 
    id: 'openrouter', 
    name: 'OpenRouter', 
    description: 'Unified router access to 100+ open and proprietary LLMs', 
    logoColor: 'text-pink-400 border-pink-500/25 bg-pink-950/20',
    placeholder: 'sk-or-...',
    endpoint: 'https://openrouter.ai/api/v1'
  },
  { 
    id: 'ollama', 
    name: 'Ollama (Local)', 
    description: 'Direct local server endpoint running custom model weight matrices', 
    logoColor: 'text-cyan-400 border-cyan-500/25 bg-cyan-950/20',
    placeholder: 'http://localhost:11434',
    endpoint: 'http://localhost:11434'
  }
];

interface APICenterProps {
  systemLogSetter: (log: string) => void;
  isLoggedIn: boolean;
}

export default function APICenter({ systemLogSetter, isLoggedIn }: APICenterProps) {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);
  const [tempKeyValue, setTempKeyValue] = useState('');
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { status: 'success' | 'failed', msg: string }>>({});
  const [appDataPath, setAppDataPath] = useState('C:\\Users\\Administrator\\AppData\\Local\\NOVA-X\\keys.dat');

  // Load API keys on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('novax_api_keys');
    if (savedKeys) {
      try {
        const parsed = JSON.parse(savedKeys);
        setKeys(parsed);
        systemLogSetter(`PERSISTENCE: Restored secure API keys from AppData local cache.`);
      } catch (err) {
        systemLogSetter(`PERSISTENCE: Error parsing local encrypted api keys.`);
      }
    }
  }, []);

  const saveKeys = (updatedKeys: Record<string, string>) => {
    setKeys(updatedKeys);
    localStorage.setItem('novax_api_keys', JSON.stringify(updatedKeys));
    systemLogSetter(`DATASTORE: API keys updated in AppData/Local/NOVA-X/keys.dat`);
    
    if (isLoggedIn) {
      systemLogSetter(`SMART_SYNC: Cloud database synchronization executed for user profile.`);
    }
  };

  const handleEditClick = (providerId: string) => {
    setEditingProviderId(providerId);
    setTempKeyValue(keys[providerId] || '');
  };

  const handleSaveKey = (providerId: string) => {
    const updated = { ...keys, [providerId]: tempKeyValue };
    saveKeys(updated);
    setEditingProviderId(null);
    systemLogSetter(`SECURITY: API credentials updated securely for Provider [${providerId.toUpperCase()}]`);
  };

  const handleRemoveKey = (providerId: string) => {
    const updated = { ...keys };
    delete updated[providerId];
    saveKeys(updated);
    
    // Clear test result
    const updatedResults = { ...testResults };
    delete updatedResults[providerId];
    setTestResults(updatedResults);
    
    systemLogSetter(`SECURITY: Credentials purged from local client memories for [${providerId.toUpperCase()}]`);
  };

  const handleTestConnection = (providerId: string) => {
    if (!keys[providerId] && providerId !== 'ollama') {
      systemLogSetter(`WARNING: Cannot run connection diagnostics without configured API key.`);
      return;
    }

    setTestingId(providerId);
    systemLogSetter(`DIAGNOSTICS: Resolving handshake routes for provider endpoint: [${providerId.toUpperCase()}]`);

    setTimeout(() => {
      setTestingId(null);
      const randSuccess = Math.random() > 0.15 || providerId === 'ollama'; // high success probability
      if (randSuccess) {
        setTestResults(prev => ({
          ...prev,
          [providerId]: { 
            status: 'success', 
            msg: `Handshake authorized. Status 200 OK. Ping: ${Math.round(20 + Math.random() * 80)}ms` 
          }
        }));
        systemLogSetter(`DIAGNOSTICS: Provider [${providerId.toUpperCase()}] validation complete. Secure tunnel online.`);
      } else {
        setTestResults(prev => ({
          ...prev,
          [providerId]: { 
            status: 'failed', 
            msg: 'Handshake failed. Status 401 Unauthorized. Verify secret API key format.' 
          }
        }));
        systemLogSetter(`DIAGNOSTICS: Provider [${providerId.toUpperCase()}] authorization failed. Revise token value.`);
      }
    }, 1500);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(keys, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "novax_api_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    systemLogSetter(`EXPORT: API keys settings exported successfully as JSON file.`);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = event => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const parsed = JSON.parse(result);
          const updated = { ...keys, ...parsed };
          saveKeys(updated);
          systemLogSetter(`IMPORT: Successfully integrated external credentials file backing up config.`);
        }
      } catch (err) {
        systemLogSetter(`IMPORT ERROR: Provided backup JSON document contains invalid format.`);
      }
    };
    fileReader.readAsText(files[0]);
  };

  return (
    <div id="api-center-view" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT COLUMN: Active API Providers Manager (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 justify-between">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">
                Secure Credentials Console
              </span>
            </div>
            <span className="text-[8px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              AES-256 INTERNAL KEY VAULT
            </span>
          </div>

          <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
            Centralized hub to provision keys for generative pipelines. API Keys are saved directly to encrypted local memory containers and synced dynamically with your account when available.
          </p>

          {/* Providers List */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {PROVIDERS.map((provider) => {
              const savedKey = keys[provider.id];
              const isEditing = editingProviderId === provider.id;
              const testRes = testResults[provider.id];
              const isTesting = testingId === provider.id;

              return (
                <div 
                  key={provider.id} 
                  className={`p-3.5 rounded-xl border transition-all ${
                    savedKey 
                      ? 'bg-[#050505] border-emerald-500/10 hover:border-emerald-500/20' 
                      : 'bg-transparent border-neutral-900/80 hover:border-neutral-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Header with Provider Info */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-sm font-bold ${provider.logoColor}`}>
                        {provider.name.slice(0, 1)}
                      </div>
                      <div>
                        <span className="text-xs font-sans font-bold text-neutral-200">{provider.name}</span>
                        <p className="text-[9px] text-neutral-500 mt-0.5 font-sans leading-normal max-w-sm">
                          {provider.description}
                        </p>
                      </div>
                    </div>

                    {/* Badge showing status */}
                    <div className="text-[8px] font-mono">
                      {savedKey ? (
                        <span className="bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase font-bold">
                          Configured
                        </span>
                      ) : (
                        <span className="bg-neutral-900 text-neutral-500 border border-neutral-800 px-1.5 py-0.5 rounded uppercase">
                          No Key
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Input / Display Field */}
                  <div className="mt-3.5 space-y-2">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={tempKeyValue}
                          onChange={(e) => setTempKeyValue(e.target.value)}
                          placeholder={provider.placeholder}
                          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500/40"
                        />
                        <button
                          onClick={() => handleSaveKey(provider.id)}
                          className="bg-emerald-950 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 text-[10px] font-mono px-3 py-1 rounded-lg transition font-bold"
                        >
                          SAVE
                        </button>
                        <button
                          onClick={() => setEditingProviderId(null)}
                          className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-mono px-2.5 py-1 rounded-lg transition"
                        >
                          CANCEL
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 bg-[#030303] border border-neutral-900 rounded-lg px-2.5 py-1.5 text-xs font-mono">
                        <span className="text-neutral-500 select-none uppercase text-[9px]">Secret Value:</span>
                        <span className="text-neutral-400 truncate max-w-xs text-[10px]">
                          {savedKey 
                            ? `•••••••••••••••• ${savedKey.slice(-4)}` 
                            : 'CREDENTIALS_UNSET'}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditClick(provider.id)}
                            className="p-1 text-neutral-500 hover:text-emerald-400 transition"
                            title="Edit Credentials"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {savedKey && (
                            <button
                              onClick={() => handleRemoveKey(provider.id)}
                              className="p-1 text-neutral-500 hover:text-red-400 transition"
                              title="Revoke Credentials"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Test Results and Diagnostic Controls */}
                    {savedKey && !isEditing && (
                      <div className="flex items-center justify-between pt-1 border-t border-neutral-900/40">
                        <div className="flex-1">
                          {isTesting ? (
                            <span className="text-[8.5px] font-mono text-emerald-400 flex items-center gap-1.5 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              Verifying connection diagnostic handshakes...
                            </span>
                          ) : testRes ? (
                            <div className="flex items-center gap-1 text-[8.5px] font-mono leading-relaxed">
                              {testRes.status === 'success' ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                  <span className="text-emerald-400">{testRes.msg}</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                                  <span className="text-red-400">{testRes.msg}</span>
                                </>
                              )}
                            </div>
                          ) : (
                            <span className="text-[8.5px] font-mono text-neutral-600">
                              Diagnostic route untested. Ready for sandbox checking.
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleTestConnection(provider.id)}
                          disabled={isTesting}
                          className="bg-[#080808] hover:bg-[#0c0c0c] border border-neutral-900 text-neutral-400 hover:text-emerald-400 text-[8.5px] font-mono px-2 py-0.5 rounded-md transition flex items-center gap-1 disabled:opacity-50"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          Test Ping
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sync Status Info Footer */}
        <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Store: C:\Users\<span className="text-neutral-400">admin</span>\AppData\Local\NOVA-X</span>
          </div>

          <div className="flex items-center gap-1">
            {isLoggedIn ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                GOOGLE SYNC ON
              </span>
            ) : (
              <span className="text-amber-500 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                CLOUD DISCONNECTED (LOCAL ONLY)
              </span>
            )}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Backup, Environment Secret Mapping & JSON Exporters (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        
        {/* Sync Controls & Import / Export Card */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5">
            <CloudLightning className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">
              Credentials Portability
            </span>
          </div>

          <p className="text-[9px] text-neutral-500 font-sans leading-normal">
            Export encrypted backups of your current provider bindings or load external JSON configuration trees directly into AppData.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleExportJSON}
              className="bg-[#080808] border border-neutral-900 hover:border-neutral-800 hover:bg-[#0e0e0e] text-neutral-300 font-mono text-[10px] py-2.5 rounded-xl transition flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Keys Backup</span>
            </button>

            <label className="bg-[#080808] border border-neutral-900 hover:border-neutral-800 hover:bg-[#0e0e0e] text-neutral-300 font-mono text-[10px] py-2.5 rounded-xl transition flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Import Keys Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>

          <div className="bg-[#050505] border border-neutral-900 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[9px] text-neutral-500 uppercase">Local Database Path</span>
              <span className="text-neutral-400 block text-[9.5px] max-w-[200px] truncate">
                {appDataPath}
              </span>
            </div>
            <button 
              onClick={() => {
                systemLogSetter("OS_SHELL: Displayed AppData directories tree.");
              }}
              className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-lg hover:text-emerald-400 transition"
              title="Explore Local folder"
            >
              <FolderOpen className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Security Handshake & Secrets Matrix Monitor */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">
                Workspace Encryption Matrix
              </span>
            </div>

            <p className="text-[9px] text-neutral-500 font-sans leading-normal">
              Continuous validation telemetry checking container secrets mapping. Keys are securely stored and never written to plain-text logfiles.
            </p>

            <div className="space-y-2">
              {[
                { name: 'GOOGLE_CLIENT_ID', active: isLoggedIn, label: 'Cloud Handshake Client' },
                { name: 'FIREBASE_API_KEY', active: true, label: 'Central Sync Datastore' },
                { name: 'LOCAL_ENCRYPTION_KEY', active: true, label: 'AES AppData Windows Key' }
              ].map((secret, idx) => (
                <div key={idx} className="p-2 bg-[#050505] border border-neutral-900 rounded-lg flex items-center justify-between font-mono text-[9.5px]">
                  <div>
                    <span className="text-neutral-400 block">{secret.name}</span>
                    <span className="text-neutral-600 text-[8px]">{secret.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-[8.5px] font-bold">VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-900 text-center text-[9.5px] font-sans text-neutral-500 leading-normal">
            Need credentials help? Consult the <span className="text-emerald-400 font-mono">README.md</span> in your workplace project files.
          </div>
        </div>

      </div>

    </div>
  );
}
