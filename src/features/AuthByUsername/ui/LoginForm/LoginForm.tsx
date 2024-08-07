import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui";
import { Input } from "shared/ui/Input/Input";
import styles from "./LoginForm.module.css";

interface Props {
  className?: string;
  isOpen?: boolean;
}

export const LoginForm: FC<Props> = ({ className, isOpen }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.loginForm, {}, [className])}>
      <Input label="Username" autoFocus={isOpen} />
      <Input label="Password" />
      <Button className={styles.loginBtn}>{t("Login")}</Button>
    </div>
  );
};
