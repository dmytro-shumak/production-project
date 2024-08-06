import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui";
import styles from "./LoginForm.module.css";

interface Props {
  className?: string;
}

export const LoginForm: FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.loginForm, {}, [className])}>
      <input type="text" />
      <input type="text" />
      <Button className={styles.loginBtn}>{t("Login")}</Button>
    </div>
  );
};
