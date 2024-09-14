import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleCodeBlockComponent.module.css";

interface Props {
  className?: string;
}

export const ArticleCodeBlockComponent = memo(({ className }: Props) => {
  return (
    <div
      className={classNames(styles.articleCodeBlockComponent, {}, [className])}
    >
      ArticleCodeBlockComponent
    </div>
  );
});
