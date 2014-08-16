define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');
    var Handlebars = require('handlebars');

    /**
     * Autocomplete View
     */
    var AutocompleteView = function($element) {
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

    var proto = AutocompleteView.prototype;

    /**
     * Initializes the View.
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
        this.$template =  $('.autocompleteTemplate');

        return this;
    };

    /* Renders the data passed into the function
     * using a Handlebars template defined in the
     * HTML. Reference the autocomplete.html partial
     */
    proto.render = function(result) {
        this.$element.empty();

        var source = this.$template.html();
        var template = Handlebars.compile(source);
        var temp = template(result);
        this.$element.append(temp);
    };

    return AutocompleteView;
});