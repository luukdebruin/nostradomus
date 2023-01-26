module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	env: { browser: true, es6: true, node: true },
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: '17.0.1',
		},
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: [
				'eslint:recommended',
				'plugin:react/recommended',
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:prettier/recommended',
			],
			parser: '@typescript-eslint/parser',
			rules: {
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/triple-slash-reference': 'error',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'no-prototype-builtins': 'off',
				'prefer-const': ['error', { destructuring: 'all' }],
			},
		},
	],
}
