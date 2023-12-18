# Prototype Mobile App

# Requirements

- [Node JS](https://nodejs.org): >= 16
- [Yarn](https://yarnpkg.com/getting-started/install) >= 1.22
- [Cocoapods](https://cocoapods.org/): >= 1.12.1
- [Xcode](https://developer.apple.com/xcode/): >= 14.0
- [Android Studio](https://developer.android.com/studio): >= 2022.2.1
- JavaJDK: >= 11.0.16.1
- iOS: >= 11
- Android: >= 7.0

# Setup development environment

1. Install android simulator in the android studio
2. Goto the project folder and open the terminal
3. Run following commands in the project root

```
yarn install
yarn pod:install
```

# Run the project on Android

1- Open the terminal in the project root and run

```
yarn start
```

2- Open another terminal in the project root and run

```
yarn android
```

# Run the project on IOS

1- Open the terminal in the project root and run

```
yarn start
```

2- Open another terminal in the project root and run

```
yarn ios
```

**Steps to update Cocoapods**

```
sudo gem install cocoapods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ios
rm -Rf Pods; pod install
```

**Fix Xcode not opening**

1. Delete `Podfile.lock` file `rm -r ios/Podfile.lock`
2. Delete Pods directory `sudo rm -r ios/Pods`
3. Delete `WatsonMvp.xcworkspace` file `rm -r ios/WatsonMvp.xcworkspace`
4. Install packages `yarn install`
5. Install Pods `cd ios; pod install; cd ..;`
