import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Text.module.css";

export enum TextTheme {
  ERROR = "error",
}

export enum TextAlign {
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
}

interface Props {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

export const Text = memo(
  ({ className, text, title, theme, align = TextAlign.LEFT }: Props) => {
    return (
      <div
        className={classNames(styles.text, { [styles[theme!]]: !!theme }, [
          className,
          styles[align],
        ])}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  },
);
