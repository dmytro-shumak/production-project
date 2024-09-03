import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Input } from "shared/ui/Input/Input";
import { Loader } from "shared/ui/Loader";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import type { Profile } from "../../model/types/profile";
import styles from "./ProfileCard.module.css";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
}

export const ProfileCard: FC<Props> = ({
  className,
  data,
  error,
  isLoading,
}) => {
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <div className={classNames(styles.profileCard, {}, [className])}>
        <Loader className={styles.loader} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.profileCard, {}, [className])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t("ErrorOccurred")}
          text={t("TryToRefreshPage")}
        />
      </div>
    );
  }

  return (
    <div className={classNames(styles.profileCard, {}, [className])}>
      <div className={styles.data}>
        <Input value={data?.firstName} placeholder={t("YourFirstName")} />
        <Input value={data?.lastName} placeholder={t("YourLastName")} />
      </div>
    </div>
  );
};
