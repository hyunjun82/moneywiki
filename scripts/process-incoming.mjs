#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INCOMING_DIR = path.join(__dirname, '..', '_incoming');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'app', 'w');

// Files to skip
const SKIP_FILES = ['README.md', 'test.txt', 'vm-test.txt'];

/**
 * Extract slug from filename
 * Removes (1), (2) etc suffixes and .jsx extension
 */
function extractSlug(filename) {
  // Remove .jsx extension
  let name = filename.replace(/\.jsx$/, '');

  // Remove " (1)", " (2)" etc suffixes
  name = name.replace(/\s+\(\d+\)$/, '');

  return name;
}

/**
 * Check if a file is a duplicate (has (1), (2) etc suffix)
 */
function isDuplicate(filename) {
  return /\s+\(\d+\)\.jsx$/.test(filename);
}

/**
 * Check if original file exists (without the duplicate suffix)
 */
function originalFileExists(filename) {
  const slug = extractSlug(filename);
  const originalFile = `${slug}.jsx`;
  return fs.existsSync(path.join(INCOMING_DIR, originalFile));
}

/**
 * Create directory recursively if it doesn't exist
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Convert JSX to TSX (minimal changes for JSX -> TSX conversion)
 */
function convertJsxToTsx(content) {
  return content;
}

// Main processing logic
async function processIncoming() {
  console.log('Starting incoming JSX processing...\n');

  if (!fs.existsSync(INCOMING_DIR)) {
    console.error(`Error: _incoming directory not found at ${INCOMING_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    console.error(`Error: Output directory not found at ${OUTPUT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(INCOMING_DIR).sort();

  let processed = 0;
  let skipped = 0;
  let errors = [];
  const skipReasons = {
    nonJsx: 0,
    skipFiles: 0,
    duplicateNoOriginal: 0,
    duplicateWithOriginal: 0,
    existingPage: 0,
  };

  for (const file of files) {
    const filePath = path.join(INCOMING_DIR, file);
    const stat = fs.statSync(filePath);

    // Skip directories
    if (stat.isDirectory()) {
      continue;
    }

    // Skip non-JSX files
    if (!file.endsWith('.jsx')) {
      skipReasons.nonJsx++;
      skipped++;
      continue;
    }

    // Skip specific files
    if (SKIP_FILES.includes(file)) {
      skipReasons.skipFiles++;
      skipped++;
      continue;
    }

    // Handle duplicates
    if (isDuplicate(file)) {
      if (!originalFileExists(file)) {
        console.log(`⚠️  SKIPPED (duplicate, no original): ${file}`);
        skipReasons.duplicateNoOriginal++;
        skipped++;
      } else {
        console.log(`⏭️  SKIPPED (duplicate): ${file}`);
        skipReasons.duplicateWithOriginal++;
        skipped++;
      }
      continue;
    }

    // Extract slug and create output path
    const slug = extractSlug(file);
    const outputFolder = path.join(OUTPUT_DIR, slug);
    const outputFile = path.join(outputFolder, 'page.tsx');

    // Check if page already exists
    if (fs.existsSync(outputFile)) {
      console.log(`⏭️  SKIPPED (existing page): ${file} → ${slug}/page.tsx`);
      skipReasons.existingPage++;
      skipped++;
      continue;
    }

    try {
      // Read the JSX file
      const jsxContent = fs.readFileSync(filePath, 'utf-8');

      // Convert to TSX (minimal conversion)
      const tsxContent = convertJsxToTsx(jsxContent);

      // Ensure output directory exists
      ensureDir(outputFolder);

      // Write to page.tsx
      fs.writeFileSync(outputFile, tsxContent, 'utf-8');

      console.log(`✅ PROCESSED: ${file} → ${slug}/page.tsx`);
      processed++;
    } catch (error) {
      const errorMsg = `❌ ERROR processing ${file}: ${error.message}`;
      console.log(errorMsg);
      errors.push(errorMsg);
      skipped++;
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files in _incoming: ${files.filter(f => !fs.statSync(path.join(INCOMING_DIR, f)).isDirectory()).length}`);
  console.log(`✅ Processed: ${processed}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`  - Non-JSX files: ${skipReasons.nonJsx}`);
  console.log(`  - Skip list (README, test, etc): ${skipReasons.skipFiles}`);
  console.log(`  - Duplicates (with original): ${skipReasons.duplicateWithOriginal}`);
  console.log(`  - Duplicates (no original): ${skipReasons.duplicateNoOriginal}`);
  console.log(`  - Existing pages: ${skipReasons.existingPage}`);

  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(err => console.log(`  ${err}`));
    process.exit(1);
  } else {
    console.log('\n✅ All files processed successfully!');
    process.exit(0);
  }
}

processIncoming().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
