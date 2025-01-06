import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Counter } from "@/entities/Counter";
import { Page } from "@/widgets/Page";

const MainPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page dataTestid="MainPage">
      <h1>{t("MainPage")}</h1>
      <Counter />
    </Page>
  );
};

export default MainPage;
