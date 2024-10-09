import {
  ArticleDetails,
  ArticleList,
  getArticleDetailsData,
} from "entities/Article";
import { CommentList } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { AddCommentForm, sendComment } from "features/addCommentForm";
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
import { Text, TextSize } from "shared/ui";
import { Page } from "widgets/Page";
import { ArticleDetailsPageHeader } from "pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { getArticleCommentIsLoading } from "../../model/selectors/comments";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleDetailsPageReducer } from "../../model/slices";
import { getArticleComments } from "../../model/slices/articleDetailsComments";
import { getArticleRecommendations } from "../../model/slices/articleDetailsRecommendations";
import styles from "./ArticleDetailsPage.module.css";

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
  const recommendationArticle = useAppSelector(
    getArticleRecommendations.selectAll,
  );
  const userData = useAppSelector(getUserAuthData);
  const article = useAppSelector(getArticleDetailsData);
  const isLoading = useAppSelector(getArticleCommentIsLoading);
  const dispatch = useAppDispatch();

  useAsyncReducer(reducers, true);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
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
      <ArticleList
        articles={recommendationArticle}
        className={styles.recommendations}
        target="_blank"
      />
      <Text
        title={t("Comments")}
        className={styles.commentTitle}
        size={TextSize.L}
      />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={isLoading} />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
