import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Search, Cpu, RefreshCw, Layers, HardDrive, Key, FileCode, Check, Filter } from 'lucide-react';

interface MemoryVaultProps {
  systemLogSetter: (log: string) => void;
}

interface VectorItem {
  id: number;
  text: string;
  distance: number;
  tag: 'Credential' | 'Pref' | 'ADB' | 'Workflow';
  x: number; // SVG mapping coordinates
  y: number;
}

export default function MemoryVault({
  systemLogSetter
}: MemoryVaultProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [selectedVector, setSelectedVector] = useState<VectorItem | null>(null);
  
  const initialVectors: VectorItem[] = [
    { id: 101, text: "Google Client ID OAuth configuration environment key mappings", distance: 0.12, tag: 'Credential', x: 120, y: 80 },
    { id: 102, text: "Google Client Secret security buffer tokens cached in session memory", distance: 0.08, tag: 'Credential', x: 140, y: 110 },
    { id: 204, text: "Farhan's personal desktop theme settings and layout offsets", distance: 0.22, tag: 'Pref', x: 280, y: 190 },
    { id: 301, text: "ADB daemon handshake ports listening on loopback 127.0.0.1:5037", distance: 0.15, tag: 'ADB', x: 400, y: 90 },
    { id: 302, text: "ADB wireless device IP cache matches Samsung Ultra S24", distance: 0.31, tag: 'ADB', x: 450, y: 140 },
    { id: 408, text: "Workflow execution macro pipeline definitions for downloads sorting", distance: 0.19, tag: 'Workflow', x: 210, y: 260 },
    { id: 409, text: "GitHub staging workflow triggering credentials secret variables", distance: 0.25, tag: 'Workflow', x: 180, y: 220 }
  ];

  const [vectors, setVectors] = useState<VectorItem[]>(initialVectors);
  const [isSearching, setIsSearching] = useState(false);

  // Filter vectors by search query or tag
  const filteredVectors = vectors.filter(v => {
    const matchTag = selectedTag === 'ALL' || v.tag === selectedTag;
    const matchQuery = !searchQuery.trim() || v.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchQuery;
  });

  const handleVectorSearch = () => {
    if (!searchQuery.trim()) {
      setVectors(initialVectors);
      return;
    }
    setIsSearching(true);
    systemLogSetter(`Querying SQLite vector embeddings index: "${searchQuery}"`);

    setTimeout(() => {
      // Simulate proximity distance re-ranking based on search matching
      const queryLower = searchQuery.toLowerCase();
      const updated = initialVectors.map(v => {
        const scoreMultiplier = v.text.toLowerCase().includes(queryLower) ? 0.3 : 1.5;
        const newDist = Math.max(0.01, Math.min(0.99, v.distance * scoreMultiplier));
        return { ...v, distance: parseFloat(newDist.toFixed(2)) };
      }).sort((a, b) => a.distance - b.distance);

      setVectors(updated);
      setIsSearching(false);
      systemLogSetter(`Similarity search returned ${updated.filter(u => u.distance < 0.4).length} highly relevant matches.`);
    }, 800);
  };

  const handleScatterPointClick = (v: VectorItem) => {
    setSelectedVector(v);
    systemLogSetter(`Selected vector index node ID #${v.id} for inspections.`);
  };

  return (
    <div id="memory-vault" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT COLUMN: Proximity Embeddings Map & Search Engine (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 overflow-hidden">
        
        {/* Header search controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Local Vector Index Search</span>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase">Engine: SQLite + fts5</span>
          </div>

          <div className="flex gap-2 bg-neutral-900/60 border border-neutral-850 p-1.5 rounded-xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Query semantic memory embeddings (e.g. OAuth, ADB)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVectorSearch()}
                className="flex-1 bg-transparent text-xs text-neutral-200 focus:outline-none"
              />
            </div>
            <button
              onClick={handleVectorSearch}
              className="p-1.5 px-3 rounded-lg bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              {isSearching ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Query'}
            </button>
          </div>

          {/* Quick categories tags filters */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['ALL', 'Credential', 'Pref', 'ADB', 'Workflow'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono border transition cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-emerald-950/40 border-emerald-500/35 text-emerald-400'
                    : 'bg-neutral-900/40 border-neutral-900 text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* High-Dimensional Interactive Scatter Graph */}
        <div className="flex-1 border border-neutral-900 bg-[#060606] rounded-xl p-4 min-h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
          
          <div className="absolute top-2.5 right-2.5 bg-neutral-900/80 px-2 py-0.5 rounded-full border border-neutral-800 text-[8px] font-mono text-neutral-500">
            2D K-MEANS EMBEDDINGS PROJECTION MAP
          </div>

          {/* Interactive SVG scatter canvas */}
          <div className="flex-1 w-full relative min-h-[180px]">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 320">
              
              {/* Grid Lines */}
              <line x1="300" y1="0" x2="300" y2="320" stroke="#16a34a" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
              <line x1="0" y1="160" x2="600" y2="160" stroke="#16a34a" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
              
              {/* Outer boundary circles */}
              <circle cx="300" cy="160" r="140" fill="none" stroke="#16a34a" strokeWidth="0.5" opacity="0.1" />
              <circle cx="300" cy="160" r="80" fill="none" stroke="#16a34a" strokeWidth="0.5" opacity="0.1" />

              {/* Vector indexes nodes */}
              {filteredVectors.map((v) => {
                const isSelected = selectedVector?.id === v.id;
                // Color mapping by tag
                const color = v.tag === 'Credential' ? '#f43f5e' : v.tag === 'Pref' ? '#eab308' : v.tag === 'ADB' ? '#38bdf8' : '#10b981';
                
                return (
                  <g
                    key={v.id}
                    onClick={() => handleScatterPointClick(v)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing selection circle */}
                    {isSelected && (
                      <motion.circle
                        cx={v.x}
                        cy={v.y}
                        r="16"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.5, 0.1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Hover ring */}
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r="10"
                      fill="none"
                      stroke={color}
                      strokeWidth="1.5"
                      className="opacity-0 group-hover:opacity-45 transition duration-150"
                    />

                    {/* Node Core Dot */}
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r={isSelected ? '6' : '4'}
                      fill={color}
                      className="transition-all duration-200"
                    />

                    {/* Small text tags */}
                    <text
                      x={v.x + 8}
                      y={v.y + 4}
                      fill="#9ca3af"
                      fontFamily="monospace"
                      fontSize="8"
                      className="opacity-0 group-hover:opacity-100 transition duration-150 select-none pointer-events-none"
                    >
                      ID:{v.id} (D:{v.distance})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-t border-neutral-900 pt-2">
            <span>X-AXIS: SIMILARITY THRESHOLD</span>
            <span>Y-AXIS: CLUSTERING DENSITY</span>
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: Database Metadata & Inspector Panel (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        
        {/* Node info inspector */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 flex-1 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Vector Embeddings Inspector</span>
            </div>

            <AnimatePresence mode="wait">
              {selectedVector ? (
                <motion.div
                  key={selectedVector.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                      Node ID #{selectedVector.id}
                    </span>
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      selectedVector.tag === 'Credential' ? 'border-red-500/20 text-red-400 bg-red-950/10' :
                      selectedVector.tag === 'Pref' ? 'border-yellow-500/20 text-yellow-400 bg-yellow-950/10' :
                      selectedVector.tag === 'ADB' ? 'border-sky-500/20 text-sky-400 bg-sky-950/10' :
                      'border-emerald-500/20 text-emerald-400 bg-emerald-950/10'
                    }`}>
                      {selectedVector.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase text-neutral-500">Decoded Fact Context</span>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed bg-[#060606] p-3 rounded-xl border border-neutral-900">
                      {selectedVector.text}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-mono">
                    <div className="bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-900">
                      <span className="text-[8px] text-neutral-500 uppercase block mb-0.5">Cosine Proximity</span>
                      <span className="text-emerald-400 font-bold">{selectedVector.distance} dist</span>
                    </div>
                    <div className="bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-900">
                      <span className="text-[8px] text-neutral-500 uppercase block mb-0.5">Embedding Vector</span>
                      <span className="text-neutral-400 font-bold">1536 dims</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-center p-4">
                  <Cpu className="w-8 h-8 text-neutral-800 mb-2 animate-pulse" />
                  <p className="text-xs text-neutral-600 font-mono">Click any coordinate dot on the projection map to inspect stored fact context metadata.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {selectedVector && (
            <div className="pt-4 border-t border-neutral-900 flex justify-end">
              <button
                onClick={() => setSelectedVector(null)}
                className="text-[9px] font-mono text-neutral-500 hover:text-emerald-400 transition cursor-pointer"
              >
                Wipe Selection
              </button>
            </div>
          )}

        </div>

        {/* SQLite storage directories specifications */}
        <div className="bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 border-b border-neutral-900 pb-2.5 mb-3">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Local SQLite DB Stats</span>
          </div>

          <div className="space-y-2.5 text-[10px] font-mono">
            {[
              { label: "Physical DB Path", val: "%LOCALAPPDATA%\\NOVA-X\\memory.db", icon: FileCode },
              { label: "Synchronized", val: "Ready (Active Auth synced)", icon: Check },
              { label: "Embedded Records", val: "1,482 vector clusters", icon: Layers },
              { label: "Database Size", val: "4.24 MB (Indexed cluster)", icon: HardDrive }
            ].map((d, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-[#070707] border border-neutral-900">
                <div className="flex items-center gap-2 text-neutral-500">
                  <d.icon className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{d.label}</span>
                </div>
                <span className="text-neutral-300 max-w-[180px] truncate" title={d.val}>{d.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
