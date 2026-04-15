# St. Clare Filing System – Template & Documentation

This folder contains npm templates and automation tools for the St. Clare Filing System project.

## What's Inside

### index.js
Automated template generator that provides:
- **Table of Contents Generation** – Auto-generates TOC from FDS sections
- **FDS Validation** – Checks for missing sections and completeness
- **Folder Structure Scaffolding** – Creates organized project structure
- **Section File Creation** – Generates markdown files for each section
- **Heading Extraction** – Parses and maps all headings

### package.json
NPM configuration with scripts and dependencies.

## Quick Start

```bash
cd D:\templates
npm install
npm run generate-toc        # View table of contents
npm run create-sections     # Create folder structure
npm run validate-fds        # Validate FDS document
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run the generator |
| `npm run generate-toc` | Generate markdown TOC |
| `npm run validate-fds` | Validate FDS completeness |
| `npm run create-sections` | Create project structure |
| `npm run dev` | Watch mode |

## Example Usage

### Generate TOC from FDS
```bash
npm run generate-toc
```

### Validate your FDS document
```bash
npm run validate-fds -- path/to/your/fds.md
```

### Create a new project structure
```bash
npm run create-sections
```

This will create:
- `docs/sections/` – Individual section files
- `src/` – Application structure
- `tests/` – Test folders
- `build/` – Build configuration
- Other project directories

## Template Features

✅ Auto-generates folder structure based on FDS sections
✅ Creates markdown files for each section with templates
✅ Validates document completeness
✅ Generates clickable table of contents
✅ Extracts and maps all headings
✅ Easy to extend and customize

## Next Steps

1. Run `npm run create-sections` to scaffold the project
2. Edit individual section files in `docs/sections/`
3. Build your application in `src/`
4. Run tests in `tests/`

---

**Version:** 1.0.0
**Last Updated:** 2026-04-15
