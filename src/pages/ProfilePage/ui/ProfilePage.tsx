import {
  ProfileCard,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileLoading,
  getProfileReadOnly,
  profileReducer,
} from "entities/Profile";
import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import {
  useAsyncReducer,
  type ReducersList,
} from "shared/lib/hooks/useAsyncReducer/useAsyncReducer";
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
  const formData = useAppSelector(getProfileForm);
  const error = useAppSelector(getProfileError);
  const loading = useAppSelector(getProfileLoading);
  const readOnly = useAppSelector(getProfileReadOnly);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className={classNames("", {}, [className])}>
      <ProfilePageHeader />
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
