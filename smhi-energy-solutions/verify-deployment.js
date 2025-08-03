const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  requiredFiles: [
    'index.html',
    'about.html',
    'team.html',
    'contact.html',
    'solutions/index.html',
    'solutions/vfd.html',
    'solutions/led-lighting.html',
    'solutions/power-factor.html',
    'solutions/ems.html',
    'solutions/surge-protection.html',
    'assets/css/desktop-optimized.css',
    'assets/css/styles.css',
    'assets/js/main.js',
    'robots.txt',
    'sitemap.xml',
    '.htaccess',
    '_headers',
    'netlify.toml'
  ],
  requiredDirs: [
    'assets/img',
    'assets/css',
    'assets/js',
    'solutions'
  ],
  brokenLinkDomains: [
    'http://',
    'https://',
    'mailto:',
    'tel:'
  ]
};

// Check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

// Check if directory exists
function dirExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
}

// Check for broken links in HTML files
function checkForBrokenLinks(htmlContent, filePath) {
  const linkRegex = /(href|src)="([^"]*)"/g;
  let match;
  const brokenLinks = [];
  
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const link = match[2];
    if (CONFIG.brokenLinkDomains.some(domain => link.startsWith(domain))) {
      continue; // Skip external links
    }
    
    if (link.startsWith('/')) {
      // Handle absolute paths
      const fullPath = path.join(process.cwd(), link);
      if (!fileExists(fullPath) && !dirExists(fullPath)) {
        brokenLinks.push(`  - ${link} (from ${filePath})`);
      }
    } else {
      // Handle relative paths
      const dir = path.dirname(filePath);
      const fullPath = path.join(dir, link);
      if (!fileExists(fullPath) && !dirExists(fullPath)) {
        brokenLinks.push(`  - ${link} (from ${filePath})`);
      }
    }
  }
  
  return brokenLinks;
}

// Main function
async function verifyDeployment() {
  console.log('🚀 Starting deployment verification...\n');
  
  let hasErrors = false;
  const missingFiles = [];
  const missingDirs = [];
  const brokenLinks = [];
  
  // Check required files
  console.log('🔍 Checking for required files...');
  CONFIG.requiredFiles.forEach(file => {
    if (!fileExists(path.join(process.cwd(), file))) {
      missingFiles.push(`  - ${file}`);
      hasErrors = true;
    }
  });
  
  // Check required directories
  console.log('📂 Checking for required directories...');
  CONFIG.requiredDirs.forEach(dir => {
    if (!dirExists(path.join(process.cwd(), dir))) {
      missingDirs.push(`  - ${dir}`);
      hasErrors = true;
    }
  });
  
  // Check HTML files for broken links
  console.log('🔗 Checking for broken links...');
  const htmlFiles = CONFIG.requiredFiles.filter(file => file.endsWith('.html'));
  
  for (const htmlFile of htmlFiles) {
    const filePath = path.join(process.cwd(), htmlFile);
    if (fileExists(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = checkForBrokenLinks(content, htmlFile);
      if (links.length > 0) {
        brokenLinks.push(...links);
        hasErrors = true;
      }
    }
  }
  
  // Report results
  console.log('\n📊 Verification Results:');
  console.log('----------------------');
  
  if (missingFiles.length > 0) {
    console.log('\n❌ Missing required files:');
    console.log(missingFiles.join('\n'));
  }
  
  if (missingDirs.length > 0) {
    console.log('\n❌ Missing required directories:');
    console.log(missingDirs.join('\n'));
  }
  
  if (brokenLinks.length > 0) {
    console.log('\n❌ Broken links found:');
    console.log(brokenLinks.join('\n'));
  }
  
  if (!hasErrors) {
    console.log('\n✅ All checks passed! Your site is ready for deployment.');
    console.log('\nNext steps:');
    console.log('1. Commit all changes to your repository');
    console.log('2. Push to your deployment branch (e.g., main or master)');
    console.log('3. Deploy to your hosting provider');
    console.log('\nFor Netlify deployment, you can connect your GitHub repository at:');
    console.log('https://app.netlify.com/start');
  } else {
    console.log('\n❌ Deployment verification failed. Please fix the issues above before deploying.');
    process.exit(1);
  }
}

// Run the verification
verifyDeployment().catch(console.error);
