# How to Remove Logo Background

The logo image files currently have a dark background. To make them transparent:

## Option 1: Using Online Tool (Easiest)
1. Go to https://www.remove.bg/ or https://photopea.com/
2. Upload your logo file: `/Users/yoni/Documents/Final Files-02.jpg`
3. Remove the background
4. Export as PNG with transparency
5. Save as:
   - `public/logo-light.png` (for light backgrounds)
   - `public/logo-gray.png` (for gray backgrounds)
   - `public/logo-dark.png` (for dark backgrounds)

## Option 2: Using Photoshop/GIMP
1. Open the logo file
2. Use Magic Wand or Background Eraser tool
3. Select and delete the background
4. Export as PNG-24 with transparency enabled
5. Replace the files in `public/` folder

## Option 3: Using ImageMagick (Command Line)
```bash
# Install ImageMagick: brew install imagemagick
# Then run:
convert "public/logo-dark.png" -fuzz 10% -transparent black "public/logo-dark-transparent.png"
```

After updating the files, refresh your browser to see the transparent logo!
