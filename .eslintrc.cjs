/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsConfigRootDir: '__dirname',
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'no-console': 'error',
        // '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        // 'arrow-body-style': ['error', 'always'],
    },
};
