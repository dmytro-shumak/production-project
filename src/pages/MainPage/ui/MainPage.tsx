import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Counter } from "@/entities/Counter";
import { Page } from "@/widgets/Page";
import { StarRating } from "@/shared/ui";

const MainPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <h1>{t("MainPage")}</h1>
      <StarRating />
      <Counter />
    </Page>
  );
};

export default MainPage;
