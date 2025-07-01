// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    files: ['**/*.js', '**/*.jsx'], // ← ensure JavaScript files are matched
    ignores: ['node_modules/**', '.next/**'],
    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }], // Prefer arrow functions
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }], // Prefer arrow function style
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn unused vars; ignore vars starting with _
    },
  },
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
