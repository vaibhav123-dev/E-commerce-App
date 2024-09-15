import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"], // Ignore the dist folder
  },
  {
    files: ["**/*.{js,jsx}"], // Apply these settings to JS and JSX files
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020
      globals: globals.browser, // Define browser globals (window, document, etc.)
      parserOptions: {
        ecmaVersion: "latest", // Use latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: "module", // Enable ES modules
      },
    },
    settings: {
      react: { version: "18.0" }, // Set React version
    },
    plugins: {
      react, // React plugin
      "react-hooks": reactHooks, // React Hooks plugin
      "react-refresh": reactRefresh, // React Refresh plugin
    },
    rules: {
      ...js.configs.recommended.rules, // Base JS rules
      ...react.configs.recommended.rules, // Recommended React rules
      ...react.configs["jsx-runtime"].rules, // React JSX runtime rules
      ...reactHooks.configs.recommended.rules, // React Hooks rules

      // Custom rules
      "react/prop-types": "off", // Disable prop-types rule
      "react/jsx-no-target-blank": "off", // Allow target="_blank" without rel="noopener noreferrer"
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Warn if non-component exports during React Refresh
      ],
    },
  },
];
