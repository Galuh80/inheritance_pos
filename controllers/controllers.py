# -*- coding: utf-8 -*-
# from odoo import http


# class InheritedPos(http.Controller):
#     @http.route('/inherited_pos/inherited_pos', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/inherited_pos/inherited_pos/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('inherited_pos.listing', {
#             'root': '/inherited_pos/inherited_pos',
#             'objects': http.request.env['inherited_pos.inherited_pos'].search([]),
#         })

#     @http.route('/inherited_pos/inherited_pos/objects/<model("inherited_pos.inherited_pos"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('inherited_pos.object', {
#             'object': obj
#         })
