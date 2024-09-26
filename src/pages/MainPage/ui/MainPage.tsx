import { Counter } from "entities/Counter";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "shared/ui";

const MainPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <h1>{t("MainPage")}</h1>
      <Counter />
    </Page>
  );
};

export default MainPage;
