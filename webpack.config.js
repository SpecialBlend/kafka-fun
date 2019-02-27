const path = require('path');

module.exports = [
    {
        entry: './src/kafka-pipe.js',
        target: 'node',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: __dirname,
                    exclude: /node_modules/,
                },
            ],
        },
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, 'dist'),
            filename: 'index.js',
        },
    },
];
