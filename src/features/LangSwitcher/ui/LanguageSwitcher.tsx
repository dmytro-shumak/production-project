import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

import { classNames } from "@/shared/lib";
import { Button } from "@/shared/ui/redesigned/Button";

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = memo(({ className }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    switch (i18n.language) {
      case "en":
        i18n.changeLanguage("ru");
        break;
      case "ru":
        i18n.changeLanguage("uk");
        break;
      case "uk":
        i18n.changeLanguage("en");
        break;
      default:
        break;
    }
  }, [i18n]);

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
