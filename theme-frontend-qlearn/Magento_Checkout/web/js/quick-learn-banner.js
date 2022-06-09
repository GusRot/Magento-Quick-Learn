define([
    'uiComponent',
    'ko',
    'mage/translate'
    ], function (
    Component,
    ko,
    $t
    )   {
    "use strict";

    return Component.extend({
        defaults: {
            message: $t("Welcome to") + " Quick Learn",
            template: "Magento_Checkout/quick-learn-banner",
            subtotal: ko.observable(0),
            isVisible: ko.observable(false),
            test: 20
        },

        initialize: function () {
            this._super();
            self = this;

            self.subtotal(Number(window.checkoutConfig.totalsData.subtotal).toFixed(2));
            console.log(this.subtotal._latestValue);
        },

        checkProducts: function() {
            if(Number(this.test) > 50) {
                return true
            } else return false
        },

        sumTotal: function() {
            this.subtotal(Number(this.subtotal._latestValue) + 1);
            
            if(this.isVisible._latestValue === false ) {
                this.isVisible(true)
            } else {
                this.isVisible(false)
            }
            
            console.log(this.subtotal._latestValue);
        },
    });
});


// require('uiRegistry').get('quick-learn-banner').subtotal(50)