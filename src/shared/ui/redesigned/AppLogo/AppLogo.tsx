import { memo } from "react";

import { HStack } from "../Stack";

import styles from "./AppLogo.module.css";

import AppSvg from "@/shared/assets/icons/logo.svg?react";
import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: Props) => {
  return (
    <HStack
      justify="center"
      className={classNames(styles.appLogoWrapper, {}, [className])}
    >
      <div className={styles.gradientBig} />
      <div className={styles.gradientSmall} />
      <AppSvg
        className={styles.appLogo}
        width={size}
        height={size}
        color="pink"
      />
    </HStack>
  );
});
