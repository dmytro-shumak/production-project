import { useCallback, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { getProfileReadOnly, profileActions } from "entities/Profile";
import styles from "./ProfilePageHeader.module.css";

interface Props {
  className?: string;
}

export const ProfilePageHeader: FC<Props> = ({ className }) => {
  const { t } = useTranslation("profile");

  const readOnly = useAppSelector(getProfileReadOnly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(
    (readOnly: boolean) => {
      dispatch(profileActions.setReadOnly(readOnly));
    },
    [dispatch],
  );

  return (
    <div className={classNames(styles.profilePageHeader, {}, [className])}>
      <Text title={t("Profile")} />
      <Button
        theme={ButtonTheme.Outline}
        className={styles.editBtn}
        onClick={() => onEdit(!readOnly)}
      >
        {readOnly ? t("Edit") : t("Cancel")}
      </Button>
    </div>
  );
};
