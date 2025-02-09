import { useMemo, type CSSProperties, type FC } from "react";

import AvatarFilled from "../../../assets/icons/avatar-filled.svg?react";
import { AppImage } from "../../redesigned/AppImage";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

import styles from "./Avatar.module.css";

import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<Props> = ({ className, src, size = 50, alt }) => {
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  return (
    <AppImage
      fallback={<Skeleton width={size} height={size} borderRadius="100%" />}
      errorFallback={<Icon Svg={AvatarFilled} width={size} height={size} />}
      src={src}
      alt={alt}
      style={style}
      className={classNames(styles.avatar, {}, [className])}
    />
  );
};
