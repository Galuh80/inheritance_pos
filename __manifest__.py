# -*- coding: utf-8 -*-
{
    'name': "POS",

    'summary': """
        Modul Inheritance dari POS""",

    'description': """
        Modul tambahan untuk POS
    """,

    'author': "Galuh Esa Ibrahim",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'POS',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','point_of_sale'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_button_disable/static/src/js/disable_buttons.js',
        ],
    },
    'installable': True,
    'application': True,
}
