import { memo } from "react";
import { useTranslation } from "react-i18next";

import type { Comment } from "../../model/types/comment";
import { CommentItem } from "../CommentItem/CommentItem";

import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: Props) => {
  const { t } = useTranslation("");
  if (isLoading) {
    return (
      <VStack gap={20}>
        <Skeleton height={86} />
        <Skeleton height={86} />
        <Skeleton height={86} />
      </VStack>
    );
  }

  return (
    <VStack gap={20} align="stretch" className={className}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      ) : (
        <Text text={t("CommentsEmpty")} />
      )}
    </VStack>
  );
});
