import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Skeleton, Text, VStack } from "shared/ui";
import type { Comment } from "../../model/types/comment";
import { CommentItem } from "../CommentItem/CommentItem";

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
    <VStack
      gap={20}
      align="stretch"
      className={classNames("", {}, [className])}
    >
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
