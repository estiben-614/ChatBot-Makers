module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    'semi': ['error', 'always'],
    'react/jsx-indent': ['error', 2], // Indentation for JSX
    'react/jsx-indent-props': ['error', 2], // Indentation for JSX props
    "indent": ["error", 2],
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true
    }],
    'react/jsx-closing-tag-location': 'error',
    "react/jsx-curly-newline": ["error", {
      "multiline": "consistent"
    }],
    "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "multiline" }],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "max-len": ["error", { "code": 120 }],
    "space-infix-ops": ["error", { "int32Hint": false }],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "arrow-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],
    "multiline-ternary": ["error", "always-multiline"],
  },
}