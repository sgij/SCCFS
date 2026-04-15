# Checklist: Build and Windows Packaging

## Feasibility
- [x] Doable with electron-builder and ABI rebuild for native modules

## Build Checklist
- [ ] Configure scripts for dev, renderer build, and package build
- [ ] Add `postinstall` rebuild for `better-sqlite3`
- [ ] Configure `asarUnpack` for native module loading
- [ ] Set NSIS target and installer metadata
- [ ] Add Windows icon assets and installer resources
- [ ] Validate output artifact naming/versioning
- [ ] Add release-mode smoke run for packaged app
- [ ] Document required Build Tools components for contributors
- [ ] Add code-signing placeholders/env wiring
- [ ] Add CI pipeline for reproducible Windows build artifacts

## Verification Checklist
- [ ] Fresh install launches and loads DB successfully
- [ ] Upgrade path retains existing user data
- [ ] Native module loads in packaged app (no ABI mismatch)
- [ ] Installer/uninstaller complete without data corruption
