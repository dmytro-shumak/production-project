import { ArticleDetails, getArticleDetailsData } from "entities/Article";
import { CommentList } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { AddCommentForm, sendComment } from "features/addCommentForm";
import { getArticleCommentIsLoading } from "pages/ArticleDetailsPage/model/selectors/comment";
import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesPath } from "shared/config/routeConfig/routeConfig";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Button, ButtonTheme, Text } from "shared/ui";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsComments";
import styles from "./ArticleDetailsPage.module.css";

interface Props {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<Props> = ({ className }) => {
  const { t } = useTranslation("article-details");
  const { id } = useParams();
  const comments = useAppSelector(getArticleComments.selectAll);
  const userData = useAppSelector(getUserAuthData);
  const article = useAppSelector(getArticleDetailsData);
  const isLoading = useAppSelector(getArticleCommentIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onBackToList = useCallback(() => {
    navigate(RoutesPath.articles);
  }, [navigate]);

  if (!id) {
    return null;
  }

  return (
    <div className={classNames(styles.articleDetailsPage, {}, [className])}>
      <Button theme={ButtonTheme.Outline} onClick={onBackToList}>
        {t("BackToList")}
      </Button>
      <ArticleDetails id={id} />
      <Text title={t("Comments")} className={styles.commentTitle} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={isLoading} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
