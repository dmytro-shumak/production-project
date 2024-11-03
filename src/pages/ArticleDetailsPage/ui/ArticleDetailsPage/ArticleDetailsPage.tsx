import { ArticleDetails, getArticleDetailsData } from "entities/Article";
import { CommentList } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { AddCommentForm, sendComment } from "features/addCommentForm";
import { ArticleRecommendationsList } from "features/articleRecommendationsList";
import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text, TextSize, VStack } from "shared/ui";
import { Page } from "widgets/Page";
import { getArticleCommentIsLoading } from "../../model/selectors/comments";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleDetailsPageReducer } from "../../model/slices";
import { getArticleComments } from "../../model/slices/articleDetailsComments";
import styles from "./ArticleDetailsPage.module.css";
import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader/ArticleDetailsPageHeader";

interface Props {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<Props> = ({ className }) => {
  const { t } = useTranslation("article-details");
  const { id } = useParams();
  const comments = useAppSelector(getArticleComments.selectAll);
  const userData = useAppSelector(getUserAuthData);
  const article = useAppSelector(getArticleDetailsData);
  const isLoading = useAppSelector(getArticleCommentIsLoading);
  const dispatch = useAppDispatch();

  useAsyncReducer(reducers, true);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

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

  if (!id) {
    return null;
  }

  return (
    <Page className={classNames(styles.articleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader />
      <ArticleDetails id={id} />
      <Text
        title={t("Recommendations")}
        className={styles.commentTitle}
        size={TextSize.L}
      />
      <ArticleRecommendationsList />
      <VStack gap={20} align="stretch">
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);
