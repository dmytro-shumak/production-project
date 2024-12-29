module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  overrides: [
    {
      files: ["*.test.tsx", "*.test.ts", "*.stories.tsx"], // Add other patterns if needed
      rules: {
        "i18next/no-literal-string": "off",
        "class-methods-use-this": "off",
      },
    },
  ],
  globals: {
    __DEV__: true,
    __PROJECT__: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "i18next",
    "react-hooks",
    "production-shumak-plugin",
    "import",
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": ["off"],
    "no-underscore-dangle": "off",
    "no-trailing-spaces": "error",
    "arrow-body-style": ["off"],
    "import/no-dynamic-require": "off",
    curly: ["error", "multi-line"],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "eol-last": ["error", "always"],
    "global-require": "off",
    "no-multi-spaces": "error",
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    "prettier/prettier": [
      "error",
      {},
      {
        usePrettierrc: false,
      },
    ],
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-param-reassign": "off",
    "i18next/no-literal-string": "warn",
    "consistent-return": "off",
    "no-restricted-syntax": "off",
    "react/prop-types": "off",
    "react/no-array-index-key": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
    "newline-before-return": "error",
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "production-shumak-plugin/path-checker": ["error", { alias: "@" }],
    "production-shumak-plugin/public-api-imports": ["error", { alias: "@" }],
    "production-shumak-plugin/layer-imports": [
      "error",
      {
        alias: "@",
        ignoreImportPatterns: ["**/StoreProvider"],
      },
    ],
    "func-names": ["error", "never"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};
