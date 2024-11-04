import { getArticleDetailsData } from "entities/Article";
import { CommentList } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { AddCommentForm, sendComment } from "features/addCommentForm";
import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector, useInitialEffect } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { VStack } from "shared/ui";
import { getArticleCommentIsLoading } from "../../model/selectors/comments";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "../../model/slices/articleDetailsComments";
import styles from "./ArticleDetailsComments.module.css";

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
    <div className={classNames(styles.articleDetailsComments, {}, [className])}>
      <VStack gap={20} align="stretch">
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </VStack>
    </div>
  );
});
