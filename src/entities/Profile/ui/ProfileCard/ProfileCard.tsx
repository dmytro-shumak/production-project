import { type FC } from "react";

import type { Profile } from "../../model/types/profile";
import { ProfileCardDeprecated } from "../ProfileCardDeprecated/ProfileCardDeprecated";
import { ProfileCardRedesigned } from "../ProfileCardRedesiged/ProfileCardRedesigned";

import { ToggleFeatures } from "@/shared/lib/features";

interface Props {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const ProfileCard: FC<Props> = (props) => {
  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};
