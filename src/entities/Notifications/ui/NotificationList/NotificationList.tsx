import { memo } from "react";

import { useNotifications } from "../../api/notification";
import { NotificationItem } from "../NotificationItem/NotificationItem";

import styles from "./NotificationList.module.css";

import { classNames } from "@/shared/lib";
import { toggleFeatures } from "@/shared/lib/features";
import { Skeleton as SkeletonDeprecated, VStack } from "@/shared/ui";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";

interface Props {
  className?: string;
}

export const NotificationList = memo(({ className }: Props) => {
  const { data: notifications, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  return (
    <VStack
      gap={16}
      className={classNames(styles.notificationList, {}, [className])}
    >
      {isLoading || !notifications ? (
        <>
          <Skeleton width="100%" borderRadius={8} height={80} />
          <Skeleton width="100%" borderRadius={8} height={80} />
          <Skeleton width="100%" borderRadius={8} height={80} />
        </>
      ) : (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} item={notification} />
        ))
      )}
    </VStack>
  );
});
