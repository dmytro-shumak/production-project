import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

import {
  ProfileCard,
  ValidateProfileError,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileLoading,
  getProfileReadOnly,
  getProfileValidateErrors,
  profileReducer,
} from "@/entities/Profile";
import { useAppDispatch, useAppSelector, classNames } from "@/shared/lib";
import {
  useAsyncReducer,
  type ReducersList,
} from "@/shared/lib/hooks/useAsyncReducer/useAsyncReducer";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";

const initialReducer: ReducersList = {
  profile: profileReducer,
};

interface Props {
  className?: string;
}

const ProfilePage: FC<Props> = ({ className }) => {
  useAsyncReducer(initialReducer, true);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("profile");
  const { id } = useParams();

  const formData = useAppSelector(getProfileForm);
  const error = useAppSelector(getProfileError);
  const loading = useAppSelector(getProfileLoading);
  const readOnly = useAppSelector(getProfileReadOnly);
  const validateErrors = useAppSelector(getProfileValidateErrors);

  const validateErrorTranslate = useMemo<Record<ValidateProfileError, string>>(
    () => ({
      [ValidateProfileError.INCORRECT_AGE]: t("IncorrectAge"),
      [ValidateProfileError.INCORRECT_COUNTRY]: t("IncorrectCountry"),
      [ValidateProfileError.INCORRECT_USER_DATA]: t("IncorrectUserData"),
      [ValidateProfileError.NO_DATA]: t("NoData"),
      [ValidateProfileError.SERVER_ERROR]: t("ServerError"),
    }),
    [t],
  );

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  if (!id) {
    return null;
  }

  return (
    <Page className={classNames("", {}, [className])} dataTestid="ProfilePage">
      <VStack gap={16} align="stretch">
        <ProfilePageHeader />
        {validateErrors?.length !== 0 &&
          validateErrors?.map((err) => (
            <Text
              variant="error"
              text={validateErrorTranslate[err]}
              key={err}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={loading}
          error={error}
          readOnly={readOnly}
        />
        {/* <ProfileRating profileId={id} /> */}
      </VStack>
    </Page>
  );
};

export default ProfilePage;
