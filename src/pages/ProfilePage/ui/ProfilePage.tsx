import {
  ProfileCard,
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileLoading,
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
  const data = useAppSelector(getProfileData);
  const error = useAppSelector(getProfileError);
  const loading = useAppSelector(getProfileLoading);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className={classNames("", {}, [className])}>
      <ProfilePageHeader />
      <ProfileCard data={data} isLoading={loading} error={error} />
    </div>
  );
};

export default ProfilePage;
