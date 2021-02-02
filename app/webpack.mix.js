const path = require('path');
let mix = require('laravel-mix');

const aliases = {
    '@': path.join(__dirname, 'src')
};

const bs = {
    files: [
        './public/dist/',
        './public/index.html',
    ],
    proxy: 'web:80',
    port: 5757,
    open: false,
    notify: false,
    ui: false,
};

mix
    .alias(aliases)
    .setPublicPath('public')
    .browserSync(bs)
    .js('./src/app.js', 'dist').vue()
    .postCss('./css/app.css', 'dist', [
        require('tailwindcss'),
    ]);
