// -*- coding: utf-8 -*-
var m = require('mithril');

var Page = {
    list: function (){
        return m.request({method: 'GET', url: 'pages.json'});
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
        };
    },
    view: function (ctrl){
        return m('ul', [
            ctrl.pages().map(function (page){
                return m('li', m('a', {href: page.url}, page.title));
            }),
            m('button', {onclick: ctrl.rotate}, 'Rotate links'),
        ]);
    },
};

m.mount(document.querySelector('body'), Demo);
