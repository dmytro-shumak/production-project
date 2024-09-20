import {
  getProfileReadOnly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Text } from "shared/ui/Text/Text";
import { canEditProfileSelector } from "../../model/selectors/canEditProfile/canEditProfile";
import styles from "./ProfilePageHeader.module.css";

interface Props {
  className?: string;
}

export const ProfilePageHeader: FC<Props> = ({ className }) => {
  const { t } = useTranslation("profile");

  const canEditProfile = useAppSelector(canEditProfileSelector);

  const readOnly = useAppSelector(getProfileReadOnly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(
    (readOnly: boolean) => {
      if (readOnly) {
        dispatch(profileActions.cancelEdit());
      } else {
        dispatch(profileActions.setReadOnly(readOnly));
      }
    },
    [dispatch],
  );

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(styles.profilePageHeader, {}, [className])}>
      <Text title={t("Profile")} />
      {canEditProfile && (
        <>
          <Button
            theme={readOnly ? ButtonTheme.Outline : ButtonTheme.OutlineRed}
            className={styles.editBtn}
            onClick={() => onEdit(!readOnly)}
          >
            {readOnly ? t("Edit") : t("Cancel")}
          </Button>
          {!readOnly && (
            <Button theme={ButtonTheme.Outline} onClick={onSave}>
              {t("Save")}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
