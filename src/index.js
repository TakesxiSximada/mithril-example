// -*- coding: utf-8 -*-
var m = require('mithril');
var views = require('msx-loader!./views.msx');


// .

// var Page = {
//     get: function (){
//         return m.request({method: 'GET', url: 'api/pages/show.json'});
//     },
//     list: function (){
//         return m.request({method: 'GET', url: 'api/pages/list.json'});
//     },
// };

// var Demo = {
//     controller: function (){
//         var pages = Page.list();
//         return {
//             pages: pages,
//             rotate: function(){
//                 pages().push(pages().shift());
//             },
//             redirect_show_page: function(page){
//                 m.route('/show/' + page.id);
//             },
//         };
//     },
//     view: function (ctrl){
//         return m('ul', [
//             ctrl.pages().map(function (page){
//                 return m('li', m('a', {
//                     href: "/?/show/" + page.id,
//                 }, page.title));
//             }),
//             m('button', {onclick: ctrl.rotate}, 'Rotate links'),
//         ]);
//     },
// };
// var Show = {
//     controller: function(){
//         var page_id = m.route.param('page_id');
//         return {
//             page: m.prop(Page.get(page_id)),
//         };
//     },
//     view: function(ctrl){
//         var page = ctrl.page();
//         return m('div', [
//             m('p', page.title),
//             m('p', page.url),
//             m('p', page.desciption),
//         ]);
//     },
// };
// m.route(document.querySelector('body'), '/', {
//     '/': Demo,
//     '/show/:page_id:': Show,
// });
// m.mount(document.querySelector('body'), Demo);

m.mount(document.querySelector('#first'), {
    controller: function (){
        return {};
    },
    view: function (ctl){
        return m('h1', 'first');
    },
});

m.mount(document.querySelector('#second'), {
    controller: function (){
        return {};
    },
    view: function (ctl){
        return m('h1', 'second');
    },
});

// model


var Page = function (data){
    this.id = m.prop(data.id);
    this.url = m.prop(data.url);
    this.title = m.prop(data.title);
    this.description = m.prop(data.description);
};
Page.prototype.save = function (){
    console.log('saving...');
    var url = this.id() == null ? EndpointURL.create : EndpointURL.update;
    return m.request({method: 'GET', url: url})
        .then(pages_factory);
    console.log('saved!!');
}

function page_factory(data){
    return new Page(data);
}

function pages_factory(datas){
    return datas.map(page_factory);
}


Page.query = {
    search: function (){
        return m.request({method: 'GET', url: EndpointURL.search})
            .then(pages_factory);
    },
    get: function (id){
        return m.request({method: 'GET', url: EndpointURL.read + '?page_id=' +  id})
            .then(function (pages){
                return pages[0];  // first
            }).then(page_factory);
    },
};



var EndpointURL = {
    create: '/api/pages/create.json',
    read: '/api/pages/read.json',
    update: '/api/pages/update.json',
    delete_: '/api/pages/delete.json',
    search: '/api/pages/search.json',
};


var PageList = Array;


function pages_controller(){
    var pages = m.prop(new PageList());
    var update_pages = function (){
        Page.query.search().then(function (_pages){
            pages(_pages);
        });
    };
    update_pages();

    return {
        pages: pages,
        rotate: function (){
            update_pages();
        },
        jump_create: function (){
            m.route('/create');
        }
    };
}

m.route(document.querySelector('#pages'), '/', {
    '/': {
        controller: pages_controller,
        view: views.page_list,
    },
    '/create': {
        controller: null,
        view: views.page_create,
    },
    '/show/:page_id:': {
        controller: function (){
            var page = m.prop();
            var page_id = m.route.param('page_id');
            Page.query.get(id=page_id)
                .then(page);

            return {
                page: page,
            };
        },
        view: views.show,
    },
    '/update': {
        controller: pages_controller,
        view: views.page_create,
    },
    '/delete': {
        controller: pages_controller,
        view: views.page_list,
    },
});
// m.mount(document.querySelector('#pages'), {
//     controller: pages_controller,
//     view: views.page_list,
// });
