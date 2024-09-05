import { useMemo, type CSSProperties, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Avatar.module.css";

interface Props {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<Props> = ({ className, src, size, alt }) => {
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size || 50,
      height: size || 50,
    };
  }, [size]);

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={classNames(styles.avatar, {}, [className])}
    />
  );
};
