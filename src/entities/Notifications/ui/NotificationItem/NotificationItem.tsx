import { memo } from "react";

import type { Notification } from "../../model/types/notification";

import styles from "./NotificationItem.module.css";

import { classNames } from "@/shared/lib";
import { Card } from "@/shared/ui/redesigned/Card";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(({ className, item }: Props) => {
  const content = (
    <Card className={classNames(styles.notificationItem, {}, [className])}>
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a
        target="_blank"
        href={item.href}
        className={styles.link}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
});
