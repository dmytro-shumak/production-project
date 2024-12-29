import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";

const ForbiddenPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <h1>{t("AccessForbidden")}</h1>
    </Page>
  );
};

export default ForbiddenPage;
