# St. Clare College Filing System
## Functional Design Specification (Cleaned)

- Document version: 1.0.0
- Application target: 3.0.0
- Stack: Electron 32.x, Node.js 20 LTS, React 18, SQLite (better-sqlite3)
- Platform target: Windows 10 (22H2+) and Windows 11
- Last revised: 2026-04-15
- Status: Engineering handoff draft

## 1) Overview and Scope

### 1.1 Purpose
SCCFS is a local-first desktop filing application for registrar operations. It stores metadata in SQLite and binaries in local storage. No runtime network dependency is required.

### 1.2 In scope (v3)
- Secure local authentication and role-based access control
- Upload pipeline with validation and progress tracking
- Download pipeline (single and ZIP batch)
- Shelf-based virtual organization
- Logical storage quota management and cleanup
- Optional AES-256-GCM file encryption
- Safe SQLite backup and restore workflow
- Windows installer packaging (NSIS)

### 1.3 Out of scope (v3)
- Cloud sync and multi-device collaboration
- Real-time co-authoring
- macOS/Linux packaging
- LDAP/Active Directory authentication
- Built-in antivirus integration (hook only)

### 1.4 Key constraints
| Constraint | Value |
|---|---|
| Electron security | `contextIsolation=true`, `nodeIntegration=false`, renderer sandbox enabled |
| DB engine | `better-sqlite3` in main process |
| Max file size | 2 GB per file |
| Default quota | 500 GB logical quota |
| Storage root | `%APPDATA%/StClareFilingSystem/` |

## 2) Architecture and Process Boundaries

### 2.1 Main process responsibilities
- Own SQLite access, filesystem I/O, encryption/decryption, and IPC handlers
- Verify sessions and role permissions on every privileged operation
- Validate IPC payloads (zod) and return normalized error envelopes

### 2.2 Renderer responsibilities
- UI only (React + state/query layers)
- Calls preload API (`window.sccfs`) and never Node APIs directly

### 2.3 Preload contract
- Expose a constrained API surface through `contextBridge`
- Never expose raw `ipcRenderer`
- Return unsubscribe handlers for every event subscription API

### 2.4 Security posture
- Strict BrowserWindow security config
- Channel allowlist and payload schema validation
- No `require('fs')`/`require('crypto')`/`require('better-sqlite3')` in renderer code

## 3) Functional Requirements (Validated)

### 3.1 Feasibility summary
All in-scope requirements are feasible in Electron on Windows with the selected stack.

| Requirement area | Feasible | Notes |
|---|---|---|
| Authentication and RBAC | Yes | Standard Argon2id + in-memory session map |
| Upload and validation pipeline | Yes | Use streaming I/O and serialized queue |
| Download and ZIP export | Yes | Use save dialogs, temp workspace, archiver stream |
| Shelves and metadata organization | Yes | Straightforward relational model |
| Storage quota, backup, restore | Yes | Use logical quota + `db.backup()` for safety |
| File-level encryption | Yes | AES-256-GCM + PBKDF2 per-file derivation |
| IPC and preload contracts | Yes | Standard secure Electron design |
| Windows packaging and native modules | Yes | Requires ABI rebuild for `better-sqlite3` |

### 3.2 Notable implementation caveats
- Multi-instance access to one database path is not supported.
- Antivirus scanning is still an integration point, not a delivered feature.
- Encrypted file passwords are non-recoverable by design.
- Code signing is strongly recommended for production installer trust.

## 4) Core Implementation Rules

### 4.1 Authentication
- Password policy enforced in main process (renderer is UX-only validation)
- Role gates applied server-side on every operation
- Lockout after repeated failures
- Session inactivity timeout and absolute session expiration

### 4.2 Upload
- Validate file existence, size, quota, MIME, sanitized filename, and free disk headroom
- Stream file writes; avoid full-file memory buffering
- Compute and persist SHA-256 checksum of stored bytes
- Emit progress events from main to renderer

### 4.3 Download
- Validate permissions per file
- Prompt for password when required for protected/encrypted files
- Support batch ZIP export with size guardrails
- Clean temp artifacts after completion or failure

### 4.4 Shelves
- System shelves are non-deletable
- Custom shelves have uniqueness and count limits
- Deleting a shelf moves files to Inbox

### 4.5 Storage management
- Quota calculated from active file records
- Backup sequence uses SQLite checkpoint + backup API
- Restore closes DB, swaps data, reopens DB, and relaunches app

### 4.6 Cryptography
- AES-256-GCM, per-file random salt and IV
- PBKDF2-SHA512 for key derivation with high iteration count
- Never persist plaintext keys
- Treat GCM tag mismatch as corruption/tamper failure

## 5) Data and IPC Contracts

### 5.1 Data model baseline
Primary tables:
- `users`
- `shelves`
- `files`
- `upload_history`
- `downloads`
- `activity_log`
- `storage_config`
- `encryption_keys`
- `app_config`

### 5.2 IPC baseline
- Namespace prefix: `sccfs:`
- Pattern: `domain:verb` (example: `sccfs:auth:login`)
- Uniform response envelope with `ok`, `data`, and normalized `error`

## 6) Build and Packaging Baseline

- Development: renderer dev server plus Electron main process loop
- Production: renderer build then electron-builder packaging
- Native module rebuild required after Electron ABI changes
- NSIS installer target for Windows x64

## 7) Acceptance and Testing Baseline

- Unit tests for pure services and validators
- Integration tests for IPC handlers and DB operations
- End-to-end tests for login, upload, download, encryption, and restore
- Test hooks exposed only in `NODE_ENV=test`

## 8) Requirement Checklists

Use these implementation checklists:

1. [docs/checklists/01-authentication-and-rbac.md](docs/checklists/01-authentication-and-rbac.md)
2. [docs/checklists/02-electron-security-and-process-boundaries.md](docs/checklists/02-electron-security-and-process-boundaries.md)
3. [docs/checklists/03-upload-pipeline.md](docs/checklists/03-upload-pipeline.md)
4. [docs/checklists/04-download-and-export.md](docs/checklists/04-download-and-export.md)
5. [docs/checklists/05-shelves-and-organization.md](docs/checklists/05-shelves-and-organization.md)
6. [docs/checklists/06-storage-quota-backup-restore.md](docs/checklists/06-storage-quota-backup-restore.md)
7. [docs/checklists/07-file-encryption-and-key-management.md](docs/checklists/07-file-encryption-and-key-management.md)
8. [docs/checklists/08-data-model-and-ipc-contracts.md](docs/checklists/08-data-model-and-ipc-contracts.md)
9. [docs/checklists/09-testing-and-acceptance.md](docs/checklists/09-testing-and-acceptance.md)
10. [docs/checklists/10-build-and-windows-packaging.md](docs/checklists/10-build-and-windows-packaging.md)

## 9) Registrar-Focused Notes

- The product direction is valid for registrar use: local-first, audit-friendly, and role-gated.
- Sorting and advanced discovery can be staged after secure ingestion/retrieval and encryption are stable.
- Recommended feature delivery order:
  1. Authentication + secure IPC boundary
  2. Upload/download core path
  3. Storage management and backup/restore
  4. Encryption and policy hardening
  5. Sorting/search enhancements
