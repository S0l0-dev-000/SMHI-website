#!/bin/bash

# Create necessary directories if they don't exist
mkdir -p assets/img/services
mkdir -p assets/img/portfolio

# Move and rename images based on their content
# Assuming the images are related to different services/portfolio items

# Move images from "Attachments-Re_ website" directory
if [ -d "Attachments-Re_ website" ]; then
    echo "Organizing images from 'Attachments-Re_ website'..."
    
    # Move service/portfolio images
    for img in "Attachments-Re_ website/"*.{jpg,jpeg,png}; do
        if [ -f "$img" ]; then
            # Extract filename without path
            filename=$(basename -- "$img")
            # Create a clean name (lowercase, replace spaces with hyphens)
            clean_name=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/_-_/-/g')
            # Copy to services directory
            cp "$img" "assets/img/services/$clean_name"
            echo "Moved $filename to assets/img/services/$clean_name"
        fi
    done
fi

echo "Image organization complete!"

# Display the new image structure
echo -e "\nCurrent image structure:"
tree assets/img/
