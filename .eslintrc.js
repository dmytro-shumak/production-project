module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "i18next"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    indent: ["error", 2],
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.{ts,tsx}",
          "**/*.spec.{ts,tsx}",
          "**/*.stories.{ts,tsx}",
          "**/storybook/**",
          "config/**",
          "**/tests/**",
        ],
      },
    ],
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
  },
  overrides: [
    {
      files: ["*.test.tsx", "*.test.ts"], // Add other patterns if needed
      rules: {
        "i18next/no-literal-string": "off",
      },
    },
  ],
  globals: {
    __DEV__: true,
  },
};
