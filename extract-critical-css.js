/**
 * Script to extract critical CSS for above-the-fold content
 * This should be run as a build step
 * 
 * Install dependencies:
 * npm install critical --save-dev
 * 
 * Usage:
 * node extract-critical-css.js
 */

const critical = require('critical');
const fs = require('fs');
const path = require('path');

const pages = [
  { input: 'index.html', output: 'index-critical.html' },
  { input: 'es/index.html', output: 'es/index-critical.html' }
];

console.log('Extracting critical CSS...\n');

pages.forEach(page => {
  critical.generate({
    inline: true,
    base: './',
    src: page.input,
    target: {
      html: page.output,
      uncritical: `assets/css/non-critical-${path.basename(page.input, '.html')}.css`
    },
    width: 1300,
    height: 900,
    dimensions: [
      {
        height: 900,
        width: 1300
      },
      {
        height: 720,
        width: 1024
      },
      {
        height: 568,
        width: 320
      }
    ],
    penthouse: {
      blockJSRequests: false,
    }
  })
  .then(() => {
    console.log(`✓ Critical CSS extracted for ${page.input}`);
  })
  .catch(err => {
    console.error(`✗ Error processing ${page.input}:`, err);
  });
});

console.log('\nNote: Review the generated files and replace originals if satisfied.');
console.log('Critical CSS will be inlined in <head>, non-critical loaded async.');
