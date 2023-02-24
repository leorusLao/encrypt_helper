const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getFingerprint: () => ipcRenderer.invoke('getFingerprint'),
    saveFile: (text) => ipcRenderer.send('save-file', text),
    updateFingerprint: () => ipcRenderer.invoke('updateFingerprint'),
})
