import { memo, useCallback, useEffect, type ReactNode } from "react";

import { Overlay } from "../Overlay";
import { Portal } from "../Portal/Portal";

import styles from "./Drawer.module.css";

import { classNames, useModal } from "@/shared/lib";
import { AnimationProvider, useAnimationLibs } from "@/shared/lib/components";
import { useTheme } from "@/shared/lib/hooks";

interface Props {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100;

// TODO: improve first animation
/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
const DrawerContent = memo(
  ({ children, className, isOpen, onClose }: Props) => {
    const { Gesture, Spring } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: 0 }));
    const { theme } = useTheme();

    const openDrawer = useCallback(() => {
      api.start({ y: 0, immediate: false });
    }, [api]);

    const close = (velocity = 0) => {
      api.start({
        y: height,
        immediate: false,
        config: { ...Spring.config.stiff, velocity },
        onResolve: onClose,
      });
    };

    useEffect(() => {
      if (isOpen) {
        openDrawer();
      }
    }, [isOpen, openDrawer]);

    const bind = Gesture.useDrag(
      ({
        last,
        velocity: [, vy],
        direction: [, dy],
        movement: [, my],
        cancel,
      }) => {
        if (my < -70) cancel();

        if (last) {
          if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
            close();
          } else {
            openDrawer();
          }
        } else {
          api.start({ y: my, immediate: true });
        }
      },
      {
        from: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true,
      },
    );

    useModal({ isOpen, onClose });

    const display = y.to((py) => {
      return py <= height ? "block" : "none";
    });

    return (
      <Portal>
        <div
          className={classNames(
            styles.drawer,
            {
              [styles.opened]: isOpen,
            },
            [className, theme, "app_drawer"],
          )}
        >
          <Overlay onClick={onClose} className={styles.overlay} />
          <Spring.a.div
            className={styles.sheet}
            style={{
              display,
              bottom: `calc(-100vh + ${height - 100}px)`,
              y,
            }}
            {...bind()}
          >
            {children}
          </Spring.a.div>
        </div>
      </Portal>
    );
  },
);

const DrawerAsync = memo((props: Props) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
});

export const Drawer = memo((props: Props) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />;
    </AnimationProvider>
  );
});
