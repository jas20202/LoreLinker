const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  join: (path1, path2) => ipcRenderer.invoke('join', path1, path2),
  openFile: () => ipcRenderer.invoke('openFile'),
  saveFile: (data) => ipcRenderer.invoke('saveFile', data),
  saveFileWithImage: (data) => ipcRenderer.invoke('saveFileWithImage', data),
  emptyCurrent: () => ipcRenderer.invoke('emptyCurrent')
});