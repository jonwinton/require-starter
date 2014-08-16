define(function(require, module, exports){ // jshint ignore:line

    var $ = require('jquery');
    var City = require('app/models/CityModel');

    /*
     * Constants
     *
     * Includes the application specific URL with
     * specific params for application functionality.
     */
    var REQUEST_URL = 'http://autocomplete.wunderground.com/aq?query=';

    /**
     * Autocomplete Service
     */
    var AutocompleteService = function() {

        return this;
    };

    var proto = AutocompleteService.prototype;

    /**
     * getCity() passes a query string to the API and then
     * calls the success or fail handlers depending on what
     * the response is
     */
    proto.getCity = function(query) {

        var deferred = $.Deferred();

        $.ajax({
            url: REQUEST_URL + query + '&c=US',
            dataType: 'jsonp',
            type: 'GET',
            jsonp: 'cb',
            crossDomain: true,
            headers: 'text/html'

        })
            .done(this.getCitySuccess.bind(this, deferred))
            .fail(this.getCityFail.bind(this, deferred));

        return deferred.promise();
    };

    /**
     * Success function of the API call. Uses the City Model
     * to structure the data and push the objects into
     * an array which is returned to the controller
     */
    proto.getCitySuccess = function(deferred, response) {

        var results = response.RESULTS;
        var i = 0;
        var cities = [];

        for (i; i < results.length; i++) {
            var city = new City(results[i]);
            cities.push(city);
        }

        deferred.resolve(cities);
    };

    /**
     * Fail function of the API call. Returns an error
     * message to the controller
     */
    proto.getCityFail = function(deferred, result) {
        var errorMessage = 'Ajax call to getCities() failed!';
        deferred.resolve(errorMessage);
    };

    return AutocompleteService;
});