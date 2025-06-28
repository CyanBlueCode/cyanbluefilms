import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }], // Prefer arrow functions
      'arrow-body-style': ['error', 'always'], // Enforces implicit return (no braces)
      'func-style': ['warn', 'arrow'], // Prefer arrow function style
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn unused vars; ignore vars starting with _
    },
  },
];

export default eslintConfig;
