import { memo, type HTMLAttributeAnchorTarget } from "react";

import { ArticleView, type Article } from "../../model/types/article";

import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

interface Props {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: Props) => {
  return <ArticleListItemRedesigned {...props} />;
});
