// -*- coding: utf-8 -*-
var m = require('mithril');
var EndpointURL = require('./utils.js').EndpointURL;


var Page = function (data){
    data = data ? data : {};
    this.id = m.prop(data.id || '');
    this.url = m.prop(data.url || '');
    this.title = m.prop(data.title || '');
    this.description = m.prop(data.description || '');
};


Page.prototype.save = function (){
    console.log('saving...');
    var url = this.id() == null ? EndpointURL.create : EndpointURL.update;
    return m.request({method: 'GET', url: url})
        .then(pages_factory);
};


Page.prototype.delete_ = function (){
    console.log('delete');
};


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



var PageList = Array;

module.exports.Page = Page;
module.exports.PageList = PageList;
