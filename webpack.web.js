const path = require('path');

module.exports = {
    entry: ['core-js', '@babel/polyfill', path.resolve('./src/FreeDraw.js')],
    mode: 'development',
    output: {
        filename: 'leaflet-freedraw.web.js',
        path: path.resolve('./dist'),
        libraryTarget: 'var'
    },
    externals: {
        leaflet: 'L',
        ramda: 'R'
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
