/**
 * Production entry point for cPanel Node.js hosting.
 * This file is plain JS to avoid requiring tsx in production.
 * 
 * Usage: node server/start.js
 * cPanel: Set this as "Application startup file"
 */

const path = require('path');

// Register tsx for TypeScript support
require('tsx/cjs');

// Start the server
require(path.join(__dirname, 'index.ts'));
