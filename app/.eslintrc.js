/* eslint-env node */
module.exports = {
    plugins: [
        "vue",
    ],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        'vue/html-indent': [ 1, 'tab' ],
    },
}
