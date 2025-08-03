import os
import re
from pathlib import Path

def optimize_html_file(file_path):
    """Optimize a single HTML file for desktop viewing."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Track if we made any changes
        modified = False
        
        # 1. Add scroll-smooth to html tag if not present
        if '<html ' in content and 'scroll-smooth' not in content:
            content = content.replace('<html ', '<html class="scroll-smooth" ')
            modified = True
        
        # 2. Update viewport meta tag
        viewport_pattern = r'<meta[^>]*name=["\']viewport["\'][^>]*>'
        new_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">'
        
        if re.search(viewport_pattern, content):
            content = re.sub(viewport_pattern, new_viewport, content)
            modified = True
        
        # 3. Add preload for critical resources if not present
        head_end = '</head>'
        preload_resources = '''
  <!-- Preload critical resources -->
  <link rel="preload" href="/assets/css/desktop-optimized.css" as="style">
  <link rel="preload" href="/assets/img/logo/logo-main.jpeg" as="image">
  <!-- Stylesheets -->
  <link href="https://cdn.tailwindcss.com" rel="stylesheet">
  <link href="/assets/css/styles.css" rel="stylesheet">
  <link href="/assets/css/desktop-optimized.css" rel="stylesheet">
'''
        if head_end in content and 'preload' not in content:
            content = content.replace(
                head_end,
                preload_resources + '  ' + head_end
            )
            modified = True
        
        # 4. Standardize container classes for better desktop layout
        container_patterns = [
            (r'class="max-w-7xl mx-auto py-16 px-6"', 'class="section bg-white"'),
            (r'class="max-w-4xl mx-auto text-center"', 'class="container text-center"'),
            (r'class="max-w-4xl mx-auto"', 'class="container"'),
            (r'class="bg-blue-700 text-white py-16 px-6"', 'class="section bg-gradient-to-br from-blue-700 to-blue-900 text-white"')
        ]
        
        for pattern, replacement in container_patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
                modified = True
        
        # 5. Add container divs where needed
        section_patterns = [
            (r'<section id="[^"]*" class="section bg-white">\s*<h2', 
             '<section id="\g<0>" class="section bg-white">\n    <div class="container">\n      <h2'),
            (r'<section id="[^"]*" class="section bg-gray-50">\s*<h2', 
             '<section id="\g<0>" class="section bg-gray-50">\n    <div class="container">\n      <h2')
        ]
        
        for pattern, replacement in section_patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
                modified = True
        
        # 6. Close container divs where needed
        content = content.replace('</section>', '    </div>\n  </section>')
        
        # 7. Add fade-in class to hero sections
        hero_pattern = r'(<section[^>]*class=["\'][^"\']*hero[^"\']*["\'][^>]*>\s*<div[^>]*class=["\'])'
        if re.search(hero_pattern, content):
            content = re.sub(hero_pattern, r'\1fade-in ', content)
            modified = True
        
        # Save the file if modified
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Optimized: {file_path}")
            return True
            
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
    
    return False

def optimize_html_files(directory):
    """Recursively optimize all HTML files in a directory."""
    optimized_count = 0
    
    for root, _, files in os.walk(directory):
        # Skip node_modules and other non-essential directories
        if any(skip_dir in root for skip_dir in ['node_modules', '.git', '.github', 'dist', 'build']):
            continue
            
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if optimize_html_file(file_path):
                    optimized_count += 1
    
    return optimized_count

if __name__ == "__main__":
    project_root = os.path.dirname(os.path.abspath(__file__))
    print("Starting desktop optimization...")
    
    optimized = optimize_html_files(project_root)
    
    print(f"\nOptimization complete! {optimized} HTML files were updated.")
    print("\nNext steps:")
    print("1. Test the website on different desktop screen sizes")
    print("2. Check for any layout issues")
    print("3. Verify that all links and interactive elements work correctly")
    print("\nNote: Some manual adjustments might be needed for specific pages.")
