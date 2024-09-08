import {
  ProfileCard,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileLoading,
  getProfileReadOnly,
  getProfileValidateErrors,
  profileReducer,
} from "entities/Profile";
import { useEffect, useMemo, type FC } from "react";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import {
  useAsyncReducer,
  type ReducersList,
} from "shared/lib/hooks/useAsyncReducer/useAsyncReducer";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { ValidateProfileError } from "entities/Profile/model/types/profile";
import { useTranslation } from "react-i18next";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

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

  useEffect(() => {
    console.log("__PROJECT__", __PROJECT__);
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  return (
    <div className={classNames("", {}, [className])}>
      <ProfilePageHeader />
      {validateErrors?.length &&
        validateErrors?.map((err) => (
          <Text
            theme={TextTheme.ERROR}
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
    </div>
  );
};

export default ProfilePage;
