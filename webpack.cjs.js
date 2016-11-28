module.exports = {
    entry: ['babel-polyfill', './src/FreeDraw.js'],
    output: {
        filename: './dist/leaflet.freedraw.cjs.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        leaflet: 'L',
        d3: 'd3',
        'clipper-lib': 'ClipperLib',
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
