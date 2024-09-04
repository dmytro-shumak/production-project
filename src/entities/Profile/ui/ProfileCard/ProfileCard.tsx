import { useCallback, type ChangeEvent, type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Input } from "shared/ui/Input/Input";
import { Loader } from "shared/ui/Loader";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { useAppDispatch } from "shared/lib";
import { profileActions } from "../../model/slice/profileSlice";
import type { Profile } from "../../model/types/profile";
import styles from "./ProfileCard.module.css";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const ProfileCard: FC<Props> = ({
  className,
  data,
  error,
  isLoading,
  readOnly,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();

  const handleChangeFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ firstName: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(profileActions.updateProfile({ lastName: e.target.value }));
    },
    [dispatch],
  );

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
        <Input
          value={data?.firstName}
          placeholder={t("YourFirstName")}
          label={t("YourFirstName")}
          onChange={handleChangeFirstName}
          readOnly={readOnly}
        />
        <Input
          value={data?.lastName}
          placeholder={t("YourLastName")}
          label={t("YourLastName")}
          onChange={handleChangeLastName}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};
