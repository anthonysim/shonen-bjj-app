import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default defineConfig([
  globalIgnores(['dist/', '.astro/', 'node_modules/', '.plan/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
]);
