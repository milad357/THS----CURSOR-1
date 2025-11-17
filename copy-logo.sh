#!/bin/bash

# Script to copy logo file to public folder with three variants
# Usage: ./copy-logo.sh /path/to/your/logo.png

SOURCE_FILE="$1"

if [ -z "$SOURCE_FILE" ]; then
    echo "Usage: ./copy-logo.sh /path/to/your/logo.png"
    echo ""
    echo "Or manually copy your logo file to:"
    echo "  public/logo-light.png  (white background version)"
    echo "  public/logo-gray.png   (gray background version)"
    echo "  public/logo-dark.png    (black background version)"
    exit 1
fi

if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: File not found: $SOURCE_FILE"
    exit 1
fi

# Create public directory if it doesn't exist
mkdir -p public

# Copy the file to all three variants
# Note: You may want to edit these images separately to create proper variants
cp "$SOURCE_FILE" public/logo-light.png
cp "$SOURCE_FILE" public/logo-gray.png
cp "$SOURCE_FILE" public/logo-dark.png

echo "Logo files copied successfully!"
echo ""
echo "IMPORTANT: You should edit these files to create proper variants:"
echo "  - logo-light.png should have a white/light background"
echo "  - logo-gray.png should have a gray background"
echo "  - logo-dark.png should have a black/dark background"
echo ""
echo "For favicon and apple-touch-icon, use a simplified, high-contrast version:"
echo "  cp public/logo-dark.png public/favicon.ico"
echo "  cp public/logo-dark.png public/apple-touch-icon.png"

