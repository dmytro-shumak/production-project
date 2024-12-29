import { memo, useCallback } from "react";

import { getArticleCommentIsLoading } from "../../model/selectors/comments";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "../../model/slices/articleDetailsComments";

import { getArticleDetailsData } from "@/entities/Article";
import { CommentList } from "@/entities/Comment";
import { getUserAuthData } from "@/entities/User";
import { AddCommentForm, sendComment } from "@/features/addCommentForm";
import {
  useAppDispatch,
  useAppSelector,
  useInitialEffect,
  classNames,
} from "@/shared/lib";
import { VStack } from "@/shared/ui";

interface Props {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo(({ className, id }: Props) => {
  const comments = useAppSelector(getArticleComments.selectAll);
  const userData = useAppSelector(getUserAuthData);
  const article = useAppSelector(getArticleDetailsData);
  const isLoading = useAppSelector(getArticleCommentIsLoading);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    async (text: string) => {
      try {
        await sendComment(text, userData?.id, article?.id);
        dispatch(fetchCommentsByArticleId(id));
      } catch (error) {
        console.error("Failed to send comment:", error);
      }
    },
    [article?.id, dispatch, id, userData?.id],
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <div className={classNames("", {}, [className])}>
      <VStack gap={20} align="stretch">
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </VStack>
    </div>
  );
});
