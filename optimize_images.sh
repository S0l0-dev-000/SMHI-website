#!/bin/bash

# Create optimized directory if it doesn't exist
mkdir -p "images/optimized"

# Process each image
for img in "images logos /images for SMHI/"*.{jpg,jpeg,png}; do
    if [ -f "$img" ]; then
        # Get the base filename without path and extension
        filename=$(basename -- "$img")
        name="${filename%.*}"
        
        # Convert to WebP with 80% quality (adjust as needed)
        echo "Optimizing $filename..."
        convert "$img" -resize "1200x1200>" -quality 80 -strip "images/optimized/${name}.webp"
    fi
done

echo "Image optimization complete. Optimized images are in the 'images/optimized' directory."
