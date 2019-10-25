module.exports = {
    'parser': 'babel-eslint',
    plugins: ['ghost', 'react'],
    extends: [
        'plugin:ghost/test',
        'plugin:react/recommended'
    ],
    "globals": {
        "Cypress": true,
        "cy": true,
        "window": true
    }
};
