# Visual Regression Testing

This project uses Playwright for visual regression testing to ensure UI consistency across changes.

## 📸 Snapshots by Platform

Visual regression tests generate platform-specific snapshots:

- **Linux**: `*-chromium-linux.png` (used in CI/CD)
- **Windows**: `*-chromium-win32.png` (for local development on Windows)
- **macOS**: `*-chromium-darwin.png` (for local development on macOS)

## 🧪 Running Tests Locally

### Run Tests

```bash
pnpm vrt
```

### Update Snapshots (Your Platform)

```bash
pnpm vrt:update
```

This will update snapshots for your current platform (Windows, macOS, or Linux).

## 🔄 Updating Linux Snapshots (for CI)

Since CI runs on Linux, you need to update Linux snapshots when the UI changes.

### Option 1: Use GitHub Actions (Recommended)

1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select **"Update Visual Regression Snapshots"** workflow
4. Click **"Run workflow"** button
5. Wait for the workflow to complete
6. The updated Linux snapshots will be automatically committed

### Option 2: Using Docker (Advanced)

```bash
# Run tests in a Linux container
docker run --rm -v ${PWD}:/work -w /work mcr.microsoft.com/playwright:v1.49.1 /bin/bash -c "npm install -g pnpm && pnpm install && pnpm vrt:update"
```

## 📊 Threshold Configuration

Current threshold: **0.04** (4% pixel difference allowed)

This threshold accounts for:

- Minor rendering differences between platforms
- Font rendering variations
- Anti-aliasing differences
- Small UI updates from new features

To adjust the threshold, edit `test/regression.spec.ts`:

```typescript
await expect(page).toHaveScreenshot("name.png", {
  threshold: 0.04, // Adjust this value
  clip: defaultClip,
})
```

## 🐛 When Tests Fail

If visual regression tests fail:

1. **Review the diff images** in `test/output/` directory
2. **Determine if changes are intentional**:

   - ✅ **Intentional**: Update snapshots with `pnpm vrt:update`
   - ❌ **Bug**: Fix the UI issue causing the difference

3. **For CI failures on Linux**:
   - Run the "Update Visual Regression Snapshots" workflow on GitHub
   - Or increase the threshold if differences are acceptable

## 📝 Adding New Visual Tests

1. Add new test cases in `test/regression.spec.ts`
2. Run `pnpm vrt:update` to generate initial snapshots
3. Commit both the test code and generated snapshots
4. Run the "Update Visual Regression Snapshots" workflow on GitHub to generate Linux versions

## 🚨 Important Notes

- **Always commit snapshots for all platforms** to support different development environments
- **CI uses Linux snapshots** - make sure they're up to date before release
- **[skip ci]** tag in snapshot commits prevents infinite workflow loops
- Snapshots are stored in `test/snapshots/regression.spec.ts-snapshots/`
