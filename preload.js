const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  stopTimer: () => ipcRenderer.send('stop-timer')
});
