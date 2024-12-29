import { memo } from "react";

import type { ArticleCodeBlock } from "../../model/types/article";

import styles from "./ArticleCodeBlockComponent.module.css";

import { classNames } from "@/shared/lib";
import { Code } from "@/shared/ui";

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
