# Ionic 1 Starter Template with ES6 Support

This project was generated by Generator-M-Ionic, and adapted by Jeremy Li to support ES6 transpilation.

For more info visit the [repository](https://github.com/mwaylabs/generator-m-ionic) or check out the README below.

# Setup Instructions

```
git clone https://github.com/jairemix/ionic1-es6-starter.git
cd ionic1-es6-starter
npm install
bower install
cordova prepare #adds platforms and plugins defined in config.xml
```

# Development Tools

In order to run the app on an iOS/Android device, you will need to install the relevant SDKs.

For iOS, all you need is to have the latest version of Xcode installed

For Android, you will need the Android SDK. Android Studio is not required (but it is still useful for debugging). These can be obtained [here](http://developer.android.com/sdk/installing/index.html).

You will also need to download the following SDK packages:

* Android SDK Tools
* Android SDK Platform-tools
* Android SDK Build-tools

Instructions on how to do so are available at http://developer.android.com/sdk/installing/adding-packages.html

You will also need to install the ionic node module (sudo might be required):

```
npm install -g ionic
```

# Running the app in the browser

To run the app in the browser:

```
gulp watch #launches the app in the browser and live-reloads the contents of the app folder
```

The port is set to 3000 by default. If you need another port, it is configurable in gulp/watching.js

This project is configured to use ES2015, which is supported by the newest versions of both mobile and desktop Chrome and Safari (verified as early as Dec 2016).
For testing in older browsers (e.g. mobile Safari on iOS9)c, however, you will need to use the build command to transpile the project:

```
gulp watch-build [--minify / --noDebug]
#transpiles, concatenates and copies the project files to the www folder
#then launches the app in the browser, live-reloading the contents of the www folder
```

To only create the www folder without launching the app

```
gulp build [--minify / --noDebug]
```

The --minify and --noDebug options are to be used when creating the release build. They minify the JS and CSS files and remove the debugging scripts from the build.

# ESLint

The gulp watch and gulp watch-build tasks trigger ESLint to run, which parses the JS files for syntax errors (as well as styling inconsistencies). ESLint rules can be configured in .eslintrc and app/.eslintrc

Some ESLint errors (e.g. spacing and indentation) can be fixed automatically by running:

```
gulp eslint-fix
```

# Running the app on a mobile device

The following command builds both the www folder and the platforms folder so that the project is ready to be opened and run in Xcode and Android Studio.

```
gulp build-mobile
```
