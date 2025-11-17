# Logo Setup Instructions

## Step 1: Copy Your Logo File

You need to copy your uploaded logo file (`Screen Shot 2024-06-27 at 2.37.31 PM (1).png`) to the `/public` folder with three variants:

1. **`/public/logo-light.png`** - White/light background version
2. **`/public/logo-gray.png`** - Gray background version  
3. **`/public/logo-dark.png`** - Black/dark background version

### Quick Setup Script

If your logo file is accessible, you can use the provided script:

```bash
./copy-logo.sh "/path/to/your/logo.png"
```

Or manually copy the file:

```bash
# Find your uploaded file first
find ~ -name "*Screen Shot*" -name "*.png" | head -1

# Then copy it (replace SOURCE with actual path)
cp "SOURCE" public/logo-light.png
cp "SOURCE" public/logo-gray.png
cp "SOURCE" public/logo-dark.png
```

## Step 2: Create Favicon and Apple Touch Icon

For the favicon and apple-touch-icon, use a simplified, high-contrast version:

```bash
# Use the dark variant for favicon (or create a simplified version)
cp public/logo-dark.png public/favicon.ico
cp public/logo-dark.png public/apple-touch-icon.png
```

**Note:** You may want to resize these to appropriate dimensions:
- `favicon.ico`: 32x32 or 16x16 pixels
- `apple-touch-icon.png`: 180x180 pixels

## Step 3: Edit Logo Variants (Recommended)

After copying, you should edit each variant to ensure they work well with their intended backgrounds:

- **logo-light.png**: Should be visible on white/light backgrounds
- **logo-gray.png**: Should be visible on gray backgrounds
- **logo-dark.png**: Should be visible on black/dark backgrounds

## Current Implementation

The logo component automatically:
- Detects the current theme (dark/light) and shows the appropriate variant
- Maintains aspect ratio and never stretches
- Falls back to text if images are missing
- Uses responsive sizing (150px desktop, 120px tablet, 100px mobile)

## Logo Usage

The logo is now integrated in:
- ✅ Navbar (responsive sizing)
- ✅ Footer (120px width)
- ✅ Home page hero (watermark, 600px, 5% opacity)
- ✅ Theme-aware (automatically switches based on dark/light mode)

## Troubleshooting

If the logo doesn't appear:
1. Check that files exist in `/public/` folder
2. Ensure file names match exactly: `logo-light.png`, `logo-gray.png`, `logo-dark.png`
3. Check browser console for 404 errors
4. The component will show text fallback if images are missing

