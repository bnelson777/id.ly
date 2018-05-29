# id.ly

The majority of user data today is stored on massive, server-centric systems that are often vulnerable to data breaches. id.ly is a cross-platform app developed to implement a self-sovereign identity system. id.ly uses an RSA public-key cryptosystem to share business cards and messages using encrypted json files. Users connect to each other via bluetooth and can be assured that the information shared is genuine and verified, since every user has full control over their data and with whom they choose to share it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine. This app has not been released to either the Apple App Store or Google Play so at this time can only be run in development mode.

### Installing

Clone a copy of the repository into your local machine. Run `npm install` to install the node.js packages.

## Running the app

For best results for permormance and testing, apps should be launched from either Android Studio or Xcode. However, simulators may also be used.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

### `react-native run-ios`

Attempts to open the app in the iOS Simulator if you're on a Mac and have it installed.

### `react-native run-android`

Attempts to open the app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). 

## Running Tests

Snapshot testing functionality was built into this project using jest test framework. Run using `npm test` and snapshots will be generated in the components folder under \_\_tests\_\_. Update changed snapshots using `npm test -- -u`.


## Built With

* [Create React Native App](https://github.com/react-community/create-react-native-app)
* [React Native](https://github.com/facebook/react-native)
* [Redux](https://github.com/reactjs/redux)
* [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* [Enzyme](https://github.com/airbnb/enzyme)
* [React Native ActionSheet](https://github.com/beefe/react-native-actionsheet)
* [React Native AES Kit](https://github.com/rocwangv/react-native-aes-kit)
* [React Native Autogrow Text Input](https://github.com/wix/react-native-autogrow-textinput)
* [React Native Camera](https://github.com/react-native-community/react-native-camera)
* [React Native Elements](https://github.com/react-native-training/react-native-elements)
* [React Native Fetch Blob](https://github.com/wkh237/react-native-fetch-blob)
* [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)
* [React Native Image Picker](https://github.com/react-community/react-native-image-picker)
* [React Native Keyboard Aware Scroll View](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
* [React Native Keyboard Spacer](https://github.com/Andr3wHur5t/react-native-keyboard-spacer)
* [React Native Permissions](https://github.com/yonahforst/react-native-permissions)
* [React Native QR Code](https://github.com/cssivision/react-native-qrcode)
* [React Native Router Flux](https://github.com/aksonov/react-native-router-flux)
* [React Native RSA](https://github.com/z-hao-wang/react-native-rsa)
* [React Native Sensitive Info](https://github.com/mCodex/react-native-sensitive-info)
* [React Native Simple Toast](https://github.com/vonovak/react-native-simple-toast)
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)


## Contributing

This app is a senior captone project for a group of computer science students at Portland State University. As such it is not currently available for outside contribution. However, please feel free to use the code for your own development as per the terms of the license.

## Acknowledgements

* **Alan Anderson-Priddy** - *Initial work*
* **Kal Toth, NextGenID** - *Initial work* - http://nexgenid.com/people/

See also the developers of this project under [contributors](https://github.com/bnelson777/id.ly/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
