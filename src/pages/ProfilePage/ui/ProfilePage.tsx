import type { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
// import styles from "./ProfilePage.module.css";

interface Props {
  className?: string;
}

const ProfilePage: FC<Props> = ({ className }) => {
  return <div className={classNames("", {}, [className])}>Profile</div>;
};

export default ProfilePage;
