import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

import { classNames } from "@/shared/lib";
import { Button } from "@/shared/ui/redesigned/Button";

interface Props {
  className?: string;
  collapsed?: boolean;
}

export const LanguageSwitcher: FC<Props> = memo(({ className, collapsed }) => {
  const { i18n, t } = useTranslation();

  // const changeLanguage = (language: string) => {
  //   i18n.changeLanguage(language);
  // };

  console.warn("t", t, "collapsed", collapsed);

  // const buttonSize = collapsed ? ButtonSize.S : ButtonSize.M;

  const toggleLanguage = () => {
    // TODO: fix language changing
    if (i18n.language === "en") {
      i18n.changeLanguage("ru");
    }
    if (i18n.language === "ru") {
      i18n.changeLanguage("ua");
    }
    if (i18n.language === "ua") {
      i18n.changeLanguage("en");
    }
  };

  return (
    <Button
      variant="clear"
      className={classNames(styles.button, {}, [className])}
      onClick={toggleLanguage}
    >
      {i18n.language.toUpperCase()}
    </Button>
  );
});
