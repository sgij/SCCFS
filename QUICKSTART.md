# Quickstart

## Option A: Use this starter directly (recommended)
```bash
npm install
npm run dev
```

## Option B: Generate a fresh equivalent template via npm
Use one of these if you want a clean new directory:

### Electron + Vite + React baseline
```bash
npm create electron-vite@latest sccfs -- --template react
cd sccfs
npm install
```

Then install SCCFS-required dependencies:
```bash
npm install better-sqlite3 argon2 zod zustand @tanstack/react-query archiver file-type react-router-dom
npm install -D electron-builder electron-rebuild wait-on concurrently
```

### Add native module rebuild hook
```bash
npm pkg set scripts.postinstall="electron-rebuild -f -w better-sqlite3"
```

## Windows native prerequisites
- Install Visual Studio 2022 Build Tools
- Include `Desktop development with C++`
- Install Node.js 20 LTS

## First checklist to implement
- Start with `docs/checklists/01-authentication-and-rbac.md`
- Then `docs/checklists/02-electron-security-and-process-boundaries.md`
