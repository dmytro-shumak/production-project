import { memo } from "react";
import { classNames } from "@/shared/lib";
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
  S = "sizeS",
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

type HeaderTag = "h1" | "h2" | "h3";

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
  [TextSize.S]: "h3",
  [TextSize.M]: "h2",
  [TextSize.L]: "h1",
};

export const Text = memo(
  ({
    className,
    text,
    title,
    theme,
    align = TextAlign.LEFT,
    size = TextSize.M,
  }: Props) => {
    const Header = mapSizeToHeaderTag[size];

    return (
      <div
        className={classNames(styles.text, { [styles[theme!]]: !!theme }, [
          className,
          styles[align],
          styles[size],
        ])}
      >
        {title && <Header className={styles.title}>{title}</Header>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  },
);
