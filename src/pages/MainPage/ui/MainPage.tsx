import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Counter } from "@/entities/Counter";
import { Page } from "@/widgets/Page";
import { RatingCard } from "@/entities/Rating";

const MainPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <h1>{t("MainPage")}</h1>
      <RatingCard
        title="Do you like the article?"
        feedbackTitle="feedback title"
        hasFeedback
      />
      <Counter />
    </Page>
  );
};

export default MainPage;
