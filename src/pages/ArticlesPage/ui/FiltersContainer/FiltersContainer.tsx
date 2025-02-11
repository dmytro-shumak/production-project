import { memo } from "react";

import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

import { ArticlesFilters } from "@/widgets/ArticlesFilters";

interface Props {
  className?: string;
}

export const FiltersContainer = memo(({ className }: Props) => {
  const props = useArticleFilters();

  return <ArticlesFilters {...props} className={className} />;
});
