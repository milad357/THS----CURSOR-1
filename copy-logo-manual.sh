#!/bin/bash
# Try copying with different methods

SOURCE="/Users/yoni/Documents/Final Files-02.jpg"
DEST="/Users/yoni/THS : MILAD - CURSOR /public"

echo "Attempting to copy logo file..."
echo "Source: $SOURCE"
echo "Destination: $DEST"
echo ""

# Method 1: Direct cp
if cp "$SOURCE" "$DEST/logo-light.png" 2>/dev/null; then
    echo "✅ Method 1 (cp) worked!"
    cp "$SOURCE" "$DEST/logo-gray.png"
    cp "$SOURCE" "$DEST/logo-dark.png"
    exit 0
fi

# Method 2: Using ditto
if ditto "$SOURCE" "$DEST/logo-light.png" 2>/dev/null; then
    echo "✅ Method 2 (ditto) worked!"
    ditto "$SOURCE" "$DEST/logo-gray.png"
    ditto "$SOURCE" "$DEST/logo-dark.png"
    exit 0
fi

# Method 3: Using rsync
if rsync "$SOURCE" "$DEST/logo-light.png" 2>/dev/null; then
    echo "✅ Method 3 (rsync) worked!"
    rsync "$SOURCE" "$DEST/logo-gray.png"
    rsync "$SOURCE" "$DEST/logo-dark.png"
    exit 0
fi

echo "❌ All methods failed. Please copy manually using Finder."
