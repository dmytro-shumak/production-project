import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui";
import styles from "./ArticleTextBlockComponent.module.css";
import type { ArticleTextBlock } from "../../model/types/article";

interface Props {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({ className, block }: Props) => {
  return (
    <div className={classNames("", {}, [className])}>
      {block.title && <Text title={block.title} className={styles.title} />}
      {block.paragraphs.map((paragraph, index) => (
        <Text text={paragraph} key={index} className={styles.paragraph} />
      ))}
    </div>
  );
});
