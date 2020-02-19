var path = require('path')
module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'import'],
    settings: {
        'import/extensions': ['.js', '.jsx'],
        react: {
            version: 'detect',
        },
        'import/resolver': {
            webpack: {
                config:
                    'C:\\Users\\TZU.CHIEH.LIN\\Desktop\\Learning\\js-learning\\MyFirstProgram\\webpack.config.js', // if use relative path will face problem. Don't konw why.
            },
        },
    },
    rules: {
        quotes: ['error', 'single'],
        'import/no-unused-modules': [
            2,
            { unusedExports: true, missingExports: true },
        ],
    },
}
