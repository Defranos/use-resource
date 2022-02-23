module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
		projects: ["./tsconfig.json"],
	},
	plugins: ["react", "prettier", "react-hooks", "@typescript-eslint", "cypress"],
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended"],
	rules: {
		"react/display-name": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/exhaustive-deps": "off",
		"react-hooks/exhaustive-deps": "off",
		"linebreak-style": ["error", "unix"],
		indent: ["error", "tab", { SwitchCase: 1 }],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"cypress/no-assigning-return-values": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
		"cypress/no-unnecessary-waiting": false
	},
};