require(
    // The only purpose of this file is to kick off the application's top-level
    // controller at the appropriate time.
    //
    // Note that since this is the application entry-point, traditional
    // RequireJS syntax is used here to specify dependencies. Do not use this
    // syntax in any other modules.
    [
        'App'
    ],
    function(
        App
    ) {
        'use strict';

        // Initialize
        window.app = new App();
    }
);
