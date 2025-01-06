import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";

const AdminPage: FC = () => {
  const { t } = useTranslation("admin");

  return (
    <Page dataTestid="AdminPage">
      <h1>{t("AdminPage")}</h1>
    </Page>
  );
};

export default AdminPage;
