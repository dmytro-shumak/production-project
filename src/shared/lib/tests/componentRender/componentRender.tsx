import { render } from "@testing-library/react";
import { StoreProvider } from "app/providers/StoreProvider";
import type { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18nTest from "shared/config/i18n/18nTest";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: object;
}

export const componentRender = (
  component: ReactElement,
  options?: ComponentRenderOptions,
) => {
  const { route = "/", initialState } = options || {};

  return render(
    <StoreProvider initialState={initialState}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nTest}>{component}</I18nextProvider>
      </MemoryRouter>
    </StoreProvider>,
  );
};
