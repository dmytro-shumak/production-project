import { useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";

import { canEditProfileSelector } from "../../model/selectors/canEditProfile/canEditProfile";

import {
  getProfileReadOnly,
  profileActions,
  updateProfileData,
} from "@/entities/Profile";
import { useAppDispatch, useAppSelector, classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Button as ButtonDeprecated,
  ButtonTheme,
  HStack,
  Text as TextDeprecated,
} from "@/shared/ui";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";
import { Text } from "@/shared/ui/redesigned/Text";

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

  // TODO: remove this due to design
  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <Card borderRadius={34} padding="24">
          <HStack justify="between" className={classNames("", {}, [className])}>
            <Text title={t("Profile")} />
            {canEditProfile && (
              <HStack gap={8}>
                {readOnly ? (
                  <Button
                    onClick={() => onEdit(!readOnly)}
                    data-testid="ProfilePageHeader.EditButton"
                  >
                    {t("Edit")}
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => onEdit(!readOnly)} color="cancel">
                      {t("Cancel")}
                    </Button>
                    <Button
                      onClick={onSave}
                      color="success"
                      data-testid="ProfilePageHeader.SaveButton"
                    >
                      {t("Save")}
                    </Button>
                  </>
                )}
              </HStack>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack justify="between" className={classNames("", {}, [className])}>
          <TextDeprecated title={t("Profile")} />
          {canEditProfile && (
            <HStack gap={8}>
              {readOnly ? (
                <ButtonDeprecated
                  theme={ButtonTheme.Outline}
                  onClick={() => onEdit(!readOnly)}
                  data-testid="ProfilePageHeader.EditButton"
                >
                  {t("Edit")}
                </ButtonDeprecated>
              ) : (
                <>
                  <ButtonDeprecated
                    theme={ButtonTheme.OutlineRed}
                    onClick={() => onEdit(!readOnly)}
                  >
                    {t("Cancel")}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    theme={ButtonTheme.Outline}
                    onClick={onSave}
                    data-testid="ProfilePageHeader.SaveButton"
                  >
                    {t("Save")}
                  </ButtonDeprecated>
                </>
              )}
            </HStack>
          )}
        </HStack>
      }
    />
  );
};
