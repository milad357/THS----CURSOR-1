#!/bin/bash

# Run this AFTER restarting Terminal
# This will copy your logo file to the public folder

SOURCE="/Users/yoni/Documents/Final Files-02.jpg"
DEST_DIR="/Users/yoni/THS : MILAD - CURSOR /public"

echo "📋 Copying logo files..."
echo ""

if [ ! -f "$SOURCE" ]; then
    echo "❌ Error: Logo file not found at: $SOURCE"
    exit 1
fi

# Copy the three variants
cp "$SOURCE" "$DEST_DIR/logo-light.png" && echo "✅ logo-light.png copied"
cp "$SOURCE" "$DEST_DIR/logo-gray.png" && echo "✅ logo-gray.png copied"
cp "$SOURCE" "$DEST_DIR/logo-dark.png" && echo "✅ logo-dark.png copied"

# Create favicon files
cp "$DEST_DIR/logo-dark.png" "$DEST_DIR/favicon.ico" && echo "✅ favicon.ico created"
cp "$DEST_DIR/logo-dark.png" "$DEST_DIR/apple-touch-icon.png" && echo "✅ apple-touch-icon.png created"

echo ""
echo "✅ All files copied successfully!"
echo ""
echo "Files created:"
ls -lh "$DEST_DIR"/logo-*.png
echo ""
echo "🎉 Done! Now refresh your browser (Cmd+Shift+R) to see the logo."

