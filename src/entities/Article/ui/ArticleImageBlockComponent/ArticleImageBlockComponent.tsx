import { memo } from "react";

import type { ArticleImageBlock } from "../../model/types/article";

import styles from "./ArticleImageBlockComponent.module.css";

import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text as TextDeprecated } from "@/shared/ui";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: Props) => {
    return (
      <div className={classNames("", {}, [className])}>
        <img src={block.src} className={styles.img} alt={block.title} />
        {block.title && (
          <ToggleFeatures
            featureName="isAppRedesigned"
            on={<Text text={block.title} />}
            off={<TextDeprecated text={block.title} />}
          />
        )}
      </div>
    );
  },
);
