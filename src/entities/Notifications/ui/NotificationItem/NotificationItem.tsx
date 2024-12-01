import { memo } from "react";
import { classNames } from "@/shared/lib";
import { Card, CardTheme, Text } from "@/shared/ui";
import styles from "./NotificationItem.module.css";
import type { Notification } from "../../model/types/notification";

interface Props {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(({ className, item }: Props) => {
  const content = (
    <Card
      theme={CardTheme.Outlined}
      className={classNames(styles.notificationItem, {}, [className])}
    >
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
