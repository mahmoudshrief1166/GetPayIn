# 🛍️ GetPayIn Challenge App

## 📂 Repository
https://github.com/mahmoudshrief1166/GetPayIn

---

## 📱 Overview
This React Native application lets users browse products, filter by categories (via dropdown), and includes offline handling, auto-lock with biometrics (and password fallback), theming, and role-based admin actions.

---

## ⚙️ Setup & Run Instructions

### 1. Clone the repository
```bash
git clone https://github.com/mahmoudshrief1166/GetPayIn.git
cd GetPayInChallenge

### 2. Install dependencies
npm install
# or
yarn install

### 3. iOS (macOS only)
cd ios
pod install
cd ..

### 4. Run the app
Android:
npx react-native run-android

iOS:
npx react-native run-ios

Superadmin (testing)
Use this account to test admin-only features (delete product, etc.):
username: emilys
password: emilyspass

Biometric fallback password (for modal password fallback / dev testing):
fallback password: 1234

🛒 Category Dropdown Behavior
The app supports dynamic categories. The dropdown lists all available categories from the API — users select any category and the products list will filter accordingly. The app is not hardcoded to a single category.

Main Features

Authentication (login + token stored in MMKV)

Session restore & biometric modal + password fallback

Auto-lock after inactivity / when app goes to background

Products listing (2-column responsive grid) & pull-to-refresh

Category filtering via dropdown (dynamic)

Offline indicator & basic offline cache (MMKV)

Theme support (light/dark)

Role-based UI: admin-only delete button

React Query for data fetching & caching

Redux Toolkit for app state

Responsive sizing using percentage helpers

🚀 Build (Release) - Android

Generate a signed release APK / AAB:

Prepare Keystore and set properties in android/gradle.properties (see Android docs).

Build release AP
cd android
./gradlew assembleRelease

Output APK:
android/app/build/outputs/apk/release/app-release.apk

Install to device:
adb install android/app/build/outputs/apk/release/app-release.apk

⚖️ Trade-offs & If I Had More Time
Trade-offs made
Product deletion is simulated locally (no real backend deletion).
Basic test coverage only (core flows).
Biometric fallback uses a local stored test password for demo.

If I had more time
Add integration/e2e tests and improve unit coverage.
Implement server-side product CRUD and proper secure fallback.
Add pagination/infinite scroll and more robust offline sync.
Polish animations, add accessibility and localization.

🔧 Tech Stack
React Native + TypeScript
Redux Toolkit
React Query
react-native-mmkv (local storage)
react-native-biometrics
react-native-toast-message
react-navigation

👤 Author
Mahmoud Shrief
React Native Developer
