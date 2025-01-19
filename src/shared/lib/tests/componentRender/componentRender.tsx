import type { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
// eslint-disable-next-line production-shumak-plugin/layer-imports
import "@/app/styles/index.css";

import type { DeepPartial } from "../../types";

import { StoreProvider } from "@/app/providers/StoreProvider";
import i18nTest from "@/shared/config/i18n/18nTest";
import type { ReducerSchema } from "@/shared/config/redux";
import { Theme } from "@/shared/const";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: object;
  asyncReducers?: DeepPartial<ReducersMapObject<ReducerSchema>>;
  theme?: Theme;
}

export interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

export const TestProvider = ({ children, options }: TestProviderProps) => {
  const {
    route = "/",
    initialState,
    asyncReducers,
    theme = Theme.Light,
  } = options || {};
  document.body.className = theme;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18nTest}>
          <div
            className="app"
            style={{ backgroundColor: "transparent", minHeight: "initial" }}
          >
            {children}
          </div>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export const componentRender = (
  component: ReactElement,
  options?: ComponentRenderOptions,
) => {
  return render(<TestProvider options={options}>{component}</TestProvider>);
};
