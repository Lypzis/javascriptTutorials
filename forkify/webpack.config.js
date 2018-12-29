const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // bundle our scripts and dependencies here!
    entry: [
        'jquery',
        'babel-polyfill',
        './src/js/index.js'
    ],

    // send bundled file to the dist and also the index
    output: {
        path: path.resolve(__dirname, 'dist/'),
        // will generate this path to index <script> tag
        filename: 'js/bundle.js'
    },

    // start dev server for live testing
    devServer: {
        contentBase: './dist'
    },

    // 3rd party plugins
    plugins: [
        // automatically "copy" the src index to the dist, only visible to the webpack-server
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    // for Babel
    module: {
        rules: [
            {
                // following regex => look for all files of which ends with .js
                test: /\.js$/,
                // except those in node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
