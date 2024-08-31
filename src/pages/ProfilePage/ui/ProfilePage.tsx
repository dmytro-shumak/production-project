import {
  ProfileCard,
  fetchProfileData,
  profileReducer,
} from "entities/Profile";
import { useEffect, type FC } from "react";
import { useAppDispatch } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import {
  useAsyncReducer,
  type ReducersList,
} from "shared/lib/hooks/useAsyncReducer/useAsyncReducer";

const initialReducer: ReducersList = {
  profile: profileReducer,
};

interface Props {
  className?: string;
}

const ProfilePage: FC<Props> = ({ className }) => {
  useAsyncReducer(initialReducer, true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className={classNames("", {}, [className])}>
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
