const path = require('path');

module.exports = {
    entry: './src/countdown.ts',
    watch: true,
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        globalObject: 'typeof self !== \'undefined\' ? self : this',
        libraryTarget: "umd",
        filename: 'countdown.js',
        umdNamedDefine: false,
    }
};
