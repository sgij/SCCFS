# Quick Start Guide – St. Clare Filing System Template

## Setup

```bash
cd D:\templates
npm install
```

## Usage

### 1. Generate Table of Contents
```bash
npm run generate-toc
```

Outputs a formatted TOC with markdown anchors for all 12 FDS sections.

### 2. Create Project Structure
```bash
npm run create-sections
```

Creates:
- `docs/sections/` – 12 markdown files for each FDS section
- `src/` – Folder structure for components, services, utils, etc.
- `tests/` – Unit, integration, and E2E test folders
- `build/` – Build configuration
- `.github/` – CI/CD workflows

### 3. Validate FDS Document
```bash
npm run validate-fds -- /path/to/fds.md
```

Checks:
- All 12 sections are present
- Section numbering is correct
- Document completeness

### 4. Extract Headings
```bash
npm run --extract-headings -- /path/to/fds.md
```

Lists all headings with:
- Level (h1, h2, h3, etc.)
- Text content
- Anchor links
- Line numbers

## Example Commands

```bash
# Watch mode for development
npm run dev

# Generate everything
npm run generate-toc && npm run create-sections

# Validate your FDS file
npm run validate-fds -- ../downloads/st_clare_filing_system_fds.md

# Extract headings for analysis
npm run extract-headings -- ../downloads/st_clare_filing_system_fds.md
```

## File Structure

```
D:\templates\
├── index.js              # Main automation script
├── package.json          # NPM configuration
├── README.md             # Documentation
├── .gitignore            # Git ignore rules
├── src/                  # Source code folders
├── docs/                 # Documentation sections
├── tests/                # Test suites
├── build/                # Build configuration
└── public/               # Static assets
```

## Next Steps

1. **Edit Section Files** – Update `docs/sections/0X-*.md` files with your FDS content
2. **Create Components** – Add React components in `src/components/`
3. **Implement Services** – Add business logic in `src/services/`
4. **Write Tests** – Add tests in `tests/`
5. **Configure Build** – Set up build settings in `build/config/`

## Tips

- Use `npm run dev` for watching changes
- Generate TOC whenever you add new sections
- Validate FDS regularly during updates
- Keep section files focused and organized
- Use `docs/diagrams/` for architecture diagrams
- Store API contracts in `docs/api-contracts/`

---

**Version:** 1.0.0
**Created:** 2026-04-15
