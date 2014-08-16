define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var RequestService = require('app/services/RequestService');
    var AutocompleteService = require('app/services/AutocompleteService');
    var WeatherView = require('app/views/WeatherView');
    var AutocompleteView = require('app/views/AutocompleteView');
    var ModalView = require('app/views/ModalView');

    /**
     * Weather App Controller
     *
     * The constructor function for the app. This controller is responsible for
     * calling services and sending data to views for rendering.
     */
    var WeatherApp = function() {
        this.init();
    };

    var proto = WeatherApp.prototype;

    /**
     * Initializes the app.
     * Runs a single setupHandlers call, followed by createChildren and enable
     */
    proto.init = function() {

        return this.setupHandlers()
                   .createChildren()
                   .enable();
    };

    /**
     * Binds the scope of any handler functions
     * Should only be run on initialization of the view
     */
    proto.setupHandlers = function() {
        // Key press inside the search field
        this.keyPressHandler = this.keyPress.bind(this);
        this.autocompleteSuccessHandler = this.autocompleteSuccess.bind(this);
        this.autocompleteFailHandler = this.autocompleteFail.bind(this);

        // Request Service
        this.makeRequestSuccessHandler = this.makeRequestSuccess.bind(this);
        this.makeRequestFailHandler = this.makeRequestFail.bind(this);

        // When A City Is Clicked
        this.onCityClickHandler = this.onCityClick.bind(this);

        return this;
    };

    /**
     * Create any child objects or references to DOM elements
     * Should only be run on initialization of the view
     */
    proto.createChildren = function() {

        this.$search       = $('.js-search');
        this.$city         = $('.js-city');
        this.$autocomplete = $('.js-autocomplete');

        this.autocomplete     = new AutocompleteService();
        this.requestService   = new RequestService();
        this.weatherView      = new WeatherView($('.js-weatherInfo'));
        this.autocompleteView = new AutocompleteView($('.js-autocomplete'));
        this.modal            = new ModalView($('.js-modal'));

        return this;
    };

    /**
     * Enables the view
     * Performs any event binding to handlers
     * Exits early if it is already enabled
     */
    proto.enable = function() {
        // Setup any event handlers
        this.$search.keyup(this.keyPressHandler);
        this.$autocomplete.delegate('.js-city','click', this.onCityClickHandler);

        return this;
    };


    /**
     * Fired when keys are pressed in the input.
     * Grabs the query and sends it to the Autocomple Service.
     * Function waits until there are actually characters in the
     * input so it doesn't start when someone presses any key
     * while the input field is focused on.
     */
    proto.keyPress = function() {
        var query = this.$search.val();

        if (query.length > 0) {
            this.autocomplete.getCity(query)
                .done(this.autocompleteSuccessHandler)
                .fail(this.autocompleteFailHandler);
        }
    };

    /* Invoked when the autocomplete API successfully
     * returns an array of cities. A limit is applied here
     * but this could be abstracted into a service of its
     * own quite easily. Data then sent to the view for
     * rendering.
     */
    proto.autocompleteSuccess = function(cities) {
        var limit = 10;
        var limitedCities = [];

        $.each(cities, function(i, val) {
            limitedCities.push(cities[i]);
            return i+1 < limit; // Only show the number of items as indicated by the limit
        });

        this.autocompleteView.render(limitedCities);
    };

    /* Called when the autocomplete API doesn't
     * return the right response.
     */
    proto.autocompleteFail = function(error) {
        this.modal.reveal();
    };

    /* Called when a city from the returned list of
     * the autocomplete API is clicked. Initiates the
     * call to the API for weather conditions of the
     * selected city.
     */
    proto.onCityClick = function(event) {
        event.preventDefault();
        var $target = $(event.currentTarget);

        var query = $target.attr('data-query');

        this.weatherView.showLoader();
        this.$autocomplete.empty();
        this.$search.val('');
        this.weatherView.revealWeather();

        this.makeRequest(query);
    };

    /* Handles the calling of the weather API and
     * managing the success/fail calls.
     */
    proto.makeRequest = function(query) {
        this.requestService.requestConditions(query)
            .done(this.makeRequestSuccessHandler)
            .fail(this.makeRequestFailHandler);
    };

    /* If weather data is successfully called then
     * is send to the view for rendering and the loading
     * icon is hidden
     */
    proto.makeRequestSuccess = function(queryResult) {
        this.weatherView.hideLoader();
        this.weatherView.render(queryResult);
    };

    /* If weather data is unsuccessful then reveal
     * the modal.
     */
    proto.makeRequestFail = function() {
        this.modal.reveal();
    };

    return WeatherApp;
});