import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  triggerNotification: (payload: { title: string; body: string }) => 
    ipcRenderer.send('trigger-system-notification', payload),
  checkManualUpdates: () => ipcRenderer.invoke('check-manual-updates'),
  quitAndInstallNow: () => ipcRenderer.invoke('quit-and-install-now'),
  checkForUpdatesManual: () => ipcRenderer.invoke('check-for-updates-manual'),
  onUpdaterEvent: (callback: (data: any) => void) => {
    const subscription = (event: any, data: any) => callback(data);
    ipcRenderer.on('updater-event', subscription);
    return () => {
      ipcRenderer.removeListener('updater-event', subscription);
    };
  }
});
