# NOVA-X: Core Command Desktop Station

NOVA-X is a futuristic, highly polished Windows-optimized desktop command station integrated with full-stack automation, a collaborative multi-agent AI Council, and offline-first cache folder management. 

Designed for **Windows 10/11**, the system blends holographic web user interfaces (React/Vite) with a native desktop shell (Electron) and low-level system automation services (FastAPI/Python).

---

## 🚀 Key Architectural Pillars

### 1. Unified Holographic Bootloader (`/src/components/HolographicStartup.tsx`)
*   **Sci-Fi Telemetry Initialization**: A high-impact loading sequence representing kernel virtualization and system checks.
*   **Console Ticker Stream**: Real-time logging of loaded components, cache maps, and private pipelines.
*   **Fast Bypass Toggles**: Immediate entry controls for fast local workspace execution.

### 2. Multi-Channel Security Gateway (`/src/components/LoginGateway.tsx`)
*   **Google OAuth Portal**: Simulated cloud credentials sync pipeline.
*   **AppData Registration**: Standard mapping to native Windows cache structures (`C:\Users\<USER>\AppData\Local\NOVA-X`).
*   **Durable State Merger**: Resolves differences between offline local databases and synchronized cloud layers seamlessly.

### 3. Five-Agent AI Council Debate (`/src/components/AICouncilMode.tsx`)
*   **Reasoning Orchestration**: Directs a multi-agent discussion between:
    *   **Planner** (Architectural workflows)
    *   **Researcher** (Windows constraints/APIs)
    *   **Designer** (HUD UX/UI structures)
    *   **Coder** (Generates executable automation scripts)
    *   **Tester** (Validates safety parameters and access permissions)
*   **Direct Export Controls**: Export generated scripts straight into the automation studio workflow queue with a single click.

### 4. Smart Local-Cloud Sync Engine (`/src/components/SmartSyncSystem.tsx`)
*   **Interactive Flow Diagram**: Visualizes the active connection state (Station ➔ AppData Cache ➔ Google Firestore Database).
*   **Active Directory Explorer**: Interactive file tree viewer showing paths, sizes, and raw schema layouts for `memory.db` and state configuration files.
*   **Automated Backup Vault**: Instant compression, backup, and sync protocols to save and download snapshots with zero data loss.

---

## 📁 Repository Structure

```text
├── .github/workflows/build.yml     # Automated multi-platform GitHub CI Pipeline
├── backend/
│   └── main.py                     # Python FastAPI local bridge server (ADB & PyAutoGUI)
├── electron/
│   └── main.ts                     # Electron Main process with custom auto-update IPCs
├── src/
│   ├── components/
│   │   ├── HolographicStartup.tsx  # Dynamic tech loading overlay
│   │   ├── LoginGateway.tsx        # Local AppData / Google Cloud Auth portal
│   │   ├── AICouncilMode.tsx       # Live step-by-step multi-agent debate stream
│   │   └── SmartSyncSystem.tsx     # Active Cache folder explorer and ZIP packager
│   ├── App.tsx                     # Core React application entry point
│   ├── index.css                   # Global Tailwind CSS configurations
│   └── mockData.ts                 # Initial workflows, diagnostics, and tasks data
├── server.ts                       # Express.js developer asset proxy & AI endpoint
├── electron-builder.yml            # NSIS Windows packaging specifications
├── package.json                    # Workspace dependencies & build instructions
└── README.md                       # Comprehensive guide (this file)
```

---

## 💻 Technical Setup and Installation

### 1. Local Development Mode
To boot the unified React HUD server:
```bash
# Install NPM packages
npm install

# Start the local Express developer proxy on port 3000
npm run dev
```

To run the native Python FastAPI automation bridge:
```bash
# Install Python dependencies
pip install fastapi uvicorn pydantic

# Launch the daemon
python backend/main.py
```

### 2. Packaging the Windows Installer (`.exe`)
The project utilizes `electron-builder` and `nsis` scripts to build standard, signable executable installer files for Windows:
```bash
# Build Vite production assets
npm run build

# Compile Electron entry scripts
npx tsc electron/main.ts --outDir dist/electron

# Bundle the final installer using electron-builder
npx electron-builder --windows
```

The completed, installable `.exe` file will be deposited in the `/release` directory.

---

## 🔐 Environment and Security Keys
Define the following environment configurations in your production secrets manager:
*   `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Powers cloud profiles.
*   `FIREBASE_API_KEY`: Syncs SQLite vector indices to remote databases.
*   `UPDATE_URL`: Points to the automated backend server hosting latest version changelogs.
