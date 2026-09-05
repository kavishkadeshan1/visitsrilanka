/**
 * cPanel Build & Package Script
 * 
 * Packages the dist/ folder into cpanel_public_html.zip
 * Ready to upload and extract directly inside cPanel File Manager (public_html).
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const distDir = path.join(process.cwd(), 'dist');
const zipFile = path.join(process.cwd(), 'cpanel_public_html.zip');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Verify .htaccess exists
const htaccess = path.join(distDir, '.htaccess');
if (!fs.existsSync(htaccess)) {
  const publicHtaccess = path.join(process.cwd(), 'public', '.htaccess');
  if (fs.existsSync(publicHtaccess)) {
    fs.copyFileSync(publicHtaccess, htaccess);
    console.log('✅ Copied .htaccess to dist/');
  } else {
    console.warn('⚠️ Warning: .htaccess not found in dist/');
  }
} else {
  console.log('✅ .htaccess is present in dist/');
}

// Verify config.js exists
const configJs = path.join(distDir, 'config.js');
if (!fs.existsSync(configJs)) {
  const publicConfig = path.join(process.cwd(), 'public', 'config.js');
  if (fs.existsSync(publicConfig)) {
    fs.copyFileSync(publicConfig, configJs);
    console.log('✅ Copied config.js to dist/');
  }
} else {
  console.log('✅ config.js is present in dist/');
}

// Remove old zip if exists
if (fs.existsSync(zipFile)) {
  try {
    fs.unlinkSync(zipFile);
  } catch {}
}

console.log('📦 Creating cpanel_public_html.zip...');

try {
  if (process.platform === 'win32') {
    // PowerShell Compress-Archive on Windows
    execSync(`powershell -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipFile}' -Force"`, {
      stdio: 'inherit',
    });
  } else {
    // Unix zip command
    execSync(`cd "${distDir}" && zip -r "${zipFile}" .`, {
      stdio: 'inherit',
    });
  }

  const stats = fs.statSync(zipFile);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`\n🎉 Successfully created: cpanel_public_html.zip (${sizeMB} MB)`);
  console.log('\n📋 cPanel Deployment Instructions:');
  console.log('  1. Log into your cPanel dashboard');
  console.log('  2. Open File Manager -> navigate to "public_html"');
  console.log('  3. Upload "cpanel_public_html.zip"');
  console.log('  4. Right-click the zip file -> Click "Extract"');
  console.log('  5. Open "config.js" in cPanel code editor to set your Vercel URL (window.__API_URL__) if needed');
  console.log('  6. Your website is LIVE!\n');
} catch (err) {
  console.error('❌ Failed to create zip archive:', err.message);
  console.log('👉 You can manually zip the contents of the "dist" folder and upload to cPanel.');
}
