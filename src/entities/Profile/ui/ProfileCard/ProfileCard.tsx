import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { getProfileLoading } from "entities/Profile/model/selectors/getProfileLoading/getProfileLoading";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Text } from "shared/ui/Text/Text";
import { Input } from "shared/ui/Input/Input";
import styles from "./ProfileCard.module.css";

interface Props {
  className?: string;
}

export const ProfileCard: FC<Props> = ({ className }) => {
  const { t } = useTranslation("profile");
  const data = useAppSelector(getProfileData);
  const error = useAppSelector(getProfileError);
  const loading = useAppSelector(getProfileLoading);

  if (error || loading) {
    return null;
  }

  return (
    <div className={classNames(styles.profileCard, {}, [className])}>
      <div className={styles.header}>
        <Text title={t("Profile")} />
        <Button theme={ButtonTheme.Outline} className={styles.editBtn}>
          {t("Edit")}
        </Button>
      </div>
      <div className={styles.data}>
        <Input value={data?.firstName} placeholder={t("YourFirstName")} />
        <Input value={data?.lastName} placeholder={t("YourLastName")} />
      </div>
    </div>
  );
};
