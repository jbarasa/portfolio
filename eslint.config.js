import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        },
        node: true,
      },
    },
    rules: {
      // Unused cleanup
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [".*"],
              message:
                "Relative imports are not allowed. Please use path aliases instead.",
            },
          ],
        },
      ],

      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/strict-boolean-expressions": [
        "warn",
        { allowNullableBoolean: true },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      // "@typescript-eslint/no-unsafe-return": "warn",
      // "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/restrict-template-expressions": [
        "warn",
        { allowNumber: true, allowBoolean: true },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/prefer-includes": "warn",
      "@typescript-eslint/prefer-string-starts-ends-with": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-dynamic-delete": "warn",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // General logic safety
      eqeqeq: ["error", "smart"],
      "no-implicit-coercion": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "no-new-wrappers": "error",
      "no-sparse-arrays": "error",
      "no-template-curly-in-string": "warn",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-var": "error",
      curly: ["error", "all"],
      "block-scoped-var": "error",
      "prefer-const": [
        "warn",
        { destructuring: "all", ignoreReadBeforeAssign: true },
      ],
      yoda: ["error", "never"],

      // React
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "warn",
    },
  },
  // {
  //   files: ["**/*.{js,jsx}"],
  //   languageOptions: { ecmaVersion: "latest", sourceType: "module" },
  //   plugins: {
  //     react,
  //     "react-hooks": reactHooks,
  //     "unused-imports": unusedImports,
  //   },
  //   settings: { react: { version: "detect" } },
  //   rules: {
  //     "unused-imports/no-unused-imports": "error",
  //     "unused-imports/no-unused-vars": [
  //       "warn",
  //       {
  //         vars: "all",
  //         args: "after-used",
  //         argsIgnorePattern: "^_",
  //         varsIgnorePattern: "^_",
  //       },
  //     ],
  //     "react/jsx-uses-react": "off",
  //     "react/react-in-jsx-scope": "off",
  //     "react-hooks/rules-of-hooks": "error",
  //     "react-hooks/exhaustive-deps": "warn",
  //   },
  // },
]);
