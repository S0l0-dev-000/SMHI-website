const fs = require('fs');
const path = require('path');

// Function to process HTML files
function processHtmlFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      // Skip node_modules and other non-essential directories
      if (!['node_modules', '.git', '.github', 'dist', 'build'].includes(file.name)) {
        processHtmlFiles(fullPath);
      }
    } else if (file.name.endsWith('.html')) {
      console.log(`Processing: ${fullPath}`);
      
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Add viewport meta tag if missing
        if (!content.includes('name="viewport"')) {
          content = content.replace(
            '<head>',
            '<head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">'
          );
        }
        
        // Add desktop-optimized CSS
        if (!content.includes('desktop-optimized.css')) {
          content = content.replace(
            '</head>',
            '    <link rel="stylesheet" href="/assets/css/desktop-optimized.css">\n</head>'
          );
        }
        
        // Update container classes for better desktop viewing
        content = content.replace(
          /<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/g,
          '<div class="container">'
        );
        
        // Save the updated file
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
        
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  });
}

// Start processing from the root directory
const rootDir = path.join(__dirname);
console.log('Starting desktop optimization...');
processHtmlFiles(rootDir);
console.log('Desktop optimization complete!');
