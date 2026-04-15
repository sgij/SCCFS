# Checklist: Storage Quota, Backup, and Restore

## Feasibility
- [x] Doable with logical quota calculations and safe SQLite backup API

## Build Checklist
- [ ] Implement singleton storage config table and defaults
- [ ] Compute quota from active file rows, not OS free space
- [ ] Implement threshold states (normal/warning/critical/full)
- [ ] Block upload when full threshold is exceeded
- [ ] Implement cleanup job for temp and trash retention
- [ ] Implement backup flow with WAL checkpoint + `db.backup()`
- [ ] Copy file payload tree and logs to backup destination
- [ ] Validate backup integrity with `PRAGMA integrity_check`
- [ ] Implement restore flow with DB close/swap/reopen sequence
- [ ] Relaunch app after successful restore

## Verification Checklist
- [ ] Quota bar reflects DB aggregate within tolerance
- [ ] Backup integrity failure is surfaced and logged
- [ ] Restore can recover both metadata and binaries
- [ ] Purge removes binary first, then DB row
