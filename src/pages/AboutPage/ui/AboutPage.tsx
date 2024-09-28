import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page";

const AboutPage: FC = () => {
  const { t } = useTranslation("about");

  return (
    <Page>
      <h1>{t("AboutUs")}</h1>
    </Page>
  );
};

export default AboutPage;
