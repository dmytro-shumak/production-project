import { memo, useCallback } from "react";

import { getArticlePageView } from "../../model/selectors/articlePageSelector";
import { articlePageActions } from "../../model/slices/articlePageSlice";

import type { ArticleView } from "@/entities/Article";
import { ArticleViewSelector } from "@/features/articleViewSelector";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

interface Props {
  className?: string;
}

export const ViewSelectorContainer = memo(({ className }: Props) => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(getArticlePageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  return (
    <ArticleViewSelector
      className={className}
      view={view}
      onViewClick={onChangeView}
    />
  );
});
