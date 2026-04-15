# Checklist: Upload Pipeline

## Feasibility
- [x] Doable with streaming file I/O in main process

## Build Checklist
- [ ] Implement drag-drop path capture in renderer
- [ ] Implement file picker dialog in main process
- [ ] Build per-file validation pipeline (existence, size, MIME, quota)
- [ ] Sanitize filenames and block traversal/null byte patterns
- [ ] Implement duplicate-name rename strategy in shelf scope
- [ ] Enforce serialized upload queue (concurrency = 1)
- [ ] Write files with stream API (no full buffering)
- [ ] Compute and store SHA-256 checksum
- [ ] Persist file and upload history in transaction-safe flow
- [ ] Emit progress/file-complete/session-complete events

## Verification Checklist
- [ ] >2GB files are rejected before write
- [ ] Disallowed MIME is rejected via content sniffing
- [ ] Partial file is cleaned up after cancel/failure
- [ ] Progress percentages are monotonic and complete at 100
