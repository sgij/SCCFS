# Checklist: Download and Export

## Feasibility
- [x] Doable with save dialog + stream copy + temporary workspace

## Build Checklist
- [ ] Implement single-file download IPC route
- [ ] Implement batch ZIP export route with size pre-check
- [ ] Validate read permissions for each requested file
- [ ] Prompt for password where file policy requires it
- [ ] Decrypt to temp only when required, then stream to destination
- [ ] Build ZIP with streaming archiver API
- [ ] Enforce 10GB ZIP guardrail before expensive work
- [ ] Clean up temp artifacts on success and on error
- [ ] Write download audit rows for all outcomes
- [ ] Return saved path metadata in success envelope

## Verification Checklist
- [ ] Wrong password blocks encrypted export
- [ ] Batch limit error is returned before temp creation
- [ ] ZIP contains all expected files and names
- [ ] Cancel/failed export leaves no temp residue
