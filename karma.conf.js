module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],

        files: [
            'src/**/*.test.js' 
        ],

        preprocessors: {
            'src/**/*.test.js': ['webpack']
        },

        webpack: {
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-react', '@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            }
        },

        browsers: ['Chrome'],

        reporters: ['progress'],
        
        singleRun: false
    });
};