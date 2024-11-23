{
    'name': 'POS Disable Price/Discount',
    'version': '16.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Custom POS Modifications',
    'description': """
        Custom modifications for Point of Sale
    """,
    'sequence': 0,  # Make sure it loads early
    'depends': ['point_of_sale'],
    'assets': {
        'web.assets_backend': [
            'inherited_pos/static/src/js/numpad.js',
        ],
        'web.assets_qweb': [
            'inherited_pos/static/src/xml/NumpadCustom.xml',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}