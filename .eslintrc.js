module.exports = {
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {},
		},
	},
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 0, // reconsider
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{ multiline: { delimiter: 'none' } },
		],
		'@typescript-eslint/no-explicit-any': 0, // reconsider
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-var-requires': 0,
		'arrow-body-style': 0, // reconsider
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
				imports: 'always-multiline',
				objects: 'always-multiline',
			},
		],
		'consistent-return': 0, // reconsider
		'implicit-arrow-linebreak': 0, // reconsider
		'import/extensions': 0,
		'import/prefer-default-export': 0,
		'jsx-a11y/click-events-have-key-events': 0, // reconsider
		'jsx-a11y/control-has-associated-label': 0, // reconsider
		'jsx-a11y/no-static-element-interactions': 0, // reconsider
		'max-len': ['error', { code: 140 }],
		'no-nested-ternary': 0,
		'no-return-assign': 0,
		'no-tabs': 0,
		'object-curly-newline': ['error', { consistent: true }],
		'prettier/prettier': 'error',
		'react/destructuring-assignment': 0,
		'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-one-expression-per-line': 0, // reconsider
		'react/jsx-props-no-spreading': 0,
		'react/no-array-index-key': 0, // reconsider
		'react/prop-types': 0,
		'react/static-property-placement': 0,
		semi: ['error', 'never'],
	},
}
