import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import NotificationIcon from "shared/assets/icons/notification.svg";

import { Button, ButtonTheme, Icon, Popover } from "shared/ui";
import { NotificationList } from "entities/Notifications";
import styles from "./NotificationButton.module.css";

interface Props {
  className?: string;
}

export const NotificationButton = memo(({ className }: Props) => {
  return (
    <Popover
      anchor="bottom end"
      menuClassName={styles.notificationMenu}
      className={classNames('', {}, [className])}
      button={
        <Button theme={ButtonTheme.Clear}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      }
    >
      <NotificationList className={styles.notifications} />
    </Popover>
  );
});
