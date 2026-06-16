import js from '@eslint/js'
import typescriptEslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
	{ ignores: ['**/dist/**', '**/node_modules/**', '**/build/**', '**/.astro/**'] },
	js.configs.recommended,
	...typescriptEslint.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.tsx', '**/*.jsx'],
		plugins: {
			react,
			'react-hooks': reactHooks,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
	},
	{ files: ['*.ts', '*.tsx', '*.astro'] },
]
