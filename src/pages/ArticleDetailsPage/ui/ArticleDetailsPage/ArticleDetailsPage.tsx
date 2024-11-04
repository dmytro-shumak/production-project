import { ArticleDetails } from "entities/Article";
import { ArticleRecommendationsList } from "features/articleRecommendationsList";
import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAsyncReducer, type ReducersList } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui";
import { Page } from "widgets/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../../ui/ArticleDetailsComments/ArticleDetailsComments";
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

  useAsyncReducer(reducers, true);

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
      <ArticleDetailsComments id={id} />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
