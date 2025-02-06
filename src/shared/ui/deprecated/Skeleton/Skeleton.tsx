import { memo } from "react";

import styles from "./Skeleton.module.css";

import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const Skeleton = memo(
  ({ className, borderRadius, height, width }: Props) => {
    return (
      <div
        className={classNames(styles.skeleton, {}, [className])}
        style={{ borderRadius, height, width }}
      />
    );
  },
);
