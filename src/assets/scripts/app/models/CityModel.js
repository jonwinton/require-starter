define(function(require, module, exports){
    'use strict';

    /**
     * City Model
     *
     * Receives data then assigns it to a
     * property on a new instance of City.
     */
    var City = function(city) {
        this.name = city.name;
        this.url  = city.l;
        this.lat  = city.lat;
        this.lon  = city.lon;
    };

    return City;
});
