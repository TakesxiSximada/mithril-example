// -*- coding: utf-8 -*-
var m = require('mithril');
var page_components = require('./components.js');
var views = require('msx-loader!./views.msx');
var controllers = require('./controllers.js');


m.route(document.querySelector('#pages'), '/', {
    '/': page_components.list_page,
    '/create': page_components.create_page,
    '/show/:page_id:': page_components.show_page,
    '/update/:page_id:': page_components.update_page,
    '/delete/:page_id:': page_components.delete_page,
});
