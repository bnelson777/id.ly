# id.ly

The majority of user data today is stored on massive, server-centric systems that are often vulnerable to data breaches. id.ly is a cross-platform app developed to implement a self-sovereign identity system. id.ly uses an RSA public-key cryptosystem to share business cards and messages using encrypted json files. Users connect to each other via bluetooth and can be assured that the information shared is genuine and verified, since every user has full control over their data and with whom they choose to share it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Please note that this app is currently in development, so not all features have been fully implemented.

### Installing

Clone a copy of the repository into your local machine.

## Running the app

### `npm start`

Runs the app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). 

## Built With

* [Create React Native App](https://github.com/react-community/create-react-native-app)
* [React Native](https://github.com/facebook/react-native)
* [Redux](https://github.com/reactjs/redux)

## Contributing

This app is a senior captone project for a group of computer science students at Portland State University. As such it is not currently available for outside contribution. However, please feel free to use the code for your own development as per the terms of the license.

## Acknowledgements

* **Alan Anderson-Priddy** - *Initial work*

See also the developers of this project under [contributors](https://github.com/bnelson777/id.ly/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
