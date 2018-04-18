## Parkspot App

Template: for now containing a Button that calls the API on http://localhost:3000/parkspot to get the List of Parkspots an displaying the Count of Parkspots

Based on:

* [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
* [NativeBase](https://nativebase.io/)
* [React Navigation](https://reactnavigation.org/)
* [Redux](https://github.com/reactjs/redux)
* Using [Flow](https://flow.org/) as type checker

## Get Started

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
