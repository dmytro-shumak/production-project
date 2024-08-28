import { profileReducer } from "entities/Profile";
import type { FC } from "react";
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

  return <div className={classNames("", {}, [className])}>Profile</div>;
};

export default ProfilePage;
