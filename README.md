# NOVA-X: Core Command Desktop Station & Automated Updates Pipeline

NOVA-X is a futuristic, highly polished Windows-optimized desktop command station integrated with full-stack automation, a collaborative multi-agent AI Council, a secure API Center, and a fully automated continuous integration and auto-updater core.

Designed for **Windows 10/11**, the system blends holographic web user interfaces (React/Vite) with a native desktop shell (Electron) and low-level system automation services (FastAPI/Python).

---

## 🚀 Key Architectural Pillars

### 1. Unified Holographic Bootloader (`/src/components/HolographicStartup.tsx`)
*   **Sci-Fi Telemetry Initialization**: A high-impact loading sequence representing kernel virtualization and system checks.
*   **Console Ticker Stream**: Real-time logging of loaded components, cache maps, and private pipelines.
*   **Fast Bypass Toggles**: Immediate entry controls for fast local workspace execution.

### 2. Multi-Channel Security Gateway (`/src/components/LoginGateway.tsx`)
*   **Google OAuth Portal**: Authenticates with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
*   **AppData Registration**: Standard mapping to native Windows cache structures (`C:\Users\<USER>\AppData\Local\NOVA-X`).
*   **Durable State Merger**: Resolves differences between offline local databases and synchronized cloud layers.

### 3. Five-Agent AI Council Debate (`/src/components/AgentWorkspace.tsx`)
*   **Reasoning Orchestration**: Directs a multi-agent discussion between **Planner**, **Researcher**, **Designer**, **Coder**, and **Tester**.
*   **Direct Export Controls**: Export generated scripts straight into the automation studio workflow queue with a single click.

### 4. Secure API Center (`/src/components/APICenter.tsx`)
*   **Multi-Provider Integration**: Direct configuration profiles for OpenAI, Google Gemini, Claude, Groq, OpenRouter, and Ollama.
*   **Zero-Loss Encrypted Storage**: API keys persist across application updates in Windows AppData Local storage and sync securely to the user's Google Cloud/Firebase account when signed in.
*   **Handshake Checks**: Fully-realized testing suite containing connection test requests, credentials removal, manual editing, and instant JSON exports/imports.

### 5. Automated Updates Engine (`/electron/main.ts` & `/autoUpdater.js`)
*   **Continuous Background Checks**: Scans public GitHub Releases on application startup.
*   **Silent Background Fetching**: Automatically streams files in background threads with zero work disruption.
*   **Rebuild Prompts**: Informs the user when updates are downloaded, enabling clean hot-restarts without losing user logs or cache databases.

---

## 📁 Repository Structure

```text
├── .github/workflows/build.yml     # Automated continuous compilation & deployment
├── backend/
│   └── main.py                     # Python FastAPI local bridge server (ADB & PyAutoGUI)
├── electron/
│   └── main.ts                     # Electron Main process with custom auto-update IPCs
├── src/
│   ├── components/
│   │   ├── HolographicStartup.tsx  # Dynamic tech loading overlay
│   │   ├── LoginGateway.tsx        # Local AppData / Google Cloud Auth portal
│   │   ├── AgentWorkspace.tsx      # Live step-by-step multi-agent debate stream
│   │   ├── APICenter.tsx           # API Providers dashboard with connection testing
│   │   └── SettingsPanel.tsx       # Live Activity Telemetry and Updater panel
│   ├── App.tsx                     # Core React application entry point
│   ├── index.css                   # Global Tailwind CSS configurations
│   └── mockData.ts                 # Initial workflows, diagnostics, and tasks data
├── server.ts                       # Express.js developer asset proxy & AI endpoint
├── electron-builder.yml            # NSIS Windows packaging specifications
├── autoUpdater.js                  # Electron-updater events handler
├── package.json                    # Workspace dependencies & build instructions
└── README.md                       # Comprehensive guide (this file)
```

---

## 🛠️ Step-by-Step Setup and Deployment Guide

Follow this protocol to configure automatic builds, releases, and silent desktop updates:

### Step 1: Configure GitHub Actions Secrets
In your public GitHub repository, navigate to **Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ **Repository Secrets** and add the following keys:
1.  `GOOGLE_CLIENT_ID`: Google OAuth client ID credentials.
2.  `GOOGLE_CLIENT_SECRET`: Google OAuth client secret credentials.
3.  `FIREBASE_API_KEY`: Firebase core api secret key.
4.  `FIREBASE_AUTH_DOMAIN`: Firebase auth domain coordinate.
5.  `FIREBASE_PROJECT_ID`: Target Firebase project ID.
6.  `FIREBASE_STORAGE_BUCKET`: Firebase storage bucket coordinates.
7.  `FIREBASE_MESSAGING_SENDER_ID`: Firebase notification transmitter id.
8.  `FIREBASE_APP_ID`: Firebase specific application app ID.
9.  `UPDATE_URL`: Endpoint of the metadata and updates host.

### Step 2: The Continuous Release Pipeline (`build.yml`)
When code is pushed to the `main` branch, the GitHub Actions worker executes:
1.  **Increments Version**: Bumps the patch version inside `package.json` dynamically (e.g. `1.6.3` ➔ `1.6.4`).
2.  **Compiles Assets**: Runs the Vite production builds.
3.  **Packages Windows Binary**: Invokes `electron-builder` to bundle the app into a portable, single-click installer (`NOVA-X.exe`).
4.  **Publishes Release**: Automatically creates a GitHub Release tagged with the bumped version, uploading the installer `NOVA-X.exe`, `latest.yml`, and blockmap files.
5.  **Pushes Version Bump**: Pushes the updated `package.json` back to the `main` branch (using a `[skip ci]` token to avoid infinite loops).

### Step 3: Local Development Mode
To boot the unified React HUD developer server:
```bash
# Install NPM packages
npm install

# Start the local Express developer proxy on port 3000
npm run dev
```

To package the Windows installer locally for manual debugging:
```bash
# Compile and build production files
npm run build

# Package using electron-builder locally
npm run electron:build
```

---

## 🔐 Data Persistence & Security

NOVA-X stores and encrypts user state locally in:
`C:\Users\<USER>\AppData\Local\NOVA-X\`

All critical keys, chat histories, workflows, and memory coordinate tables are completely preserved across versions. When a user connects their Google account, data is synchronized to their profile, maintaining an isolated backup partition. No passwords or API keys are ever hardcoded or sent to external unauthorized logs.
