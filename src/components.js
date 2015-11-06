// -*- coding: utf-8 -*-
var views = require('msx-loader!./views.msx');
var controllers = require('./controllers.js');

var list_page = {
    view: views.list,
    controller: controllers.list,
};
var create_page = {
    view: views.edit,
    controller: controllers.create,
};
var show_page = {
    view: views.show,
    controller: controllers.show,
};
var update_page = {
    view: views.edit,
    controller: controllers.update,
};
var delete_page = {
    view: views.delete_,
    controller: controllers.delete_,
};

module.exports.list_page = list_page;
module.exports.create_page = create_page;
module.exports.show_page = show_page;
module.exports.update_page = update_page;
module.exports.delete_page = delete_page;
