import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import NotificationIcon from "@/shared/assets/icons/notification.svg?react";
import { classNames } from "@/shared/lib";

import { NotificationList } from "@/entities/Notifications";
import { Button, ButtonTheme, Icon, Popover } from "@/shared/ui";
import { Drawer } from "@/shared/ui/Drawer";
import styles from "./NotificationButton.module.css";

interface Props {
  className?: string;
}

export const NotificationButton = memo(({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const button = (
    <Button onClick={handleOpenDrawer} theme={ButtonTheme.Clear}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          anchor="bottom end"
          menuClassName={styles.notificationMenu}
          className={classNames("", {}, [className])}
          button={button}
        >
          <NotificationList className={styles.notifications} />
        </Popover>
      </BrowserView>

      <MobileView>
        {button}
        <Drawer isOpen={isOpen} onClose={handleCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
