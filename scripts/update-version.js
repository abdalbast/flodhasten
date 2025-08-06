const fs = require('fs');
const path = require('path');

// Generate a new version with timestamp
const timestamp = Date.now();
const newVersion = `1.0.1-${timestamp}`;

console.log(`Updating version to: ${newVersion}`);

// Update index.html
const indexPath = path.join(__dirname, '../public/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace all version parameters
indexContent = indexContent.replace(/v=1\.0\.1/g, `v=${newVersion}`);
indexContent = indexContent.replace(/sw\.js\?v=1\.0\.1/g, `sw.js?v=${newVersion}`);

fs.writeFileSync(indexPath, indexContent);
console.log('Updated index.html');

// Update service worker
const swPath = path.join(__dirname, '../public/sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');

// Update cache version
swContent = swContent.replace(/const CACHE_VERSION = '1\.0\.1-' \+ Date\.now\(\);/g, `const CACHE_VERSION = '${newVersion}';`);

fs.writeFileSync(swPath, swContent);
console.log('Updated service worker');

// Update package.json version
const packagePath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log('Updated package.json');

console.log('Version update complete!'); 