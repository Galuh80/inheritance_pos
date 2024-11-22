odoo.define('pos_button_disable.DisableButtons', function (require) {
    "use strict";

    const PosConfig = require('point_of_sale.models').PosConfig;
    const models = require('point_of_sale.models');

    models.load_fields('pos.config', ['price_control_disabled', 'discount_control_disabled']);

    PosConfig.prototype.init = function (attributes, options) {
        this._super.apply(this, arguments);
        
        // Disable price button
        if (this.price_control_disabled) {
            this.price_control = false;
        }
        
        // Disable discount button
        if (this.discount_control_disabled) {
            this.discount_control = false;
        }
    };
});