# Checklist: Data Model and IPC Contracts

## Feasibility
- [x] Doable with `better-sqlite3` and typed IPC schemas

## Build Checklist
- [ ] Finalize schema tables, indexes, and foreign keys
- [ ] Add migration runner with schema version tracking
- [ ] Enforce prepared statements for all SQL execution paths
- [ ] Define response envelope (`ok`, `data`, `error`) globally
- [ ] Namespace all channels with `sccfs:` prefix
- [ ] Maintain strict allowlist for channel handlers
- [ ] Validate all request payloads and normalize errors
- [ ] Keep role/user identity server-side from session context
- [ ] Add API docs for preload methods and event subscriptions
- [ ] Version IPC contracts for future compatibility changes

## Verification Checklist
- [ ] No handler trusts renderer-sent user identity
- [ ] Invalid payload path returns predictable error envelope
- [ ] Schema migration on startup is deterministic and idempotent
- [ ] Index coverage supports expected query paths
