module.exports = {
    entry: ['babel-polyfill', './src/FreeDraw.js'],
    output: {
        filename: './dist/leaflet.freedraw.cjs.js',
        libraryTarget: 'commonjs2'
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
