export interface WorkflowAction {
  id: string;
  type: 'click' | 'type' | 'wait' | 'press' | 'open' | 'capture';
  params: {
    x?: number;
    y?: number;
    text?: string;
    key?: string;
    appName?: string;
    duration?: number;
  };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: 'Automation' | 'DevOps' | 'Mobile' | 'System';
  actions: WorkflowAction[];
}

export interface ADBDevice {
  id: string;
  model: string;
  status: 'connected' | 'unauthorized' | 'disconnected';
  type: 'usb' | 'wifi';
  battery: number;
  temp: string;
  os: string;
}

export const PRESET_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Auto-Organize Downloads Folder',
    description: 'Scans the Downloads folder and groups files into Documents, Images, and Installers.',
    category: 'System',
    actions: [
      { id: 'a1', type: 'open', params: { appName: 'PowerShell' } },
      { id: 'a2', type: 'type', params: { text: 'cd $HOME\\Downloads' } },
      { id: 'a3', type: 'press', params: { key: 'enter' } },
      { id: 'a4', type: 'type', params: { text: 'mkdir Documents, Images, Installers -ErrorAction SilentlyContinue' } },
      { id: 'a5', type: 'press', params: { key: 'enter' } },
      { id: 'a6', type: 'type', params: { text: 'Move-Item *.pdf, *.docx Documents\\; Move-Item *.png, *.jpg Images\\; Move-Item *.exe, *.msi Installers\\' } },
      { id: 'a7', type: 'press', params: { key: 'enter' } },
      { id: 'a8', type: 'wait', params: { duration: 1500 } },
      { id: 'a9', type: 'capture', params: { text: 'Organized folders screenshot' } }
    ]
  },
  {
    id: 'wf-2',
    name: 'GitHub Staging & Auto-Release',
    description: 'Builds current React assets, commits all edits, pushes, and triggers a new draft release.',
    category: 'DevOps',
    actions: [
      { id: 'b1', type: 'open', params: { appName: 'VS Code Terminal' } },
      { id: 'b2', type: 'type', params: { text: 'npm run build' } },
      { id: 'b3', type: 'press', params: { key: 'enter' } },
      { id: 'b4', type: 'wait', params: { duration: 3000 } },
      { id: 'b5', type: 'type', params: { text: 'git add . && git commit -m "feat: stable release build v2.4.0"' } },
      { id: 'b6', type: 'press', params: { key: 'enter' } },
      { id: 'b7', type: 'type', params: { text: 'git push origin main' } },
      { id: 'b8', type: 'press', params: { key: 'enter' } },
      { id: 'b9', type: 'wait', params: { duration: 2000 } }
    ]
  },
  {
    id: 'wf-3',
    name: 'Mobile App USB Sync & Launch',
    description: 'Connects to Android device over ADB, uninstalls debug version, installs new build, and starts activity.',
    category: 'Mobile',
    actions: [
      { id: 'c1', type: 'open', params: { appName: 'ADB Core Bridge' } },
      { id: 'c2', type: 'type', params: { text: 'adb devices' } },
      { id: 'c3', type: 'press', params: { key: 'enter' } },
      { id: 'c4', type: 'wait', params: { duration: 1000 } },
      { id: 'c5', type: 'type', params: { text: 'adb install -r build/outputs/apk/debug/app-debug.apk' } },
      { id: 'c6', type: 'press', params: { key: 'enter' } },
      { id: 'c7', type: 'wait', params: { duration: 4000 } },
      { id: 'c8', type: 'type', params: { text: 'adb shell am start -n com.novax.app/.MainActivity' } },
      { id: 'c9', type: 'press', params: { key: 'enter' } }
    ]
  }
];

export const MOCK_ADB_DEVICES: ADBDevice[] = [
  {
    id: 'dev-9883921af7',
    model: 'Google Pixel 8 Pro',
    status: 'connected',
    type: 'usb',
    battery: 88,
    temp: '34.2 °C',
    os: 'Android 14 (API 34)'
  },
  {
    id: 'dev-192.168.1.155:5555',
    model: 'Samsung Galaxy S24 Ultra',
    status: 'connected',
    type: 'wifi',
    battery: 94,
    temp: '32.1 °C',
    os: 'Android 14 (API 34)'
  }
];

