// -*- coding: utf-8 -*-
var m = require('mithril');
var views = require('msx-loader!./views.msx');


var Page = {
    get: function (){
        return m.request({method: 'GET', url: 'api/pages/show.json'});
    },
    list: function (){
        return m.request({method: 'GET', url: 'api/pages/list.json'});
    },
};

var Demo = {
    controller: function (){
        var pages = Page.list();
        return {
            pages: pages,
            rotate: function(){
                pages().push(pages().shift());
            },
            redirect_show_page: function(page){
                m.route('/show/' + page.id);
            },
        };
    },
    view: function (ctrl){
        return m('ul', [
            ctrl.pages().map(function (page){
                return m('li', m('a', {
                    href: "/?/show/" + page.id,
                }, page.title));
            }),
            m('button', {onclick: ctrl.rotate}, 'Rotate links'),
        ]);
    },
};


var Show = {
    controller: function(){
        var page_id = m.route.param('page_id');
        return {
            page: m.prop(Page.get(page_id)),
        };
    },
    view: function(ctrl){
        var page = ctrl.page();
        return m('div', [
            m('p', page.title),
            m('p', page.url),
            m('p', page.desciption),
        ]);
    },
};

m.route(document.querySelector('body'), '/', {
    '/': Demo,
    '/show/:page_id:': Show,
});
// m.mount(document.querySelector('body'), Demo);
