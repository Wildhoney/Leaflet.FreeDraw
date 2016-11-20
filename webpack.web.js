module.exports = {
    entry: ['babel-polyfill', './src/FreeDraw.js'],
    output: {
        filename: './dist/leaflet-freedraw.web.js',
        library: 'FreeDraw',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/i
            }
        ]
    }
};
