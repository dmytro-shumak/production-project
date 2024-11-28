import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib";
import { Button, ButtonSize, ButtonTheme } from "shared/ui";
import styles from "./LanguageSwitcher.module.css";

interface Props {
  className?: string;
  collapsed?: boolean;
}

export const LanguageSwitcher: FC<Props> = memo(({ className, collapsed }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const buttonSize = collapsed ? ButtonSize.S : ButtonSize.M;

  return (
    <div
      className={classNames(
        styles.languageSwitcher,
        { [styles.collapsed]: collapsed },
        [className],
      )}
    >
      <Button
        onClick={() => changeLanguage("en")}
        theme={ButtonTheme.Clear}
        size={buttonSize}
      >
        {t("English")}
      </Button>
      <Button
        onClick={() => changeLanguage("ru")}
        theme={ButtonTheme.Clear}
        size={buttonSize}
      >
        {t("Russian")}
      </Button>
      <Button
        onClick={() => changeLanguage("ua")}
        theme={ButtonTheme.Clear}
        size={buttonSize}
      >
        {t("Ukrainian")}
      </Button>
    </div>
  );
});
