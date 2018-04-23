module.exports = {
    entry: './src/FreeDraw.js',
    output: {
        filename: './dist/leaflet-freedraw.cjs.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'clipper-lib': true,
        leaflet: true,
        ramda: true
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
