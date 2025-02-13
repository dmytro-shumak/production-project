import { memo } from "react";

import styles from "./Text.module.css";

import { classNames } from "@/shared/lib";

export type TextVariant = "primary" | "error" | "accent";

export type TextAlign = "left" | "center" | "right";

export type TextSize = "small" | "medium" | "large";

interface Props {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
}

type HeaderTag = "h1" | "h2" | "h3";

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
  small: "h3",
  medium: "h2",
  large: "h1",
};

export const Text = memo(
  ({
    className,
    text,
    title,
    bold,
    variant = "primary",
    align = "left",
    size = "medium",
  }: Props) => {
    const Header = mapSizeToHeaderTag[size];

    return (
      <div
        className={classNames(styles.text, { [styles.bold]: bold }, [
          className,
          styles[align],
          styles[size],
          styles[variant],
        ])}
      >
        {title && <Header className={styles.title}>{title}</Header>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  },
);
