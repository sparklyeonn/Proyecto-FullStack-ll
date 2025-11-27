module.exports = function (config) {
    config.set({

        frameworks: ['jasmine', 'webpack'],

        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-chrome-launcher'),
        ],

        files: [
            'src/**/*.test.js',
            'src/**/*.spec.js',
            'src/**/*.test.jsx',
            'src/**/*.spec.jsx'

        ],

        exclude: [
            'node_modules'
        ],

        preprocessors: {
            'src/**/*.test.js': ['webpack'],
            'src/**/*.spec.js': ['webpack'],
            'src/**/*.test.jsx': ['webpack'],
            'src/**/*.spec.jsx': ['webpack']
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react']
                            }
                        }
                    },
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            },
            devtool: 'inline-source-map'
        },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        browserNoActivityTimeout: 60000,
        concurrency: Infinity
    });
};
