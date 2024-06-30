import type { StoryFn } from "@storybook/react/*";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "shared/config/i18n/i18n";

export const withI18nextDecorator = (StoryComponent: StoryFn) => {
  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    </Suspense>
  );
};
