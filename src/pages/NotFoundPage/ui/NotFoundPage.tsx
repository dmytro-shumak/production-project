import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib";
import { Page } from "@/widgets/Page";
import styles from "./NotFoundPage.module.css";

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
