# Checklist: Testing and Acceptance

## Feasibility
- [x] Doable with Vitest + integration harness + Electron E2E

## Build Checklist
- [ ] Create unit tests for validators, auth, and crypto helpers
- [ ] Create integration tests for IPC handlers and DB operations
- [ ] Add E2E tests for login/upload/download/restore flows
- [ ] Use in-memory DB for fast test suites where applicable
- [ ] Seed deterministic fixtures for repeatability
- [ ] Add test-only hooks guarded by environment flag
- [ ] Capture and assert standardized error codes
- [ ] Add regression tests for lockout, quota, and encryption edge cases
- [ ] Add smoke test for app startup and migration path
- [ ] Gate CI on required acceptance test set

## Verification Checklist
- [ ] Acceptance criteria map to automated tests
- [ ] Failed tests provide actionable diagnostics
- [ ] No test hooks are enabled in production builds
- [ ] Critical user flows are covered end-to-end
