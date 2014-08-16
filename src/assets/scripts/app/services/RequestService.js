define(function(require, module, exports){ // jshint ignore:line

    var $ = require('jquery');
    var Response = require('app/models/ResponseModel');

    /*
     * Constants
     *
     * Includes the application specific API key and the URL
     * with specific params for application functionality.
     */
    var API_KEY = '7d7726dd54bbc10e';
    var REQUEST_URL = '//api.wunderground.com/api/' + API_KEY + '/geolookup/conditions/'

    /**
     * Request Service
     */
    var RequestService = function() {
        return this;
    };

    var proto = RequestService.prototype;

    /**
     * requestConditions() passes a query string
     * to the API and then calls the success or
     * fail handlers depending on what the response is
     */
    proto.requestConditions = function(query) {

        var deferred = $.Deferred();

        $.ajax({
            url: REQUEST_URL + query + '.json',
            dataType: 'jsonp',
            type: 'GET',
            crossDomain: true
        })
            .done(this.requestConditionsSuccess.bind(this, deferred))
            .fail(this.requestConditionsFail.bind(this, deferred));

        return deferred.promise();
    };

    /**
     * Success function of the API call. Uses the Response Model
     * to structure the data and push the objects into
     * an array which is returned to the controller
     */
    proto.requestConditionsSuccess = function(deferred, result) {

        if (!result.location || !result.current_observation) {
            this.requestConditionsFail(deferred);
            return;
        }

        var queryResult = [];
        var response  = new Response(result);
        queryResult.push(response);

        deferred.resolve(queryResult);
    };

    /**
     * Fail function of the API call. Returns an error
     * message to the controller
     */
    proto.requestConditionsFail = function(deferred, result) {
        var errorMessage = 'Ajax call to requestConditions() failed!';
        deferred.reject(errorMessage);
    };


    return RequestService;
});