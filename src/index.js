// -*- coding: utf-8 -*-
var m = require('mithril');
var views = require('msx-loader!./views.msx');
var EndpointURL = require('./utils.js').EndpointURL;

var models = require('./models.js');
var Page = models.Page;
var PageList = models.PageList;


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
        view: views.list,
        controller: pages_controller,
    },
    '/create':{
        view: views.edit,
        controller: function (){
            var page = m.prop(new Page());
            return {
                page: page,
                save: function (){
                    page().save().then(function (page_){
                        m.route('/show/' + page_[0].id());
                    });
                },
            }
        },
    },
    '/show/:page_id:': {
        view: views.show,
        controller: function (){
            var page = m.prop();
            var page_id = m.route.param('page_id');
            Page.query.get(id=page_id)
                .then(page);

            return {
                page: page,
                go_edit: function (){
                    m.route('/update/' + page_id);
                },
                go_delete: function (){
                    m.route('/delete/' + page_id);
                },
            };
        },
    },
    '/update/:page_id:': {
        view: views.edit,
        controller: function (){
            var page = m.prop();
            var page_id = m.route.param('page_id');
            Page.query.get(id=page_id)
                .then(page);

            return {
                page: page,
                save: function (){
                    page().save().then(function(_){
                        m.route('/show/' + page_id);
                    });
                },
            };
        },

    },
    '/delete/:page_id:': {
        view: views.delete_,
        controller: function (){
            var page = m.prop();
            var page_id = m.route.param('page_id');
            Page.query.get(id=page_id)
                .then(page);
            return {
                delete_: function(){
                    page().delete_();
                    m.route('/');
                },
                go_back: function(){
                    m.route('/show/' + page_id);
                },
            };
        },
    },
});
