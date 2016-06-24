/**
 * Created by ravi.hamsa on 2/15/16.
 */

const webpack  = require('webpack');

const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./src/Selection.js",
    output: {
        path: __dirname,
        filename: "./build/selection-manager.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                warnings: false,
            },
        })]
};