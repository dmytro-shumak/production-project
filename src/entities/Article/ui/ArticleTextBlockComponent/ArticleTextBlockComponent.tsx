import { memo } from "react";

import type { ArticleTextBlock } from "../../model/types/article";

import styles from "./ArticleTextBlockComponent.module.css";

import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text as TextDeprecated } from "@/shared/ui";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({ className, block }: Props) => {
  return (
    <div className={classNames("", {}, [className])}>
      {block.title && (
        <ToggleFeatures
          featureName="isAppRedesigned"
          on={<Text title={block.title} className={styles.title} />}
          off={<TextDeprecated title={block.title} className={styles.title} />}
        />
      )}
      {block.paragraphs.map((paragraph, index) => (
        <ToggleFeatures
          featureName="isAppRedesigned"
          on={
            <Text text={paragraph} key={index} className={styles.paragraph} />
          }
          off={
            <TextDeprecated
              text={paragraph}
              key={index}
              className={styles.paragraph}
            />
          }
        />
      ))}
    </div>
  );
});
