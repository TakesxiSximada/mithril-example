// -*- coding: utf-8 -*-
var path = require('path');


module.exports = {
    entry: {
        'index': './src/index.js',
        'vendor': './entry.js',
    },
    output: {
        path: path.join(__dirname, 'var'),
        filename: '[name].bundle.js',
    },
    modules: {
        loaders: [
            { test: /\.msx/, loader: 'msx-loader', exclude: /(node_modules|bower_components)/},
        ],
    },
    // plugins: [{
    //     m: 'mithril',
    // }],
};
