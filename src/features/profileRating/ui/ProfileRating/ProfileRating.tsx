import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RatingCard } from "@/entities/Rating";
import { useGetProfileRating, useRateProfile } from "../../api/profileRating";
import { useAppSelector } from "@/shared/lib";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui";

interface Props {
  className?: string;
  profileId: string;
}
const ProfileRating = memo(({ className, profileId }: Props) => {
  const { t } = useTranslation();

  const auth = useAppSelector(getUserAuthData);

  const { data, isLoading } = useGetProfileRating({
    profileId,
    userId: auth?.id ?? "",
  });

  const [rateRatingMutation] = useRateProfile();

  const handleProfileMutation = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateRatingMutation({
          profileId,
          userId: auth?.id ?? "",
          rate: starsCount,
          feedback,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [profileId, auth?.id, rateRatingMutation],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={108} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={handleProfileMutation}
      onCancel={handleProfileMutation}
      rate={rating?.rate}
      className={className}
      title={t("RateProfile")}
      feedbackTitle={t("ProfileFeedbackTitle")}
      hasFeedback
    />
  );
});

export default ProfileRating;
