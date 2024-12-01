import type { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "@/app/providers/StoreProvider";
import i18nTest from "@/shared/config/i18n/18nTest";
import type { ReducerSchema } from "@/shared/config/redux";
import type { DeepPartial } from "../../types";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: object;
  asyncReducers?: DeepPartial<ReducersMapObject<ReducerSchema>>;
}

export const componentRender = (
  component: ReactElement,
  options?: ComponentRenderOptions,
) => {
  const { route = "/", initialState, asyncReducers } = options || {};

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18nTest}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
};
