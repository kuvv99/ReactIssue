'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/reso"
const srcFolder = "./wwwroot/js/"

module.exports = {
    entry: [
        srcFolder + "app.jsx"
    ],
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: 'reso/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            }
        ]
    },
    plugins: [
    ]
};