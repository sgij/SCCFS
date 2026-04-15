# St. Clare Filing System Starter

This repository now includes a secure Electron + React + SQLite groundwork aligned with the SCCFS specification.

## Included groundwork
- Electron main process with secure BrowserWindow defaults
- Preload bridge exposing `window.sccfs` API surface
- IPC starter handlers using zod validation and standard envelopes
- `better-sqlite3` database bootstrap (WAL mode, baseline config)
- React + Vite renderer with routing, Zustand, and React Query
- Packaging scripts for Windows NSIS via electron-builder
- Checklist-driven docs in `docs/checklists/`

## Run locally
```bash
npm install
npm run dev
```

## Build and package
```bash
npm run build
npm run dist:win
```

## Key scripts
- `npm run dev`: start renderer + Electron together
- `npm run build:renderer`: build Vite renderer to `src/renderer/dist`
- `npm run build:electron`: package app directory output
- `npm run dist:win`: create NSIS Windows installer
- `npm run rebuild:native`: rebuild `better-sqlite3` for Electron ABI

## Checklist-first iteration path
1. Authentication and role checks
2. Upload + download core I/O paths
3. Storage quota and backup/restore
4. Encryption and key management
5. Search/sorting and UX polish
