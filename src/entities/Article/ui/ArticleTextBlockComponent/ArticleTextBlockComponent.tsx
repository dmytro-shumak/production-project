import { memo } from "react";

import type { ArticleTextBlock } from "../../model/types/article";

import styles from "./ArticleTextBlockComponent.module.css";

import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({ className, block }: Props) => {
  return (
    <div className={className}>
      {block.title && <Text title={block.title} className={styles.title} />}
      {block.paragraphs.map((paragraph, index) => (
        <Text text={paragraph} key={index} className={styles.paragraph} />
      ))}
    </div>
  );
});
