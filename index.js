#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * FDS Template Generator & Validator
 * Automates structure, TOC generation, and section management
 */

class FDSTemplate {
  constructor() {
    this.sections = [
      'Overview & Scope',
      'Electron Architecture & Process Boundaries',
      'Core Filing-System Features',
      'User Flows & Interaction States',
      'Data Models & Metadata Schema',
      'IPC Contracts & Preload API',
      'Security, Permissions & Sandboxing',
      'Performance, Scaling & Resource Limits',
      'Error Handling, Edge Cases & Recovery',
      'Build, Packaging & Cross-Platform Notes',
      'Acceptance Criteria & Testing Hooks',
      'Known Limitations & Future Considerations'
    ];

    this.folderStructure = {
      'src': ['components', 'services', 'store', 'utils', 'api'],
      'public': [],
      'docs': ['sections', 'diagrams', 'api-contracts'],
      'tests': ['unit', 'integration', 'e2e'],
      'build': ['config'],
      '.github': ['workflows'],
    };
  }

  /**
   * Generate Table of Contents from sections
   */
  generateTOC() {
    console.log('\n📋 Table of Contents:\n');
    const toc = this.sections
      .map((section, idx) => {
        const anchor = section.toLowerCase().replace(/[&\s]+/g, '-');
        return `${idx + 1}. [${section}](#${anchor})`;
      })
      .join('\n');
    
    console.log(toc);
    return toc;
  }

  /**
   * Create folder structure for the project
   */
  createFolderStructure(basePath = __dirname) {
    console.log(`\n📁 Creating folder structure at ${basePath}...\n`);
    
    Object.entries(this.folderStructure).forEach(([folder, subfolders]) => {
      const folderPath = path.join(basePath, folder);
      
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`✓ Created ${folder}/`);
      }

      subfolders.forEach(subfolder => {
        const subfolderPath = path.join(folderPath, subfolder);
        if (!fs.existsSync(subfolderPath)) {
          fs.mkdirSync(subfolderPath, { recursive: true });
          console.log(`  ✓ Created ${folder}/${subfolder}/`);
        }
      });
    });

    // Create section markdown files
    const docsPath = path.join(basePath, 'docs', 'sections');
    this.sections.forEach((section, idx) => {
      const filename = `${String(idx + 1).padStart(2, '0')}-${section.toLowerCase().replace(/[&\s]+/g, '-')}.md`;
      const filepath = path.join(docsPath, filename);
      
      if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, `# ${idx + 1}. ${section}\n\n## Content\n\n*Add detailed section content here.*\n`);
        console.log(`✓ Created docs/sections/${filename}`);
      }
    });

    console.log('\n✅ Folder structure created successfully!\n');
  }

  /**
   * Validate FDS document structure
   */
  validateFDS(filePath) {
    console.log(`\n🔍 Validating FDS document: ${filePath}\n`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let foundSections = 0;
    const missingTOC = [];

    this.sections.forEach((section, idx) => {
      const sectionPattern = new RegExp(`^${idx + 1}\\.\\s+${section.replace(/[&()]/g, '\\$&')}`);
      if (lines.some(line => sectionPattern.test(line))) {
        foundSections++;
        console.log(`✓ Found section: ${section}`);
      } else {
        missingTOC.push(section);
        console.log(`⚠ Missing section: ${section}`);
      }
    });

    console.log(`\n📊 Validation Summary:`);
    console.log(`   Found: ${foundSections}/${this.sections.length} sections`);
    
    if (missingTOC.length > 0) {
      console.log(`\n⚠ Missing sections:`);
      missingTOC.forEach(section => console.log(`   - ${section}`));
    }

    return missingTOC.length === 0;
  }

  /**
   * Extract headings from markdown and generate structured headers
   */
  extractHeadings(filePath) {
    console.log(`\n📖 Extracting headings from: ${filePath}\n`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const headings = [];
    
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const anchor = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        
        headings.push({
          level,
          text,
          anchor,
          line: idx + 1
        });
      }
    });

    console.log(`Found ${headings.length} headings:\n`);
    headings.forEach(h => {
      const indent = '  '.repeat(h.level - 1);
      console.log(`${indent}${'#'.repeat(h.level)} ${h.text}`);
    });

    return headings;
  }

  /**
   * Generate a README for the template
   */
  generateReadme(basePath = __dirname) {
    const readmePath = path.join(basePath, 'README.md');
    
    if (!fs.existsSync(readmePath)) {
      const readme = `# St. Clare Filing System – FDS Template

## Overview
This template provides automated structure, validation, and documentation generation for the St. Clare Filing System Functional Design Specification (FDS).

## Quick Start

\`\`\`bash
npm install
npm run generate-toc      # Generate table of contents
npm run validate-fds      # Validate FDS document structure
npm run create-sections   # Create folder structure & section files
npm run dev              # Watch mode
\`\`\`

## Folder Structure
\`\`\`
.
├── src/                 # Application source code
│   ├── components/      # React components
│   ├── services/        # Business logic
│   ├── store/          # State management
│   ├── utils/          # Utilities
│   └── api/            # API contracts
├── docs/               # Documentation
│   ├── sections/       # FDS sections
│   ├── diagrams/       # Architecture diagrams
│   └── api-contracts/  # IPC contracts
├── tests/              # Test suites
├── build/              # Build configuration
└── package.json        # Project manifest
\`\`\`

## Available Commands

- \`npm run generate-toc\` – Generate markdown TOC from FDS sections
- \`npm run validate-fds\` – Validate FDS document completeness
- \`npm run create-sections\` – Create section markdown files
- \`npm start\` – Run index.js
- \`npm run dev\` – Watch mode with auto-reload

## Features

✅ Automated TOC generation
✅ FDS validation & completeness checks
✅ Folder structure scaffolding
✅ Section file creation
✅ Heading extraction & analysis

## License
MIT
`;
      fs.writeFileSync(readmePath, readme);
      console.log(`✓ Created README.md`);
    }
  }

  /**
   * Main entry point
   */
  async run(args = process.argv.slice(2)) {
    console.log('\n🚀 St. Clare Filing System – FDS Template Generator\n');

    if (args.includes('--help') || args.includes('-h')) {
      this.showHelp();
      return;
    }

    if (args.includes('--generate-toc')) {
      this.generateTOC();
    }

    if (args.includes('--validate')) {
      const fdsPath = args[args.indexOf('--validate') + 1] || '../downloads/st_clare_filing_system_fds.md';
      this.validateFDS(fdsPath);
    }

    if (args.includes('--create-sections')) {
      this.createFolderStructure(__dirname);
      this.generateReadme(__dirname);
    }

    if (args.includes('--extract-headings')) {
      const fdsPath = args[args.indexOf('--extract-headings') + 1] || '../downloads/st_clare_filing_system_fds.md';
      this.extractHeadings(fdsPath);
    }

    // Default: show all info
    if (args.length === 0) {
      this.generateTOC();
      console.log('\n---\n');
      this.extractHeadings('../downloads/st_clare_filing_system_fds.md');
    }
  }

  showHelp() {
    console.log(`
Usage: npm run <command> [options]

Commands:
  generate-toc              Generate table of contents
  validate-fds [path]       Validate FDS document
  create-sections           Create folder structure & markdown files
  extract-headings [path]   Extract all headings from markdown

Example:
  npm run validate-fds -- ../downloads/st_clare_filing_system_fds.md
`);
  }
}

// Run the template
const template = new FDSTemplate();
template.run();
