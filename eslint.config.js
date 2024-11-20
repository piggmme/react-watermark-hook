import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

const stylisticConfig = [
  stylistic.configs.customize({
    semi: false,
  }),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/function-call-spacing': 'error',
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        { allowSingleLine: true },
      ],
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/object-curly-newline': [
        'error',
        {
          multiline: true,
          consistent: true,
          minProperties: 5,
        },
      ],
      '@stylistic/array-element-newline': [
        'error',
        {
          ArrayExpression: 'consistent',
          ArrayPattern: { minItems: 3 },
        },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
    },
  },
]

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...stylisticConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // 이 규칙을 비활성화
    },
  },
]
