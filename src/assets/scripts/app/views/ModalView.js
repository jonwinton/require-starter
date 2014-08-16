define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');

    /* A reference to classes somehow manipulated by the app */
    var CLASSES = {
        MODAL_HIDDEN: 'modal_hidden'
    };

    /**
     * Modal View
     */
    var ModalView = function($element) {
        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property $element
         * @type {jQuery}
         * @public
         */
        this.$element = $element;
    };

    var proto = ModalView.prototype;

    /* Reveals the modal */
    proto.reveal = function() {
        this.$element.removeClass(CLASSES.MODAL_HIDDEN);
    };

    return ModalView;
});