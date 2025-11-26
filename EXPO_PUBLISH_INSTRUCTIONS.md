# 📱 Expo Publishing Instructions

This guide provides step-by-step instructions for publishing the School Manager app to Expo for easy sharing and testing.

---

## 🎯 Publishing Options

### Option 1: Expo Go (Recommended for Demo)

**Best for**: Quick sharing, no account needed for viewers, instant updates

### Option 2: EAS Build (Production)

**Best for**: Standalone apps, production releases, app store submission

---

## 📦 Option 1: Publishing to Expo Go

### Prerequisites

- Expo account (create free at [expo.dev](https://expo.dev))
- Node.js 18+ installed
- Project dependencies installed

### Step 1: Install Expo CLI (if not already installed)

```bash
npm install -g expo-cli
```

### Step 2: Login to Expo

```bash
npx expo login
```

Enter your Expo credentials when prompted.

### Step 3: Verify Project Configuration

Ensure `app.json` has all required fields:

```json
{
  "expo": {
    "name": "Gestor Escolar",
    "slug": "School-Manager",
    "version": "1.0.0"
  }
}
```

### Step 4: Publish the App

```bash
cd School-Manager
npx expo publish
```

This will:

- Bundle your app
- Upload assets to Expo servers
- Generate a shareable URL and QR code

### Step 5: Share with Reviewers

After publishing, you'll receive:

- **QR Code**: For scanning with Expo Go app
- **URL**: Direct link to the app (e.g., `exp://exp.host/@username/School-Manager`)

**Share these with reviewers:**

```
📱 Test the School Manager App

1. Install Expo Go:
   - iOS: https://apps.apple.com/app/apple-store/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan this QR code with Expo Go (Android) or Camera app (iOS):
   [Your QR code image or link]

3. Or visit: exp://exp.host/@yourusername/School-Manager
```

### Step 6: Update README with QR Code

Add to your README.md:

```markdown
## 📱 Try the App

Scan this QR code with Expo Go to test the app:

![Expo Go QR Code](./assets/expo-qr-code.png)

Or visit: [Direct Link](exp://exp.host/@yourusername/School-Manager)
```

---

## 🏗️ Option 2: EAS Build (Standalone Apps)

### Prerequisites

- Expo account
- EAS CLI installed
- Apple Developer account (for iOS)
- Google Play Developer account (for Android)

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to EAS

```bash
eas login
```

### Step 3: Configure EAS Build

```bash
eas build:configure
```

This creates `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

### Step 4: Build for Android

```bash
# Preview build (for testing)
eas build --platform android --profile preview

# Production build (for Play Store)
eas build --platform android --profile production
```

### Step 5: Build for iOS

```bash
# Preview build (for testing)
eas build --platform ios --profile preview

# Production build (for App Store)
eas build --platform ios --profile production
```

### Step 6: Download and Test Builds

After the build completes:

- Download the APK (Android) or IPA (iOS)
- Install on physical device for testing
- Test all features thoroughly

---

## 📸 Creating Screenshots for README

### Step 1: Take Screenshots

Run the app and capture screens:

- Schools list view
- School detail view
- Class list with filters
- Form screens
- Dark mode examples
- Tablet layout

### Step 2: Organize Screenshots

```
assets/
  screenshots/
    school-list.png
    school-detail.png
    class-list.png
    create-form.png
    dark-mode.png
    tablet-view.png
```

### Step 3: Add to README

```markdown
## 📸 Screenshots

### Schools Management

<p align="center">
  <img src="./assets/screenshots/school-list.png" width="250" />
  <img src="./assets/screenshots/school-detail.png" width="250" />
  <img src="./assets/screenshots/create-form.png" width="250" />
</p>

### Dark Mode Support

<p align="center">
  <img src="./assets/screenshots/dark-mode.png" width="250" />
</p>
```

---

## 🎥 Creating a Demo Video (Optional)

### Tools

- **iOS**: Built-in screen recording (Control Center → Screen Recording)
- **Android**: Built-in screen recording (Quick Settings)
- **Desktop**: OBS Studio, QuickTime Player

### Recording Tips

1. **Duration**: Keep it 2-3 minutes max
2. **Content**: Show key features in action
3. **Flow**: Schools CRUD → Classes CRUD → Search/Filter → Dark Mode
4. **Quality**: 1080p or 720p minimum

### Hosting

- YouTube (unlisted)
- Vimeo
- Loom
- Google Drive

### Add to README

```markdown
## 🎥 Demo Video

Watch a quick demo of the app in action:

[![School Manager Demo](./assets/video-thumbnail.png)](https://your-video-link)
```

---

## ✅ Pre-Publishing Checklist

Before publishing, ensure:

### Code Quality

- [ ] All tests passing: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Code formatted: `npm run format`

### Configuration

- [ ] app.json has correct name and slug
- [ ] Version number updated (if needed)
- [ ] All assets are present (icon, splash screen)
- [ ] Bundle identifiers are correct

### Functionality

- [ ] All features working on iOS
- [ ] All features working on Android
- [ ] Mock API loads correctly
- [ ] Navigation flows work
- [ ] Forms validate properly
- [ ] Search and filters work
- [ ] Dark mode toggles correctly

### Documentation

- [ ] README is comprehensive
- [ ] Installation instructions are clear
- [ ] QR code/link added to README
- [ ] Screenshots included
- [ ] Known issues documented

---

## 🔄 Updating Published App

When you make changes and want to update:

```bash
# Update version in app.json
"version": "1.0.1"

# Publish update
npx expo publish
```

Users will automatically get the update when they reload the app.

---

## 🌐 Sharing with Technical Challenge Reviewers

### Email Template

```
Subject: Technical Challenge Submission - React Native School Manager

Dear Hiring Team,

I'm pleased to submit my completed React Native technical challenge.

📱 Live Demo:
- Expo Go QR Code: [Attached/Linked]
- Direct URL: exp://exp.host/@username/School-Manager

📚 Documentation:
- GitHub Repository: https://github.com/username/school-manager
- README: Complete installation and feature documentation
- Test Coverage: 260 tests passing, 80%+ coverage

🎯 Key Features Implemented:
✅ Complete Schools & Classes CRUD
✅ Real-time search and filtering
✅ Dark mode support
✅ Offline storage with AsyncStorage
✅ Comprehensive testing suite
✅ Production optimizations (Hermes, Metro)
✅ Accessibility (WCAG 2.1 AA)

⚡ Quick Start:
1. Install Expo Go from App Store / Play Store
2. Scan QR code or open URL
3. Test all features (no setup required)

The app demonstrates professional React Native development with:
- TypeScript strict mode
- Conventional commits
- Quality gates (Husky hooks)
- SOLID principles
- Clean Code practices

Thank you for your consideration!

Best regards,
[Your Name]
```

---

## 🐛 Troubleshooting

### Issue: "Unable to publish"

**Solution**: Ensure you're logged in

```bash
npx expo logout
npx expo login
```

### Issue: "Invalid slug"

**Solution**: Slug must be URL-friendly (lowercase, no spaces)

```json
{
  "slug": "school-manager" // Good
  // "slug": "School Manager" // Bad
}
```

### Issue: QR code not scanning

**Solution**:

- Ensure Expo Go is updated to latest version
- Try the direct URL instead
- Check network connectivity

### Issue: App not loading

**Solution**:

- Check that publish completed successfully
- Verify the URL is correct
- Try clearing Expo Go cache
- Republish if needed

---

## 📚 Additional Resources

- [Expo Publishing Documentation](https://docs.expo.dev/workflow/publishing/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Go App](https://expo.dev/client)
- [Creating Screenshots](https://docs.expo.dev/distribution/app-stores/)

---

## 🎉 Final Steps

1. ✅ Publish to Expo: `npx expo publish`
2. ✅ Save QR code image
3. ✅ Update README with QR code and URL
4. ✅ Take screenshots
5. ✅ Create demo video (optional)
6. ✅ Push to GitHub
7. ✅ Share with reviewers

**Your app is now ready for technical challenge submission!** 🚀

---

**Note**: For this technical challenge, Expo Go publishing is recommended as it provides the easiest way for reviewers to test your app without any setup.
