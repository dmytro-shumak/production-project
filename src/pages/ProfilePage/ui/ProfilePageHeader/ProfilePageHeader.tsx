import { useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";

import { canEditProfileSelector } from "../../model/selectors/canEditProfile/canEditProfile";

import {
  getProfileReadOnly,
  profileActions,
  updateProfileData,
} from "@/entities/Profile";
import { useAppDispatch, useAppSelector, classNames } from "@/shared/lib";
import { Button, ButtonTheme, HStack, Text } from "@/shared/ui";

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
    <HStack justify="between" className={classNames("", {}, [className])}>
      <Text title={t("Profile")} />
      {canEditProfile && (
        <HStack gap={8}>
          {readOnly ? (
            <Button
              theme={ButtonTheme.Outline}
              onClick={() => onEdit(!readOnly)}
            >
              {t("Edit")}
            </Button>
          ) : (
            <>
              <Button
                theme={ButtonTheme.OutlineRed}
                onClick={() => onEdit(!readOnly)}
              >
                {t("Cancel")}
              </Button>
              <Button theme={ButtonTheme.Outline} onClick={onSave}>
                {t("Save")}
              </Button>
            </>
          )}
        </HStack>
      )}
    </HStack>
  );
};
