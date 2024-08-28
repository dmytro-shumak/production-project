import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Text.module.css";

export enum TextTheme {
  ERROR = "error",
}

interface Props {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text = memo(({ className, text, title, theme }: Props) => {
  return (
    <div
      className={classNames(styles.text, { [styles[theme]]: !!theme }, [
        className,
      ])}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
});