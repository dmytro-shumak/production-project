import { memo } from "react";

import type { Notification } from "../../model/types/notification";

import styles from "./NotificationItem.module.css";

import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Card as CardDeprecated,
  CardTheme,
  Text as TextDeprecated,
} from "@/shared/ui";
import { Card } from "@/shared/ui/redesigned/Card";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(({ className, item }: Props) => {
  const content = (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <Card className={classNames(styles.notificationItem, {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
      off={
        <CardDeprecated
          theme={CardTheme.Outlined}
          className={classNames(styles.notificationItem, {}, [className])}
        >
          <TextDeprecated title={item.title} text={item.description} />
        </CardDeprecated>
      }
    />
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
