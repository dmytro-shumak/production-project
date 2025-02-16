import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import styles from "./NotificationButton.module.css";

import { NotificationList } from "@/entities/Notifications";
import NotificationIcon from "@/shared/assets/icons/notification-new.svg?react";
import { classNames } from "@/shared/lib";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Popover } from "@/shared/ui/redesigned/Popups";

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
    <Icon Svg={NotificationIcon} clickable onClick={handleOpenDrawer} />
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
