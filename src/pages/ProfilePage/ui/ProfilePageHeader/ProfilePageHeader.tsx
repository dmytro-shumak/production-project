import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import styles from "./ProfilePageHeader.module.css";

interface Props {
  className?: string;
}

export const ProfilePageHeader: FC<Props> = ({ className }) => {
  const { t } = useTranslation("profile");

  return (
    <div className={classNames(styles.profilePageHeader, {}, [className])}>
      <Text title={t("Profile")} />
      <Button theme={ButtonTheme.Outline} className={styles.editBtn}>
        {t("Edit")}
      </Button>
    </div>
  );
};
