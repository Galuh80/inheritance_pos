odoo.define('inherited_pos.NumpadCustom', function(require) {
    'use strict';
    const NumpadWidget = require('point_of_sale.NumpadWidget');
    const Registries = require('point_of_sale.Registries');
    const { patch } = require('web.utils');
    const CustomNumpadWidget = (NumpadWidget) =>
        class extends NumpadWidget {
            setup() {
                super.setup();
                this.shortcuts = {
                    '+10': '+10000',
                    '+20': '+50000',
                    '+50': '+100000'
                };
            }
            
            async _onClickNumpad(event) {
                const target = event.target.closest('.input-button');
                if (!target) return;
                
                const action = target.dataset.action;
                if (this.shortcuts[action]) {
                    const value = this.shortcuts[action].replace('+', '');
                    this.state.buffer = value;
                    this.trigger('numpad-click-input', { key: this.shortcuts[action] });
                    return;
                }
                
                return await super._onClickNumpad(event);
            }
        };
        
    patch(NumpadWidget.prototype, 'inherited_pos.NumpadWidget', {
        setup() {
            this._super(...arguments);
            this.blockModes = ['price', 'disc'];
        },

        get currentOrder() {
            return this.env.pos.get_order();
        },

        async _onClickNumpad(event) {
            const target = event.target.closest('.input-button');
            if (!target) return;

            const mode = target.getAttribute('data-action') || target.getAttribute('data-mode');
            if (this.blockModes.includes(mode)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return await this._super(...arguments);
        },

        get hasPriceControlRights() {
            return false; // Prevent access to price button
        },

        get hasDiscountControlRights() {
            return false; // Prevent access to discount button
        },

        changeMode(mode) {
            if (this.blockModes.includes(mode)) {
                return false;
            }
            return this._super(...arguments);
        },

        async activateMode(mode) {
            if (this.blockModes.includes(mode)) {
                return false;
            }
            return await this._super(...arguments);
        },

        get allowedModes() {
            const modes = this._super();
            return modes.filter(mode => !this.blockModes.includes(mode));
        }
    });

    // CSS to hide buttons completely
    const style = document.createElement('style');
    style.textContent = `
        .pos .numpad .input-button[data-action="price"],
        .pos .numpad .input-button[data-action="disc"],
        .pos .numpad button[data-mode="price"],
        .pos .numpad button[data-mode="disc"],
        .pos .mode-button[data-mode="price"],
        .pos .mode-button[data-mode="disc"],
        .pos .numpad .input-button[data-action="discount"],
        .pos .numpad .mode-button[data-mode="discount"] {
            visibility: hidden !important;
            pointer-events: none !important;
            display: none !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            position: absolute !important;
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(style);

    // Force remove buttons after DOM load
    document.addEventListener('DOMContentLoaded', () => {
        const removeButtons = () => {
            const buttons = document.querySelectorAll(`
                .input-button[data-action="price"],
                .input-button[data-action="disc"],
                .mode-button[data-mode="price"],
                .mode-button[data-mode="disc"],
                .input-button[data-action="discount"],
                .mode-button[data-mode="discount"]
            `);
            buttons.forEach(button => button.remove());
        };

        removeButtons();
        setTimeout(removeButtons, 1000);
    });
    Registries.Component.extend(NumpadWidget, CustomNumpadWidget);
    return CustomNumpadWidget;
});