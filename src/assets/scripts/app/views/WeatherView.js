define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');
    var Handlebars = require('handlebars');

    /* A reference to selectors used in the app */
    var SELECTORS = {
        WEATHER_TEMPLATE: '.weatherTemplate',
        PULSER: '.js-pulser',
        WEATHER_BOX: '.js-weatherContainer'
    };

    /* A reference to classes somehow manipulated by the app */
    var CLASSES = {
        PULSER_HIDE: 'pulser_hidden',
        BOX_HIDE: 'box_hidden'
    };

    /**
     * Weather View
     */
    var WeatherView = function($element) {
        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property $element
         * @type {jQuery}
         * @public
         */
        this.$element = $element;


        this.init();
    };

    var proto = WeatherView.prototype;

    /**
     * Initializes the View and performs any necessary setup.
     */
    proto.init = function() {
        this.createChildren();

        return this;
    };

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     */
    proto.createChildren = function() {
        this.$template   = $(SELECTORS.WEATHER_TEMPLATE);
        this.$pulser     = $(SELECTORS.PULSER);
        this.$weatherBox = $(SELECTORS.WEATHER_BOX);

        return this;
    };

    /* Hides the loading animation */
    proto.hideLoader = function() {
        this.$pulser.addClass(CLASSES.PULSER_HIDE);
    };

    /* Reveals the loading animation */
    proto.showLoader = function() {
        this.$pulser.removeClass(CLASSES.PULSER_HIDE);
    };

    /* Reveals the box where weather info is rendered */
    proto.revealWeather = function() {
        this.$weatherBox.removeClass(CLASSES.BOX_HIDE);
    };

    /* Renders the data passed into the function
     * using a Handlebars template defined in the
     * HTML. Reference the currentWeather.html partial
     */
    proto.render = function(result) {
        this.$element.empty();

        var source   = this.$template.html();
        var template = Handlebars.compile(source);
        var temp     = template(result[0]);

        this.$element.append(temp);
    };

    return WeatherView;
});