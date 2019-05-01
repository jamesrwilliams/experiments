# Hardflip

This project has grown out of my [multi-project-build-script](https://github.com/jamesrwilliams/experiments/tree/master/javascript/gulp/multi-project-build-script) gulp project that got a little more complicated than I had hoped. Turns out this is best served as an electron project, so here we are! 

## The idea

A development client for small standalone HTML projects that fit into larger applications. **Hardflip** acts as a preview server, loading provided files into a preview environment including target width, styles, and scripts. 

## Usage

### In Browser

You can run `ng serve` for a standard angular dev server. Navigate to `http://localhost:4200/`. This version of the app will automatically reload if you change any of the source files.

### Standalone

You can run this project as an native desktop app with the following command:

```js
npm run electron-build
```

## Reading

- [Electron + Angular - Quick start ](https://angularfirebase.com/lessons/desktop-apps-with-electron-and-angular/)
- [Electron + Angular - Communication](https://dev.to/michaeljota/integrating-an-angular-cli-application-with-electron---the-ipc-4m18)
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

