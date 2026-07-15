/**
 * NOVA-X Core Auto-Updater Subsystem
 * Leverages electron-updater to execute silent background checks, checksum verification,
 * and seamless hot-reloads of native Windows desktop builds.
 */

const { autoUpdater } = require('electron-updater');
const { ipcMain, dialog } = require('electron');

function initializeAutoUpdater(mainWindow) {
  // Config logs
  autoUpdater.logger = console;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  // Signal status to React Frontend through preload bridge
  const sendStatusToWindow = (channel, text, extra = {}) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('updater-event', { channel, text, ...extra });
    }
  };

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('checking', 'Contacting update server for manifest handshakes...');
  });

  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('update-available', `Found release v${info.version}`, {
      version: info.version,
      releaseNotes: info.releaseNotes,
      releaseDate: info.releaseDate
    });
  });

  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('up-to-date', 'NOVA-X is running the latest stable firmware.');
  });

  autoUpdater.on('error', (err) => {
    sendStatusToWindow('error', `Security handshake failed: ${err.message}`);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = `Speed: ${Math.round(progressObj.bytesPerSecond / 1024)} KB/s`;
    logMessage += ` | Downloaded ${Math.round(progressObj.percent)}%`;
    sendStatusToWindow('downloading', logMessage, {
      percent: progressObj.percent,
      bytesPerSecond: progressObj.bytesPerSecond,
      totalBytes: progressObj.total
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('update-downloaded', `Release v${info.version} downloaded successfully. Core ready to rebuild.`, {
      version: info.version
    });

    // Option to prompt user for restart or let them choose "Update Now" in settings
    ipcMain.handle('quit-and-install-now', () => {
      autoUpdater.quitAndInstall();
      return { success: true };
    });
  });

  // Handle frontend manual check requests
  ipcMain.handle('check-for-updates-manual', async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      return {
        success: true,
        updateAvailable: result ? result.updateInfo.version !== autoUpdater.currentVersion.version : false,
        version: result ? result.updateInfo.version : autoUpdater.currentVersion.version
      };
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  });

  // Start polling
  autoUpdater.checkForUpdatesAndNotify();
}

module.exports = {
  initializeAutoUpdater
};
