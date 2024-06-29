import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import i18nTest from "shared/config/i18n/18nTest";

export const renderWithTranslation = (component: ReactElement) => {
  return render(<I18nextProvider i18n={i18nTest}>
    {component}

  </I18nextProvider>);
}
