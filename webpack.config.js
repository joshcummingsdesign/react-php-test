const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        client: path.join(__dirname, 'src', 'client', 'index.tsx'),
        server: path.join(__dirname, 'src', 'server', 'index.ts'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
                        plugins: [!isProduction && require.resolve('react-refresh/babel')].filter(Boolean),
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        runtimeChunk: 'single',
    },
    plugins: [!isProduction && new ReactRefreshWebpackPlugin()].filter(Boolean),
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
        hot: true,
        allowedHosts: 'all',
        watchFiles: ['**/*.php'],
    },
};
