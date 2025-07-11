# React Native CLI - Mobile Dev Test App

This is a React Native CLI-based mobile application built as part of a mobile development technical assessment. It fetches and displays a list of items from a public API, with a modern UI, authentication, and detailed views — all using clean architecture, Redux, and Jest for testing.

---

## 📱 Features

* ✅ *Login Screen* – Simple username/password with navigation to Home
* ✅ *Home Screen* – Searchable, scrollable list of posts with user & metadata
* ✅ *Detail Screen* – Shows full details of a selected post
* ✅ *Profile Screen* – Accessible via bottom tab navigation
* ✅ *Logout with Alert Confirmation*
* ✅ *React Navigation (Stack + Bottom Tabs)*
* ✅ *State Management via Redux Toolkit*
* ✅ *Data Fetching via Fetch API*
* ✅ *Unit Tests using Jest + React Native Testing Library*
* ✅ *Reusable Components & Mocked Redux Logic for Tests*

---

## 📂 Folder Structure


src/
├── assets/               # Images & fonts
├── components/           # Reusable UI components (e.g., Card, Spinner)
├── navigation/           # Stack & Tab navigation setup
├── screens/              # Login, Home, Detail, Profile screens
├── state/
│   ├── hooks.ts          # useAppDispatch/useAppSelector
│   ├── store.ts          # Redux store setup
│   └── slices/           # Redux slices (auth, items)
└── utils/                # Reusable helper functions
__tests__/                # Unit tests for screens & components


---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 16.x
* npm >= 8.x
* Android Studio (for emulator or device deployment)
* Xcode (for iOS testing, optional)

### Installation

bash
git clone https://github.com/your-username/react-native-cli-test-app.git
cd react-native-cli-test-app
npm install


### Running on Android

bash
npx react-native run-android


### Running on iOS

bash
npx pod-install
npx react-native run-ios


---

## 🧪 Running Tests

bash
npm test


> Includes coverage for:
>
> * HomeScreen
> * LoginScreen
> * ProfileScreen
> * DetailScreen
>   With mocked Redux state and navigation.

---

## 🔄 API Used

[https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

---

## ✅ Submission Summary

* 🔹 Used Redux Toolkit for state management
* 🔹 Stack + Bottom Tab navigation
* 🔹 Fully implemented search, logout, and profile tab navigation
* 🔹 Jest unit tests for all major screens
* 🔹 Mocked useSelector, useDispatch, and async thunks for test coverage
