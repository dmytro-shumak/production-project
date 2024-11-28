import { memo } from "react";
import { classNames } from "shared/lib";
import { Skeleton, VStack } from "shared/ui";
import styles from "./NotificationList.module.css";
import { useNotifications } from "../../api/notification";
import { NotificationItem } from "../NotificationItem/NotificationItem";

interface Props {
  className?: string;
}

export const NotificationList = memo(({ className }: Props) => {
  const { data: notifications, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
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
