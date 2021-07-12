module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'always'],
    },
};
