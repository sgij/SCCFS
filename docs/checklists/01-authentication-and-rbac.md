# Checklist: Authentication and RBAC

## Feasibility
- [x] Doable in Electron + Node.js local-first architecture

## Build Checklist
- [ ] Create `users` schema with role, lockout, timestamps, and active flags
- [ ] Implement Argon2id password hashing and verification
- [ ] Enforce password policy in main process (authoritative)
- [ ] Build login/logout IPC handlers
- [ ] Implement in-memory session store with TTL and inactivity timeout
- [ ] Enforce role checks in all protected handlers
- [ ] Add failed-attempt counter and lockout window
- [ ] Add first-run setup flow (bootstrap administrator)
- [ ] Ensure session token is not persisted in browser storage
- [ ] Emit session-expired event to renderer and force logout

## Verification Checklist
- [ ] Invalid login increments failed attempts
- [ ] Lockout triggers after threshold and resets correctly
- [ ] Viewer cannot call upload-only actions
- [ ] Expired/inactive sessions are rejected consistently
- [ ] Password hash is never returned over IPC
