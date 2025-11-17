#!/bin/bash

# Script to copy logo file to public folder
# Run this script in Terminal: ./copy-logo-now.sh

SOURCE="/Users/yoni/Documents/Final Files-02.jpg"
DEST_DIR="/Users/yoni/THS : MILAD - CURSOR /public"

if [ ! -f "$SOURCE" ]; then
    echo "❌ Error: Logo file not found at: $SOURCE"
    exit 1
fi

echo "📋 Copying logo file..."
cp "$SOURCE" "$DEST_DIR/logo-light.png"
cp "$SOURCE" "$DEST_DIR/logo-gray.png"
cp "$SOURCE" "$DEST_DIR/logo-dark.png"

echo "✅ Logo files copied successfully!"
echo ""
echo "Files created:"
ls -lh "$DEST_DIR"/logo-*.png

echo ""
echo "🎉 Done! Now refresh your browser to see the logo."

