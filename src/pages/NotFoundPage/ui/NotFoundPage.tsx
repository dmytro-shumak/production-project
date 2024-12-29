import type { FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./NotFoundPage.module.css";

import { classNames } from "@/shared/lib";
import { Page } from "@/widgets/Page";

interface Props {
  className?: string;
}

export const NotFoundPage: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(styles.notFoundPage, {}, [className])}>
      {t("PageNotFound")}
    </Page>
  );
};
