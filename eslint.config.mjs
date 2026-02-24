import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const sharedRules = {
  "arrow-parens": ["error", "always"],
  "max-len": ["warn", { code: 100 }],
  indent: "off", // prettier
  "eol-last": "off", // prettier
  "no-undef": "error",
  "comma-spacing": ["warn", { before: false, after: true }],
  "comma-dangle": ["warn", "always-multiline"],
  "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 2 }],
  eqeqeq: "error",
  "linebreak-style": ["error", "unix"],
  radix: ["error", "as-needed"],
  semi: ["error", "always"],
};

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
      "no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^.*_$",
          varsIgnorePattern: "^.*_$",
        },
      ],
      ...sharedRules,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^.*_$",
          varsIgnorePattern: "^.*_$",
        },
      ],
      "@typescript-eslint/indent": "off", // prettier
      ...sharedRules,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
    },
  },
]);

