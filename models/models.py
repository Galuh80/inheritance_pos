# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class inherited_pos(models.Model):
#     _name = 'inherited_pos.inherited_pos'
#     _description = 'inherited_pos.inherited_pos'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
from odoo import models, api

class PosConfig(models.Model):
    _inherit = 'pos.config'

    @api.model
    def disable_price_disc_buttons(self):
        return {
            'price_control_disabled': True,
            'discount_control_disabled': True
        }