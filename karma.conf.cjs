module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader')
        ],

        files: [
            'tests.webpack.js'
        ],

        exclude: [
            'src/setupTests.js'
        ],

        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },

        webpack: {
            mode: 'development',
            target: 'web',
            devtool: 'inline-source-map',
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
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            }
        },

        client: {
            clearContext: false
        },

        browsers: ['Chrome'],
        autoWatch: true,
        singleRun: false,
        browserNoActivityTimeout: 60000
    });
};
