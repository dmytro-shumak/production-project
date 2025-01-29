## Project Launch

```
npm install - install dependencies
npm run start:dev or npm run start:dev:vite - start the server + frontend project in dev mode
```

----

## Scripts

- `npm run start` - Launch the frontend project on webpack dev server
- `npm run start:vite` - Launch the frontend project on Vite
- `npm run start:dev` - Launch the frontend project on webpack dev server + backend
- `npm run start:dev:vite` - Launch the frontend project on Vite + backend
- `npm run start:dev:server` - Launch the backend server
- `npm run build:prod` - Build in production mode
- `npm run build:dev` - Build in dev mode (not minified)
- `npm run lint` - Lint TypeScript files
- `npm run lint:fix` - Fix TypeScript files with linter
- `npm run stylelint` - Lint SCSS files with style linter
- `npm run stylelint:fix` - Fix SCSS files with style linter
- `npm run test` - Run unit tests with Jest
- `npm run test:ui` - Run screenshot tests with Loki
- `npm run test:ui:approve` - Approve new screenshots
- `npm run test:ui:report` - Generate a full report for screenshot tests
- `npm run test:ui:json` - Generate a JSON report for screenshot tests
- `npm run test:ui:html` - Generate an HTML report for screenshot tests
- `npm run storybook` - Launch Storybook
- `npm run storybook:build` - Build Storybook
- `npm run prepare` - Pre-commit hooks
- `npm run generate:slice` - Script for generating FSD slices

----

## Project Architecture

The project is designed following the Feature-Sliced Design methodology.

Documentation link - [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Working with Translations

The project uses the `i18next` library for handling translations.  
Translation files are stored in `public/locales`.

For a better experience, we recommend installing the plugin for WebStorm/VSCode.

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

----

## Testing

The project uses four types of tests:
1) Standard unit tests with Jest - `npm run test`
2) Component tests with React Testing Library - `npm run test`
3) Screenshot testing with Loki - `npm run test:ui`
4) e2e testing with Cypress - `npm run test:e2e`

More details about tests - [Testing Documentation](/docs/tests.md)

----

## Linting

The project uses ESLint for TypeScript code checks and Stylelint for style files.

To strictly enforce architectural principles,  
a custom ESLint plugin *eslint-plugin-ulbi-tv-plugin* is used with three rules:
1) `path-checker` - prohibits the use of absolute imports within the same module
2) `layer-imports` - ensures correct layer usage in terms of FSD  
   (e.g., widgets cannot be used in features or entities)
3) `public-api-imports` - allows imports from other modules only via public API. Includes auto-fix.

##### Running Linters
- `npm run lint` - Lint TypeScript files
- `npm run lint:fix` - Fix TypeScript files with linter
- `npm run stylelint` - Lint SCSS files with style linter
- `npm run stylelint:fix` - Fix SCSS files with style linter

----

## Storybook

Each component in the project has its story cases.  
Server requests are mocked using `storybook-addon-mock`.

Story files are created next to the component with the `.stories.tsx` extension.

Run Storybook with the command:
- `npm run storybook`

More details about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button, ButtonSize, ButtonTheme } from "./Button";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/shared/const";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: Object.values(ButtonSize),
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Click me!",
  },
};

export const Clear: Story = {
  args: {
    children: "Click me!",
    theme: ButtonTheme.Clear,
  },
};

export const Outline: Story = {
  args: {
    children: "Click me!",
    theme: ButtonTheme.Outline,
  },
};

export const OutlineDark: Story = {
  args: {
    children: "Click me!",
    theme: ButtonTheme.Outline,
  },
  decorators: [ThemeDecorator(Theme.Dark)],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Disabled: Story = {
  args: {
    children: "Click me!",
    disabled: true,
    theme: ButtonTheme.Outline,
  },
};

```

----

## Project Configuration

For development, the project contains two configs:
1. Webpack - `./config/build`
2. Vite - `vite.config.ts`

Both build systems are tailored to the main application features.

All configurations are stored in `/config`
- `/config/babel` - Babel
- `/config/build` - Webpack configuration
- `/config/jest` - Test environment configuration
- `/config/storybook` - Storybook configuration

The `scripts` folder contains various scripts for refactoring, simplifying code writing, generating reports, etc.

----

## CI Pipeline and Pre-Commit Hooks

GitHub Actions configuration is in `/.github/workflows`.  
CI runs all types of tests, project builds, Storybook builds, and linting.

Pre-commit hooks check the project with linters; configuration is in `/.husky`.

----

### Data Handling

Data interaction is implemented using Redux Toolkit.  
Where possible, reusable entities should be normalized with `EntityAdapter`.

Server requests are made using [RTK Query](/src/shared/api/rtkApi.ts).

To connect reducers asynchronously (to avoid including them in the general bundle),  
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx) is used.


### Working with Feature Flags  

Feature flags are only allowed to be used with the `toggleFeatures` helper.  

It accepts an object with the following options:  

```ts
{
   name: feature flag name,  
   on: function that executes when the feature is enabled,  
   off: function that executes when the feature is disabled  
}
```

To automatically remove a feature, use the `remove-feature.ts` script, which takes two arguments:  
1. The name of the feature flag to be removed  
2. The state (**on/off**)  

----

## Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notifications](/src/entities/Notifications)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [addCommentForm](/src/features/addCommentForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [scrollRestoration](/src/features/scrollRestoration)
- [ThemeSwitcher](/src/features/ThemeSwitcher)