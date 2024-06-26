const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  timerDone: () => ipcRenderer.send('timer-done')
})

