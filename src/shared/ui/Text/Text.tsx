import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Text.module.css";

export enum TextTheme {
  ERROR = "error",
  INVERTED = "inverted",
}

export enum TextAlign {
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
}

export enum TextSize {
  M = "sizeM",
  L = "sizeL",
}

interface Props {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = memo(
  ({
    className,
    text,
    title,
    theme,
    align = TextAlign.LEFT,
    size = TextSize.M,
  }: Props) => {
    return (
      <div
        className={classNames(styles.text, { [styles[theme!]]: !!theme }, [
          className,
          styles[align],
          styles[size],
        ])}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  },
);
