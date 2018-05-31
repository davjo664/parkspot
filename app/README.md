# Parkspot App

## Parkspot App Distribution
### Installation

 Provide your email address and whether you want to use iOS or Android to Jonas Graf (jg115@hdm-stuttgart.de) and you will be added to the group for Android or iOS.

 For iOS: you also have to provide your Device UUID. (How to find your UUID: https://help.apple.com/xcode/mac/current/#/dev93ef696c6?sub=devca47eaad4) to be able install the app.

 You will now receive an email with the installation link and further help from Appcenter each new release. (Note you have to register at appcenter.ms during the installation process.)


### Distribution
Updates containing native changes are made via a new release in Appcenter. Changes in the JavaScript can be released via the appcenter-cli (`npm install -g appcenter-cli`). Then run 
`apcenter login`

Distribution during the development is made using VS Appcenter (appcenter.ms). It consists of 2 parts 1. the native App 2. the JavaScript content.

#### Full
To fully deploy a new version of the app, you can use `yarn ios-deploy` for iOS and `yarn android-deploy` for Android. 

#### JavaScript Update
Use `yarn android-deploy-codepush` for Android or `yarn ios-deploy-codepush` for iOS to deploy JavaScript updates.

#### Build and Archive app
For the iOS App you have to run `yarn ios-deploy` on a Mac with XCode and the XCode CLI installed. After quite some time, you can find the app (.ipa) under `app/build/`.
for the Android App you have to run `yarn android-deploy-build`. You can then find the app under `app/build/outputs/apk/release`.

#### Uploading
To upload the built and archived apps you have to run `ios-deploy-upload` and `android-deploy-upload`.


## Parkspot App Development

Based on:

* [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
* [NativeBase](https://nativebase.io/)
* [React Navigation](https://reactnavigation.org/)
* [Redux](https://github.com/reactjs/redux)
* Using [Flow](https://flow.org/) as type checker


## Get Started Development

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html) setup for your iOS / Android on your OS
* [CocoaPods](https://cocoapods.org/)

### 2. Installation

On the command prompt run the following commands

```sh
$ cd parkspot/app

$ npm install
  or
  yarn
```

For iOS:

```sh
$ cd parkspot/app/ios

$ pod install
```

If you want open the Xcode Project then use the .xcworkspace file instead of the project file.

#### Run on iOS

* Run `npm run ios` in your terminal

#### Run on Android

* Run `npm run android` in your terminal

## Structure

### root level:

| path           | Content            |
| -------------- | ------------------ |
| `./assets`     | static assets      |
| `./android`    | android build      |
| `./ios`        | ios build          |
| `./flow-typed` | flow config        |
| `./src`        | app implementation |

### `./src` level:

| under `./src` | Content                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `App.js`      | Root of the App containing the Navigation                                                                                                                                                     |
| `/boot`       | store and App config, usually no changes here                                                                                                                                                 |
| `/components` | smaller self containing Components used in multiple Screens                                                                                                                                   |
| `/container`  | smart React Components containing Screens. Connected to the App state via Redux passing variables/actions down to Screens. Also Containing the actions and reducers for this Containers state |
| `/reducers`   | combines all reducers from the containers -> add new ones here                                                                                                                                |
| `/screens`    | dump React Components only displaying content they get passed from containers. Nested inside a Container                                                                                      |
| `/theme`      | the native base theme (mostly leave it )                                                                                                                                                      |
