module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'react-native/react-native': true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['simple-import-sort', 'unused-imports', 'react-perf'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'plugin:promise/recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: ['tsconfig.json'],
            },
        },
    },
    rules: {
        // react
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-curly-brace-presence': 'warn',
        'react/jsx-boolean-value': 'warn',
        'react/destructuring-assignment': 'error',
        'react/prefer-read-only-props': 'error',

        // react-perf
        'react-perf/jsx-no-new-object-as-prop': 'off',
        'react-perf/jsx-no-new-array-as-prop': 'off',

        // react-native
        'react-native/no-inline-styles': 'warn',

        // imports
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'sort-imports': 'off',
        'import/order': 'off',
        'import/no-unresolved': 'off',
        'unused-imports/no-unused-imports': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',

        // Typescript
        '@typescript-eslint/no-explicit-any': 'error',

        'promise/prefer-await-to-then': 'warn',
        'promise/always-return': 'warn',
        'promise/catch-or-return': 'warn',

        'no-console': 'error',
        'no-unused-vars': 'error',

        'class-methods-use-this': 'off',
    },
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // React related packages
                            ['^react'],
                            // Side effect imports and packages
                            ['^\\w', '^@[^\\/]\\w'],
                            // Null imports - Anything without a from
                            ['^\\u0000'],
                            // Internal packages aliases
                            ['^@/'],
                            // Absolute imports - Anything that does not start with a dot
                            ['^[^.]'],
                            // Parent imports. Put `..` last
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Other relative imports - Put same-folder imports and `.` last
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ],
                    },
                ],
            },
        },
    ],
};