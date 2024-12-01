import { memo } from "react";
import { classNames } from "@/shared/lib";
import { Code } from "@/shared/ui";
import type { ArticleCodeBlock } from "../../model/types/article";
import styles from "./ArticleCodeBlockComponent.module.css";

interface Props {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: Props) => {
  return (
    <div
      className={classNames(styles.articleCodeBlockComponent, {}, [className])}
    >
      <Code code={block.code} />
    </div>
  );
});
