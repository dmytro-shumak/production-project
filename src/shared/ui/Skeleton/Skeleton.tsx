import { memo } from "react";
import { classNames } from "@/shared/lib";
import styles from "./Skeleton.module.css";

interface Props {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
}

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
