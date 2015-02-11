# Senior Project

## Development

### Setting Up Your Environment

This application runs on Node.JS, and you will require it to develop the application and to build binaries (the binaries themselves are standalone, however). You will also need a couple other Node tools: Grunt to build the binaries, and Bower to manage third-party web library dependencies.

Follow these steps to set up your environment to develop and/or build this project:

1. Install [Node.JS](http://nodejs.org/download/)
2. Install Grunt and Bower by running the command `npm install -g grunt-cli bower`
3. Clone this repository
4. In the project directory run the command `npm install`

### Developing The Application

All of the application code is located in the `app/` directory. To run the application, run `grunt run`.

If you need to add a third-party web library, it is best to use Bower, as it will automatically download dependencies for you without having to include them in the project git repository. Find the package name for your library [here](http://bower.io/search/) and run `bower install --save [package-name]`. This will download your library to `app/vendor` and also save it in `bower.json`, which will automatically install all saved dependencies whenever you run `npm install`.

If you need to add an npm package, run `npm install --save [package-name]`. Include it in your script files with `require("package-name")`.

### Building Binaries

To compile the project into a distributable binary, run `grunt build`. This will create binaries for Windows and OSX, in both 32 and 64 bit by default. If you really want Linux binaries, run `grunt build-linux`.

### Building an Installer

Currently we only support building a Windows 32-bit installer, and you can only build on a Windows machine. Building this installer will require that you install [NSIS 2.46](http://nsis.sourceforge.net/Download), and that it is installed in `C:\Program Files (x86)\NSIS`. To build the installer, run `grunt build-installer`.