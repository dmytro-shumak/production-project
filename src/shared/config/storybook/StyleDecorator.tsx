import type { StoryFn } from '@storybook/react';
import type { Theme } from "app/providers/theme";
import 'app/styles/index.css';

export const StyleDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
  <div className={`app ${theme}`} style={{backgroundColor: "transparent", minHeight: 'initial'}}>
    <StoryComponent />
  </div>
);
