import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, RefreshCw, Layers, CheckCircle, Wifi, Play, Cpu, Sparkles, Battery, Eye, Target, AlertCircle } from 'lucide-react';
import { ADBDevice } from '../types';

interface DeviceBridgeProps {
  devices: ADBDevice[];
  systemLogSetter: (log: string) => void;
}

export default function DeviceBridge({
  devices,
  systemLogSetter
}: DeviceBridgeProps) {
  const [activeDevice, setActiveDevice] = useState<ADBDevice>(devices[0]);
  const [isADBPolling, setIsADBPolling] = useState(false);
  const [ocrLogs, setOcrLogs] = useState<string[]>([]);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [clickCoordinates, setClickCoordinates] = useState<{ x: number; y: number } | null>(null);

  const mockScreenshots = [
    {
      id: 'screen-1',
      title: 'Active Android Homescreen',
      desc: 'Home interface displaying main application grid, system notification drawers, and widget layouts.',
      url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="380" viewBox="0 0 220 380"><rect width="220" height="380" fill="%231a0b2e"/><g transform="translate(15, 30)"><rect width="190" height="40" rx="10" fill="%23ffffff" opacity="0.1"/><text x="15" y="24" fill="%23ffffff" font-family="sans-serif" font-size="11">Google Search...</text></g><g transform="translate(25, 100)"><rect width="36" height="36" rx="8" fill="%2310b981"/><text x="43" y="122" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">IRIS</text></g><g transform="translate(92, 100)"><rect width="36" height="36" rx="8" fill="%233b82f6"/><text x="110" y="122" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">Chat</text></g><g transform="translate(158, 100)"><rect width="36" height="36" rx="8" fill="%23eab308"/><text x="176" y="122" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">Maps</text></g><g transform="translate(25, 170)"><rect width="36" height="36" rx="8" fill="%23ec4899"/><text x="43" y="192" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">Files</text></g><g transform="translate(92, 170)"><rect width="36" height="36" rx="8" fill="%23f97316"/><text x="110" y="192" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">Logs</text></g><g transform="translate(158, 170)"><rect width="36" height="36" rx="8" fill="%238b5cf6"/><text x="176" y="192" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">Vault</text></g><g transform="translate(15, 270)"><rect width="190" height="90" rx="12" fill="%23ffffff" opacity="0.05"/><text x="15" y="24" fill="%2310b981" font-family="sans-serif" font-weight="bold" font-size="10">IRIS ADB LINK</text><text x="15" y="44" fill="%239ca3af" font-family="sans-serif" font-size="9">Channel: SECURED (USB)</text><text x="15" y="64" fill="%23ffffff" font-family="monospace" font-size="11">05:30 UTC | Battery 88%</text></g></svg>`
    },
    {
      id: 'screen-2',
      title: 'IRIS Mobile Terminal App',
      desc: 'Active low-level terminal console rendering live remote server connection logs on screen.',
      url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="380" viewBox="0 0 220 380"><rect width="220" height="380" fill="%23050505"/><g transform="translate(15, 20)"><rect width="190" height="340" rx="8" fill="%230f172a" stroke="%2310b981" stroke-opacity="0.2"/><text x="10" y="25" fill="%2310b981" font-family="monospace" font-weight="bold" font-size="9">IRIS MOBILE V-SHELL</text><text x="10" y="50" fill="%239ca3af" font-family="monospace" font-size="8">&gt; adb disconnect</text><text x="10" y="65" fill="%2310b981" font-family="monospace" font-size="8">&gt; adb connect localhost:5037</text><text x="10" y="80" fill="%23ffffff" font-family="monospace" font-size="8">Status: HANDSHAKE OK</text><text x="10" y="105" fill="%23eab308" font-family="monospace" font-size="8">WARNING: Key hooks authorized</text><text x="10" y="130" fill="%2310b981" font-family="monospace" font-size="8">Virtualizing container...</text></g></svg>`
    }
  ];

  const handlePollADBDevices = () => {
    setIsADBPolling(true);
    systemLogSetter(`Polling low-level Windows ADB ports for connected USB bridges.`);

    setTimeout(() => {
      setIsADBPolling(false);
      systemLogSetter(`ADB poll completed successfully. Handshake verified for Google Pixel 8 Pro.`);
    }, 900);
  };

  const handleDeviceChange = (dev: ADBDevice) => {
    setActiveDevice(dev);
    systemLogSetter(`Device focus switched to: ${dev.model}`);
  };

  const handleScreenshotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    
    // Scale coordinates to match virtual coordinates (220 width, 380 height)
    const scaledX = Math.round((x / rect.width) * 220);
    const scaledY = Math.round((y / rect.height) * 380);

    setClickCoordinates({ x: scaledX, y: scaledY });
    systemLogSetter(`MOBILE CLICK: Captured client touch handshake coordinate at (X: ${scaledX}, Y: ${scaledY}).`);
    
    // Auto simulate sending a click action to the ADB bridge
    setOcrLogs(prev => [
      `[ADB BRIDGE] DISPATCH CLICK: input tap ${scaledX} ${scaledY}`,
      ...prev
    ]);
  };

  const triggerScreenshotAnalysis = () => {
    systemLogSetter(`Initializing smart vision analysis on screen ID "${mockScreenshots[activeScreenIndex].id}"`);
    setOcrLogs(prev => [
      `[VISION-OCR] Matches 3 interaction nodes: Home search, IRIS app grid, battery capsule.`,
      `[VISION-OCR] Text detected on screen: "Google Search", "IRIS", "Maps", "ADB LINK"`,
      `[VISION-OCR] Handshaking done. Proximity: 100% OK.`,
      ...prev
    ]);
  };

  return (
    <div id="device-bridge-container" className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full p-5 overflow-y-auto bg-black text-neutral-300">
      
      {/* LEFT COLUMN: Active USB Devices List & Configs (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-4 bg-neutral-950/60 border border-emerald-500/10 rounded-2xl p-5 justify-between">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-neutral-200">Android USB ADB Bridges</span>
            </div>
            <button
              onClick={handlePollADBDevices}
              disabled={isADBPolling}
              className="p-1 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
              title="Refresh ADB Port Lists"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isADBPolling ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
            Configure ADB local loopbacks, verify device certificates, and trigger mobile macro commands via terminal command lines.
          </p>

          {/* Connected list */}
          <div className="space-y-2.5">
            {devices.map((dev) => {
              const isSelected = activeDevice.id === dev.id;
              return (
                <div
                  key={dev.id}
                  onClick={() => handleDeviceChange(dev)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/10 border-emerald-500/35 shadow-sm'
                      : 'bg-neutral-900/30 border-neutral-900 hover:border-emerald-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-neutral-200">{dev.model}</span>
                        <span className={`text-[7px] font-mono font-bold uppercase px-1 rounded-full ${
                          dev.type === 'usb' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10' : 'bg-sky-950 text-sky-400 border border-sky-500/10'
                        }`}>
                          {dev.type}
                        </span>
                      </div>
                      <p className="text-[9px] font-mono text-neutral-500">ID: {dev.id} | OS: {dev.os}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[9px] font-mono font-bold text-neutral-400">{dev.battery}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active stats details */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-mono">
            <div className="bg-[#070707] p-2.5 rounded-xl border border-neutral-900 space-y-1">
              <span className="text-[8px] text-neutral-500 uppercase block">Port Gateway</span>
              <span className="text-neutral-200 font-bold">ADB Core Port 5037</span>
            </div>
            <div className="bg-[#070707] p-2.5 rounded-xl border border-neutral-900 space-y-1">
              <span className="text-[8px] text-neutral-500 uppercase block">Battery Temp</span>
              <span className="text-neutral-200 font-bold">{activeDevice.temp}</span>
            </div>
          </div>
        </div>

        {/* ADB Bridge Shell Actions Logs */}
        <div className="mt-4 pt-3 border-t border-neutral-900 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono uppercase text-neutral-500">ADB Socket Message Buffer</span>
            <button
              onClick={() => setOcrLogs([])}
              className="text-[8px] font-mono text-neutral-600 hover:text-emerald-400"
            >
              Clear Buffer
            </button>
          </div>

          <div className="bg-[#070707] border border-neutral-900 rounded-xl p-3 h-28 overflow-y-auto text-[10px] font-mono space-y-1 text-emerald-500/80 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {ocrLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-neutral-600">
                <span>ADB buffer empty. Select screenshots or click mobile screen to trigger actions...</span>
              </div>
            ) : (
              ocrLogs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap leading-tight">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Interactive Smartphone Display Mirror (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center">
        
        {/* Sleek smartphone outline */}
        <div className="bg-neutral-950 border-4 border-neutral-800 w-[240px] h-[430px] rounded-[36px] p-2.5 flex flex-col relative overflow-hidden shadow-2xl">
          
          {/* Central Camera sensor dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-black z-30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
          </div>

          {/* Floating OCR button inside mirror */}
          <button
            onClick={triggerScreenshotAnalysis}
            className="absolute bottom-5 right-5 z-30 p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg transition cursor-pointer"
            title="Scan Screen with OCR Vision"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Interactive view container */}
          <div className="flex-1 w-full bg-black rounded-[28px] overflow-hidden relative">
            <div
              id="adb-mirror-canvas"
              onClick={handleScreenshotClick}
              className="w-full h-full cursor-crosshair relative"
            >
              {/* Screenshot image content */}
              <img
                src={mockScreenshots[activeScreenIndex].url}
                alt="Simulated Android Display"
                referrerPolicy="no-referrer"
                className="w-full h-full object-fill select-none"
              />

              {/* Touch coordinates feedback marker overlay */}
              {clickCoordinates && (
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-emerald-400 bg-emerald-500/30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(clickCoordinates.x / 220) * 100}%`,
                    top: `${(clickCoordinates.y / 380) * 100}%`
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Swipe screen buttons toggles */}
        <div className="mt-3 flex gap-2">
          {mockScreenshots.map((scr, idx) => (
            <button
              key={scr.id}
              onClick={() => {
                setActiveScreenIndex(idx);
                setClickCoordinates(null);
                systemLogSetter(`Mobile viewport mirror switched to: "${scr.title}"`);
              }}
              className={`p-1.5 rounded border text-[9px] font-mono ${
                activeScreenIndex === idx ? 'bg-emerald-950 border-emerald-500/20 text-emerald-400' : 'bg-neutral-900 border-neutral-900 text-neutral-500'
              } cursor-pointer`}
            >
              SCREEN {idx + 1}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
