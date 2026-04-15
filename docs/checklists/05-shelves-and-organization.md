# Checklist: Shelves and Organization

## Feasibility
- [x] Doable with normalized shelf and file schema

## Build Checklist
- [ ] Seed system shelves on first run (Inbox, Important, Archived, Trash)
- [ ] Enforce non-deletable rule for system shelves
- [ ] Add create/update/delete/reorder shelf IPC routes
- [ ] Enforce shelf name uniqueness and max-count policy
- [ ] Ensure file belongs to exactly one shelf at a time
- [ ] Move files to Inbox when deleting a non-system shelf
- [ ] Persist shelf ordering and expose in list response
- [ ] Log shelf changes to activity table

## Verification Checklist
- [ ] Deleting shelf with files reassigns files to Inbox
- [ ] System shelf deletion is rejected
- [ ] Reorder persists after restart
- [ ] Shelf counts match file query filters
