/* eslint-env node */
const path = require('path');
let mix = require('laravel-mix');
const ESLintPlugin = require('eslint-webpack-plugin');

mix.alias({
    '@': path.join(__dirname, 'src')
});

mix.browserSync({
    files: [
        './public/dist/',
        './public/index.html',
    ],
    proxy: 'web:80',
    port: 5757,
    open: false,
    notify: false,
    ui: false,
});

const flags = {
    '__VUE_OPTIONS_API__': JSON.stringify(true),
    '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
};

const eslint = {
    extensions: [
        'js',
        'vue',
    ],
};

mix.webpackConfig((webpack) => {
    console.log(webpack);
    return {
        plugins: [
            new webpack.DefinePlugin(flags),
            new ESLintPlugin(eslint),
        ],
        output: {
            chunkFilename: 'dist/[chunkhash].js',
        },
    };
});

const postcssPlugins = [
    require('tailwindcss'),
];

mix.js('./src/app.js', 'dist')
    .vue()
    .postCss('./css/app.css', 'dist', postcssPlugins)
    .setPublicPath('public');
