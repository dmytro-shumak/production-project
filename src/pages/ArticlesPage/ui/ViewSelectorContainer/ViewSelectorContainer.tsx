import { memo } from "react";

import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

import { ArticleViewSelector } from "@/features/articleViewSelector";

interface Props {
  className?: string;
}

export const ViewSelectorContainer = memo(({ className }: Props) => {
  const { view, onChangeView } = useArticleFilters();

  return (
    <ArticleViewSelector
      className={className}
      view={view}
      onViewClick={onChangeView}
    />
  );
});
