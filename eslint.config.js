import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // чтобы ESLint не спорил с Prettier по форматированию
    prettierConfig,
    {
        files: ['src/**/*.{ts,js}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['**/*.cjs', 'vite.config.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        ignores: ['dist', 'node_modules', '*.cjs', 'postcss.config.cjs', 'stylelint.config.cjs'],
    },
]
