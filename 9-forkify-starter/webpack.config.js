const path = require('path');

module.exports = {
    // bundle scripts here
    entry: './src/js/index.js',
    // send bundled file to the dist
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    }
}