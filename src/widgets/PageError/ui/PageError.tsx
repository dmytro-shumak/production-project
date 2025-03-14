import type { FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./PageError.module.css";

import { classNames } from "@/shared/lib";
import { Button } from "@/shared/ui/redesigned/Button";

interface Props {
  className?: string;
}

export const PageError: FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(styles.pageError, {}, [className])}>
      <p>{t("UnexpectedErrorOccurred")}</p>
      <Button onClick={reloadPage}>{t("ReloadPage")}</Button>
    </div>
  );
};
