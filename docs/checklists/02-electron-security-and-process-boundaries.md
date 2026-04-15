# Checklist: Electron Security and Process Boundaries

## Feasibility
- [x] Doable and recommended for production Electron apps

## Build Checklist
- [ ] Configure BrowserWindow with secure defaults
- [ ] Enable `contextIsolation` and sandbox renderer
- [ ] Disable `nodeIntegration` and remote module usage
- [ ] Keep preload as the only bridge (`window.sccfs`)
- [ ] Never expose raw `ipcRenderer` to renderer code
- [ ] Add IPC channel allowlist in main process router
- [ ] Validate all IPC payloads with zod schemas
- [ ] Add CSP headers for renderer content
- [ ] Add lint rule to block restricted modules in renderer files
- [ ] Centralize error mapping to safe client responses

## Verification Checklist
- [ ] Renderer cannot access Node APIs directly
- [ ] Unknown IPC channel names are rejected
- [ ] Malformed payload returns validation error envelope
- [ ] Security config cannot drift without test failure
