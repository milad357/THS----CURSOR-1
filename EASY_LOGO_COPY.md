# Easy Logo Copy - macOS Permission Issue Workaround

## The Problem
macOS is blocking Terminal from accessing files in your Documents folder for security reasons.

## Solution: Use Finder (Drag & Drop)

### Step 1: Open Both Folders

I've opened both folders for you. You should see:
- **Documents folder** - where your logo file is
- **public folder** - where it needs to go

### Step 2: Copy the File

1. In the **Documents** folder, find: `Final Files-02.jpg`
2. **Copy it** (Cmd+C or right-click → Copy)
3. Go to the **public** folder window
4. **Paste it** (Cmd+V) - this creates the first copy
5. **Rename** this copy to: `logo-light.png`
6. **Paste again** (Cmd+V) - second copy
7. **Rename** to: `logo-gray.png`
8. **Paste one more time** (Cmd+V) - third copy
9. **Rename** to: `logo-dark.png`

### Step 3: Verify

After copying, you should have these 3 files in the public folder:
- ✅ logo-light.png
- ✅ logo-gray.png
- ✅ logo-dark.png

### Step 4: Refresh Browser

Refresh your browser (Cmd+Shift+R) and the logo should appear!

---

## Alternative: Fix Terminal Permissions

If you want to use Terminal in the future, you can grant it Full Disk Access:

1. Open **System Preferences** → **Security & Privacy** → **Privacy**
2. Select **Full Disk Access** from the left sidebar
3. Click the lock icon and enter your password
4. Click the **+** button
5. Navigate to: `/Applications/Utilities/Terminal.app`
6. Add Terminal and restart it

Then you can use the copy commands in Terminal.

