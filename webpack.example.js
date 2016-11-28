module.exports = {
    entry: ['babel-polyfill', './example/js/default.js'],
    output: {
        filename: './example/js/build.js',
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
