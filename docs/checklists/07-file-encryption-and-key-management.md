# Checklist: File Encryption and Key Management

## Feasibility
- [x] Doable with Node crypto in main process

## Build Checklist
- [ ] Add encryption metadata table (`encryption_keys`) with FK to `files`
- [ ] Derive per-file key via PBKDF2-SHA512 using per-file salt
- [ ] Encrypt using AES-256-GCM with unique IV per operation
- [ ] Persist salt/iv/auth_tag metadata, never plaintext key
- [ ] Define stable binary format for encrypted file payloads
- [ ] Add decrypt path with GCM tag verification
- [ ] Add wrong-password and corrupt-file error differentiation
- [ ] Implement change-password flow via decrypt then re-encrypt
- [ ] Add secure temp-file cleanup on failure/success
- [ ] Ensure sensitive values are scoped and disposed promptly

## Verification Checklist
- [ ] Encrypted output differs from original bytes
- [ ] Correct password restores original checksum
- [ ] Wrong password yields expected error code
- [ ] Auth tag mismatch yields corruption/tamper error
