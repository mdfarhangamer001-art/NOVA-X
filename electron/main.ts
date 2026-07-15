/**
 * NOVA-X Command Suite - Electron Native Desktop Controller
 * Configures the Chromium web environment, native node modules, local update polling,
 * and security containment policies for Windows 10/11 environments.
 */

import { app, BrowserWindow, ipcMain, shell, Notification } from 'electron';
import * as path from 'path';
import { autoUpdater } from 'electron-updater';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    frame: false, // Holographic borderless design handled in React HUD
    transparent: true, // Futuristic desktop background blending
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  // Load URL or local production files
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Setup auto-updater credentials & flags
  configureUpdater();
}

function configureUpdater() {
  // Read update URL from system env variables (set in setup settings tab)
  const feedUrl = process.env.UPDATE_URL || 'https://updates.novax.ai/win64';
  
  try {
    autoUpdater.setFeedURL({
      provider: 'generic',
      url: feedUrl
    });
    
    autoUpdater.autoDownload = true;
    autoUpdater.checkForUpdatesAndNotify();
  } catch (error) {
    console.error('Updater config failed:', error);
  }
}

// ----------------------------------------------------
// IPC Event Channels (IPC Bridge Hooks)
// ----------------------------------------------------

ipcMain.handle('get-system-info', async () => {
  return {
    os: 'Windows 11 x64 Native',
    arch: process.arch,
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
    appVersion: app.getVersion()
  };
});

ipcMain.on('trigger-system-notification', (event, payload: { title: string; body: string }) => {
  new Notification({
    title: payload.title || 'NOVA-X CORE SYSTEM',
    body: payload.body,
    silent: false,
    icon: path.join(__dirname, '../public/favicon.ico')
  }).show();
});

ipcMain.handle('check-manual-updates', async () => {
  try {
    const result = await autoUpdater.checkForUpdates();
    return {
      success: true,
      updateAvailable: result ? result.updateInfo.version !== app.getVersion() : false,
      version: result ? result.updateInfo.version : app.getVersion(),
      releaseNotes: result ? result.updateInfo.releaseNotes : 'No updates found.'
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Verification timed out'
    };
  }
});

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
