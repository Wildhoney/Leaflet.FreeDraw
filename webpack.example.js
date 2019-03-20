const path = require('path');

module.exports = {
    entry: ['core-js', '@babel/polyfill', path.resolve('./example/js/default.js')],
    mode: process.env.NODE_ENV || 'production',
    output: {
        filename: 'build.js',
        path: path.resolve('./example/js'),
        libraryTarget: 'var'
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
