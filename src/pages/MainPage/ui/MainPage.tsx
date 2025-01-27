import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Counter } from "@/entities/Counter";
import { getFeaturesFlags } from "@/shared/lib/features";
import { Page } from "@/widgets/Page";

const MainPage: FC = () => {
  const { t } = useTranslation();
  const isCounterEnabled = getFeaturesFlags("isCounterEnabled");

  return (
    <Page dataTestid="MainPage">
      <h1>{t("MainPage")}</h1>
      {isCounterEnabled && <Counter />}
    </Page>
  );
};

export default MainPage;
