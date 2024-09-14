import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleImageBlockComponent.module.css";

interface Props {
  className?: string;
}

export const ArticleImageBlockComponent = memo(({ className }: Props) => {
  return (
    <div
      className={classNames(styles.articleImageBlockComponent, {}, [className])}
    >
      ArticleImageBlockComponent
    </div>
  );
});
