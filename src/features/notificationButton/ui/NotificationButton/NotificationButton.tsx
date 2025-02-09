import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import styles from "./NotificationButton.module.css";

import { NotificationList } from "@/entities/Notifications";
import NotificationIcon from "@/shared/assets/icons/notification-new.svg?react";
import NotificationIconDeprecated from "@/shared/assets/icons/notification.svg?react";
import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Button as ButtonDeprecated,
  ButtonTheme,
  Icon as IconDeprecated,
  Popover as PopoverDeprecated,
} from "@/shared/ui";
import { Drawer } from "@/shared/ui/deprecated/Drawer";
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
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={handleOpenDrawer} />}
      off={
        <ButtonDeprecated onClick={handleOpenDrawer} theme={ButtonTheme.Clear}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          featureName="isAppRedesigned"
          on={
            <Popover
              anchor="bottom end"
              menuClassName={styles.notificationMenu}
              className={classNames("", {}, [className])}
              button={button}
            >
              <NotificationList className={styles.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              anchor="bottom end"
              menuClassName={styles.notificationMenu}
              className={classNames("", {}, [className])}
              button={button}
            >
              <NotificationList className={styles.notifications} />
            </PopoverDeprecated>
          }
        />
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
