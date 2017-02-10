module.exports = {
    entry: './src/FreeDraw.js',
    output: {
        filename: './dist/leaflet-freedraw.cjs.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        leaflet: 'leaflet',
        'clipper-lib': 'clipper-lib',
        ramda: 'ramda'
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
