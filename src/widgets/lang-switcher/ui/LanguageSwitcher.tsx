import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "shared/ui";
import styles from "./LanguageSwitcher.module.css";

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={classNames(styles.languageSwitcher, {}, [className])}>
      <Button onClick={() => changeLanguage("en")} theme={ThemeButton.Clear}>
        English
      </Button>
      <Button onClick={() => changeLanguage("ru")}>Russian</Button>
      <Button onClick={() => changeLanguage("ua")}>Ukrainian</Button>
    </div>
  );
};
