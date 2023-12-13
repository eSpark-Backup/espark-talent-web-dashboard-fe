module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'next',
    'prettier',
  ],
  plugins: [
    'eslint-plugin-prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'tailwindcss',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'prefer-const': ['error'],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
