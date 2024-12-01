import { memo } from "react";
import { classNames } from "@/shared/lib";
import { Text } from "@/shared/ui";
import styles from "./ArticleImageBlockComponent.module.css";
import type { ArticleImageBlock } from "../../model/types/article";

interface Props {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: Props) => {
    return (
      <div className={classNames("", {}, [className])}>
        <img src={block.src} className={styles.img} alt={block.title} />
        {block.title && <Text text={block.title} />}
      </div>
    );
  },
);
