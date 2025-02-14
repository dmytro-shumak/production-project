import { memo } from "react";
import { useParams } from "react-router-dom";

import { ArticleDetails } from "@/entities/Article";
import { Card } from "@/shared/ui/redesigned/Card";

interface Props {
  className?: string;
}

export const DetailsContainer = memo(({ className }: Props) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <Card className={className} padding="24" borderRadius={32}>
      <ArticleDetails id={id} />
    </Card>
  );
});
