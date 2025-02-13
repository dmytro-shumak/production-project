import { memo, type HTMLAttributeAnchorTarget } from "react";

import { ArticleView, type Article } from "../../model/types/article";

import { ArticleListItemDeprecated } from "./ArticleListItemDeprecated/ArticleListItemDeprecated";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

import { ToggleFeatures } from "@/shared/lib/features";

interface Props {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: Props) => {
  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
});
