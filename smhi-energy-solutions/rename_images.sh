#!/bin/bash

# Create necessary directories if they don't exist
mkdir -p assets/img/logo
mkdir -p assets/img/team

# Rename and move logo file
if [ -f "Attachments-Re_ website-2 2/SMHI pdf vector_230419_122454_Original.jpeg" ]; then
    echo "Renaming and moving logo file..."
    cp "Attachments-Re_ website-2 2/SMHI pdf vector_230419_122454_Original.jpeg" "assets/img/logo/logo-main.jpeg"
    echo "Logo saved as: assets/img/logo/logo-main.jpeg"
fi

# Rename and move team photo
if [ -f "Attachments-Re_ website-2 2/me_Original.jpeg" ]; then
    echo "Renaming and moving team photo..."
    cp "Attachments-Re_ website-2 2/me_Original.jpeg" "assets/img/team/team-owner.jpg"
    echo "Team photo saved as: assets/img/team/team-owner.jpg"
fi

echo "Image organization complete!"
