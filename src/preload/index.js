import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sccfs', {
  auth: {
    login: (payload) => ipcRenderer.invoke('sccfs:auth:login', payload),
  },
  window: {
    minimize: () => ipcRenderer.invoke('sccfs:window:minimize'),
    maximizeToggle: () => ipcRenderer.invoke('sccfs:window:maximize-toggle'),
    close: () => ipcRenderer.invoke('sccfs:window:close'),
  },
});
