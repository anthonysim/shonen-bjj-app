import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default defineConfig([
  globalIgnores(['dist/', '.astro/', 'node_modules/', '.plan/', '.vercel/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    // Node-run config files
    files: ['*.config.{js,mjs,ts}'],
    languageOptions: { globals: { process: 'readonly' } },
  },
]);
