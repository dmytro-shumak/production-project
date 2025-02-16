import { type FC } from "react";

import type { Profile } from "../../model/types/profile";
import { ProfileCardRedesigned } from "../ProfileCardRedesiged/ProfileCardRedesigned";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const ProfileCard: FC<Props> = (props) => {
  return <ProfileCardRedesigned {...props} />;
};
