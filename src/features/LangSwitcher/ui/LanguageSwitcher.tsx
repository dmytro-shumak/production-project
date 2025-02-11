import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Button as ButtonDecrepated,
  ButtonSize,
  ButtonTheme,
} from "@/shared/ui";
import { Button } from "@/shared/ui/redesigned/Button";

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
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <Button
          variant="clear"
          className={styles.button}
          onClick={toggleLanguage}
        >
          {i18n.language.toUpperCase()}
        </Button>
      }
      off={
        <div
          className={classNames(
            styles.languageSwitcher,
            { [styles.collapsed]: collapsed },
            [className],
          )}
        >
          <ButtonDecrepated
            onClick={() => changeLanguage("en")}
            theme={ButtonTheme.Clear}
            size={buttonSize}
          >
            {t("English")}
          </ButtonDecrepated>
          <ButtonDecrepated
            onClick={() => changeLanguage("ru")}
            theme={ButtonTheme.Clear}
            size={buttonSize}
          >
            {t("Russian")}
          </ButtonDecrepated>
          <ButtonDecrepated
            onClick={() => changeLanguage("uk")}
            theme={ButtonTheme.Clear}
            size={buttonSize}
          >
            {t("Ukrainian")}
          </ButtonDecrepated>
        </div>
      }
    />
  );
});
