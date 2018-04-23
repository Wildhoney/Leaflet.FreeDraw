module.exports = {
    entry: ['babel-polyfill', './src/FreeDraw.js'],
    output: {
        filename: './dist/leaflet-freedraw.web.js',
        libraryTarget: 'var'
    },
    externals: {
        leaflet: 'L',
        ramda: 'R'
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