export const SAMPLE_OCR_SCREENS = [
  {
    id: 'scr-desktop',
    name: 'Windows 11 Desktop',
    category: 'Desktop',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%231e1b4b"/><g transform="translate(30, 30)"><rect width="180" height="80" rx="6" fill="%23111827" stroke="%2338bdf8" stroke-width="1.5"/><text x="15" y="30" fill="%23f3f4f6" font-family="monospace" font-size="12">VS Code</text><rect x="15" y="45" width="150" height="18" rx="3" fill="%231f2937"/><text x="22" y="58" fill="%239ca3af" font-family="monospace" font-size="10">Double click to start</text></g><g transform="translate(240, 30)"><rect width="180" height="80" rx="6" fill="%23111827" stroke="%23f43f5e" stroke-width="1.5"/><text x="15" y="30" fill="%23f3f4f6" font-family="monospace" font-size="12">NOVA-X.exe</text><rect x="15" y="45" width="150" height="18" rx="3" fill="%231f2937"/><text x="22" y="58" fill="%239ca3af" font-family="monospace" font-size="10">Active AI Shell</text></g><g transform="translate(30, 140)"><rect width="180" height="80" rx="6" fill="%23111827" stroke="%2310b981" stroke-width="1.5"/><text x="15" y="30" fill="%23f3f4f6" font-family="monospace" font-size="12">Google Chrome</text><rect x="15" y="45" width="150" height="18" rx="3" fill="%231f2937"/><text x="22" y="58" fill="%239ca3af" font-family="monospace" font-size="10">Browser automation</text></g><g transform="translate(0, 410)"><rect width="800" height="40" fill="%230f172a" opacity="0.95"/><circle cx="400" cy="20" r="12" fill="%2338bdf8"/><rect x="20" y="10" width="80" height="20" rx="3" fill="%231e293b" stroke="%2338bdf8" stroke-width="1"/><text x="32" y="24" fill="%2338bdf8" font-family="sans-serif" font-weight="bold" font-size="10">START</text><rect x="110" y="8" width="140" height="24" rx="4" fill="%231e293b"/><text x="120" y="24" fill="%239ca3af" font-family="monospace" font-size="10">Search apps...</text><rect x="710" y="10" width="70" height="20" rx="3" fill="%231e293b"/><text x="720" y="24" fill="%2338bdf8" font-family="monospace" font-weight="bold" font-size="10">05:30 UTC</text></g></svg>`,
    query: 'Analyze this Windows 11 desktop screenshot. Locate the interactive icons (VS Code, NOVA-X, Google Chrome) and the Start button. Return their relative coordinate pairs (X, Y) on an 800x450 canvas.'
  },
  {
    id: 'scr-editor',
    name: 'VS Code IDE Screen',
    category: 'IDE',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%231e1e1e"/><rect width="50" height="450" fill="%23252526"/><rect x="50" y="0" width="200" height="450" fill="%232d2d2d"/><rect x="250" y="0" width="550" height="450" fill="%231e1e1e"/><text x="65" y="30" fill="%23ffffff" font-family="monospace" font-size="12" font-weight="bold">EXPLORER</text><text x="80" y="60" fill="%23858585" font-family="monospace" font-size="11">src/</text><text x="95" y="80" fill="%23c5c5c5" font-family="monospace" font-size="11"> App.tsx</text><text x="95" y="100" fill="%23c5c5c5" font-family="monospace" font-size="11"> index.css</text><text x="95" y="120" fill="%23c5c5c5" font-family="monospace" font-size="11" font-weight="bold" stroke="%2338bdf8" stroke-width="0.3"> server.ts</text><text x="270" y="35" fill="%236a9955" font-family="monospace" font-size="12">// NOVA-X Automated Script</text><text x="270" y="60" fill="%23569cd6" font-family="monospace" font-size="12">import</text><text x="325" y="60" fill="%239cdcfe" font-family="monospace" font-size="12">pyautogui</text><text x="270" y="85" fill="%23569cd6" font-family="monospace" font-size="12">import</text><text x="325" y="85" fill="%239cdcfe" font-family="monospace" font-size="12">time</text><text x="270" y="120" fill="%23dcdcaa" font-family="monospace" font-size="12">def</text><text x="300" y="120" fill="%23dcdcaa" font-family="monospace" font-size="12">automate_dashboard</text><text x="440" y="120" fill="%23ffffff" font-family="monospace" font-size="12">():</text><text x="300" y="145" fill="%234ec9b0" font-family="monospace" font-size="12">    pyautogui.moveTo</text><text x="430" y="145" fill="%23b5cea8" font-family="monospace" font-size="12">(500, 200, duration=1.0)</text><text x="300" y="170" fill="%234ec9b0" font-family="monospace" font-size="12">    pyautogui.click</text><text x="415" y="170" fill="%23ffffff" font-family="monospace" font-size="12">()</text><circle cx="20" cy="30" r="10" fill="%2338bdf8" opacity="0.3"/><circle cx="20" cy="65" r="10" fill="%23ffffff" opacity="0.1"/><circle cx="20" cy="100" r="10" fill="%23ffffff" opacity="0.1"/><circle cx="20" cy="135" r="10" fill="%23ffffff" opacity="0.1"/></svg>`,
    query: 'Analyze this VS Code screenshot. Identify the files in the left sidebar explorer list and the structure of the active python code. What action coordinates are referenced in the script?'
  },
  {
    id: 'scr-mobile',
    name: 'Android Mobile App Sync',
    category: 'Mobile',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%2312131a"/><g transform="translate(280, 20)"><rect width="240" height="410" rx="30" fill="%23000000" stroke="%234b5563" stroke-width="4"/><rect x="10" y="10" width="220" height="390" rx="20" fill="%231e293b"/><circle cx="120" cy="20" r="5" fill="%23000000"/><rect x="25" y="45" width="190" height="310" rx="10" fill="%230f172a"/><text x="120" y="100" fill="%2338bdf8" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">NOVA-X</text><text x="120" y="125" fill="%2310b981" font-family="sans-serif" font-size="12" text-anchor="middle">USB-ADB Connected</text><circle cx="120" cy="210" r="45" fill="none" stroke="%2338bdf8" stroke-dasharray="8 4" stroke-width="2"/><text x="120" y="215" fill="%23ffffff" font-family="sans-serif" font-size="11" text-anchor="middle">SYNC ACTIVE</text><rect x="40" y="295" width="140" height="35" rx="5" fill="%2310b981"/><text x="120" y="317" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">INITIALIZE SHELL</text></g><line x1="50" y1="225" x2="280" y2="225" stroke="%2310b981" stroke-width="2" stroke-dasharray="5 5"/><line x1="520" y1="225" x2="750" y2="225" stroke="%2310b981" stroke-width="2" stroke-dasharray="5 5"/><g transform="translate(30, 180)"><rect width="200" height="90" rx="10" fill="%23111827" stroke="%2310b981" stroke-width="1"/><text x="15" y="25" fill="%2310b981" font-family="monospace" font-size="11">HOST MACHINE (WIN-11)</text><text x="15" y="45" fill="%23ffffff" font-family="monospace" font-size="10">Active Port: ADB 5037</text><text x="15" y="65" fill="%239ca3af" font-family="monospace" font-size="10">Status: Listening...</text></g><g transform="translate(570, 180)"><rect width="200" height="90" rx="10" fill="%23111827" stroke="%2338bdf8" stroke-width="1"/><text x="15" y="25" fill="%2338bdf8" font-family="monospace" font-size="11">TARGET DEVICE (PIXEL-8)</text><text x="15" y="45" fill="%23ffffff" font-family="monospace" font-size="10">Battery: 88% | Temp: 34C</text><text x="15" y="65" fill="%239ca3af" font-family="monospace" font-size="10">OS: API 34 (Android 14)</text></g></svg>`,
    query: 'Analyze this ADB USB connection setup screen. Highlight the status of the connection, battery temperature, host machine specifications, and target device configuration.'
  }
];
