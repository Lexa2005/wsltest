const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },

    filenameHashing: false,
    outputDir: 'dist',
    // publicPath: '/spa/dist/',
    publicPath: 'http://localhost:5001/',
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        output: {
            filename: 'js/main.js',
        },
        devServer: {
            port: 5001,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            historyApiFallback: true,
        },
    }

})