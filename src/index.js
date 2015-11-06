// -*- coding: utf-8 -*-
var m = require('mithril');
var pages_components = require('./pages/components.js');


m.route(document.querySelector('#pages'), '/', {
    '/': pages_components.list_page,
    '/create': pages_components.create_page,
    '/show/:page_id:': pages_components.show_page,
    '/update/:page_id:': pages_components.update_page,
    '/delete/:page_id:': pages_components.delete_page,
});
