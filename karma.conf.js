module.exports = function (config) {
    config.set({

        frameworks: ['jasmine', 'webpack'], 

        files: [
            'src/**/*.test.js',
            'src/**/*.spec.js'
        ],

        exclude: [
            'node_modules'
        ],

        preprocessors: {
            'src/**/*.test.js': ['webpack'],
            'src/**/*.spec.js': ['webpack']
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

        browserNoActivityTimeout: 60000, // 60 segundos

        concurrency: Infinity
    });
};
