define(function(require, module, exports){
    'use strict';

    /**
     * Response Model
     *
     * Receives data then assigns it to a
     * property on a new instance of Response.
     */
    var Response = function(result) {
        this.zip               = result.location.zip;
        this.city              = result.location.city;
        this.state             = result.location.state;
        this.country           = result.location.country;
        this.lat               = result.location.lat;
        this.lon               = result.location.lon;
        this.feelsLike         = result.current_observation.feelslike_f;
        this.currentTemp       = result.current_observation.temp_f;
        this.currentConditions = result.current_observation.weather;
        this.icon              = result.current_observation.icon;
        this.iconUrl           = result.current_observation.icon_url;
        this.windSpeed         = result.current_observation.wind_mph;
        this.windDir           = result.current_observation.wind_dir;
    };

    return Response;
});