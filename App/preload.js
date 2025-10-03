const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  openFile: () => ipcRenderer.invoke('openFile'),
  saveFile: (data) => ipcRenderer.invoke('saveFile', data),
});