// -*- coding: utf-8 -*-
var m = require('mithril');
var models = require('./models.js');
var Page = models.Page;
var PageList = models.PageList;


function list(){
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


function create(){
    var page = m.prop(new Page());
    return {
        page: page,
        save: function (){
            page().save().then(function (page_){
                m.route('/show/' + page_[0].id());
            });
        },
    };
}

function show(){
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

}

function update(){
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
}


function delete_() {
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
}


module.exports.list = list;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.delete_ = delete_;
