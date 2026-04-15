# Quickstart

## Option A: Use this starter directly (recommended)
```bash
nvm use 22
npm run setup:dev
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
npm install better-sqlite3 argon2 zod zustand @tanstack/react-query file-type react-router-dom
npm install -D wait-on concurrently
```

Install packager only when you need distributables:
```bash
npm install -D electron-builder
```

Install native rebuild tooling only when you need manual Electron ABI rebuilds:
```bash
npm install -D @electron/rebuild
```

### Add native module rebuild hook
```bash
npm pkg set scripts.postinstall="electron-rebuild -f -w better-sqlite3"
```

## Windows native prerequisites
- Install Visual Studio 2022 Build Tools
- Include `Desktop development with C++`
- Install Node.js 20 or 22 LTS

## First checklist to implement
- Start with `docs/checklists/01-authentication-and-rbac.md`
- Then `docs/checklists/02-electron-security-and-process-boundaries.md`
