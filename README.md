# MicroReader
An electron desktop app for [micro.blog](http://micro.blog).

## Downloading
You can grab the latest build from the [releases page](https://github.com/matthewroach/microreader/releases).
Currently there is only a Mac OS X release, I am working on getting builds for other OS’s. Electron allows to cross compile, but until I can test on the other OS’s I don’t want to publish releases for them just yet.

## Requirements
* NodeJS (>7.10.0)
* NPM (5.0.0)

## Running in Development Mode
Clone this repo or a fork of the repo, all the commands below are now run from the root /microreader directory

* cd into `microreader`
* Install NPM Modules - `npm install`

Once you have installed the NPM Modules:

### Single Commands Run

* `npm run dev` will start electron in `development` mode and start `webpack` dev server - You should see an electron window open, on first open it will appear blank, once webpack has compiled the assets you can refresh the electron window to get the running application

### Commands
Available commands to be run from the root folder as `npm run [command]`

* `build` - Used to compiles assets and build Mac OS X application
* `dev` - Used for single development mode - it runs `start:electron` and `webpack:dev` together
* `start:electron` - Will start the electron process in development mode
* `app:macosx` - Compiles the application to Mac OS X and puts the output in a folder /release-builds
* `webpack` - Compiles the JS to /js
* `webpack:dev` - Runs webpack dev server, used for development to make things faster


## License
[MIT](LICENSE)
