const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../wwwroot/js/GrowthChart"),
        filename: "RcpchChart.js"
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader"
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: 
            [new TerserPlugin({
                extractComments: false,
            })],
    }
}