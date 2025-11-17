# Manual Logo Copy Instructions

Due to macOS security restrictions, you need to copy the logo file manually.

## Quick Method (Terminal)

Open Terminal and run:

```bash
cd "/Users/yoni/THS : MILAD - CURSOR "
cp "/Users/yoni/Documents/Final Files-02.jpg" public/logo-light.png
cp "/Users/yoni/Documents/Final Files-02.jpg" public/logo-gray.png
cp "/Users/yoni/Documents/Final Files-02.jpg" public/logo-dark.png
```

Or use the provided script:

```bash
cd "/Users/yoni/THS : MILAD - CURSOR "
./copy-logo-now.sh
```

## Alternative Method (Finder)

1. Open Finder
2. Navigate to: `/Users/yoni/Documents/`
3. Find: `Final Files-02.jpg`
4. Copy it (Cmd+C)
5. Navigate to: `/Users/yoni/THS : MILAD - CURSOR /public/`
6. Paste it (Cmd+V)
7. Rename the copy to `logo-light.png`
8. Make two more copies and rename them to:
   - `logo-gray.png`
   - `logo-dark.png`

## After Copying

1. Refresh your browser (hard refresh: Cmd+Shift+R)
2. The logo should now appear!

## Verify It Worked

Run this command to check:

```bash
ls -lh "/Users/yoni/THS : MILAD - CURSOR /public/logo-*.png"
```

You should see three files:
- logo-light.png
- logo-gray.png
- logo-dark.png

