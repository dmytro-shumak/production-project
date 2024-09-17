import { memo, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { Text } from "shared/ui";
import { useTranslation } from "react-i18next";
import { CommentList } from "entities/Comment";
import { useAppSelector, useAsyncReducer, type ReducersList } from "shared/lib";
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

  useAsyncReducer(reducers, true);

  if (!id) {
    return null;
  }

  return (
    <div className={classNames(styles.articleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text title={t("Comments")} className={styles.commentTitle} />
      <CommentList comments={comments} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
