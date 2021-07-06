# MangaReader
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal-orange.svg?style=flat-square&logo=paypal)](https://www.paypal.me/RajarshiVaidya)
## Description

Cross platform(`MacOS, Win, Linux`) simple manga-reader/photoviewer entirely tuned up for reading purposes

## Snapshot

![Start Image](https://i.imgur.com/dUvbgqn.png)
![Manga Loaded Image](https://i.imgur.com/JtdABRo.png)

## Why I developed it

I was highly frustated of other manga readers functionality of changing chapters. They required me to re-select the next chapter whenever I finished reading the current chapter(an excuse! lol). Most of the desktop manga readers are all outdated. I wanna keep this one updated. So please create an issue for any of features that you miss in this app. Contributing to the development will be a great help. For downloading any mangas, I prefer using [FMD2](https://github.com/dazedcat19/FMD2)(Free Manga Downloader 2). You may use whatever you like.

## Highlights

This manga reader features :-

- two modes of image view(height & width mode)
- change images with left/right arrow keys
- select a particular chapter to view from the left collapsed-panel
- auto change chapter to next/previous whenever user presses the right/left arrow key on the last/first image of the current chapter.

## Download

Please check the [release](https://github.com/gmastergreatee/MangaReader/releases) page.

## Custom Build (Preferred way of downloading)

To create a custom build of the project :-

- download the latest build of electron from [here](https://github.com/electron/electron/releases) for your operating system
    - skip this step if you have already downloaded __any__ release version
- download the latest version of "app.rar" from [here](https://github.com/gmastergreatee/MangaReader/releases)
- extract the contents of electron build to any empty folder/directory of your choice
- navigate to the resources folder of the extracted electron build & delete default_app.asar
- extract the contents of "app.rar" here

To run the project, just double-click on "electron.exe" which was extracted from electron build.

## Further Development

I haven't tested this app on Linux/MacOS so all bug fixes are welcome.

If you want to work on any new feature, please create an issue first & then submit a pull request.

Anyone in need of a feature other than "downloading the manga", feel free to ask for it in the issues.

## Steps to setup development environment for the project

- clone the project
- run "npm install" in the "angular-view" directory to install all angular dependencies __(required once)__
- run "ng serve" in the "angular-view" directory to run the angular webpack
- install electron globally by the terminal command "npm install -g electron" __(required once)__
- modify the parameter "developmentMode" to "true" at line 8 in "index.js" present in the "electron-app" directory __(required once)__
- run command "electron ." in "electron-app" directory to run the electron project.
- any project changes to the angular view will be auto-refreshed in the electron app while development.
- any changes to "index.js" will require you to close "electron" window & restart it with the command("electron .")
