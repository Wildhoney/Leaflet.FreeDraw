const path = require('path');

module.exports = {
    entry: ['core-js', '@babel/polyfill', path.resolve('./src/FreeDraw.js')],
    mode: process.env.NODE_ENV || 'production',
    output: {
        filename: 'leaflet-freedraw.cjs.js',
        path: path.resolve('./dist'),
        libraryTarget: 'commonjs2'
    },
    externals: {
        'clipper-lib': true,
        leaflet: true,
        ramda: true
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
