# Setup

    1. Start up a local server. Recommend [Fenix](http://fenixwebserver.com/), but MAMP or XAMP are cool too.

    2. Navigate to root of project directory

    3. Run `bower install`

    4. Run `npm install`

    5. Run `grunt`

    6. Project is ready to go! A new directory has been generated in the root called `web`, this is the compiled project. The base of the project is `index.html`.


If you want to build for production, just run `grunt` then `grunt requirejs`. This creates a file called `app.js` in your scripts directory that has been run through the r.js optimizer. You can then update the last script tag to simply link to app.js instead of having the global config options. I need to automate this...