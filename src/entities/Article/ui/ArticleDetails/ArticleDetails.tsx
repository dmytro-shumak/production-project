import { memo, useCallback, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import CalendarIcon from "shared/assets/icons/calendar.svg";
import EyeIcon from "shared/assets/icons/eye.svg";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import {
  Avatar,
  Icon,
  Skeleton,
  Text,
  TextAlign,
  TextSize,
  TextTheme,
} from "shared/ui";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { ArticleBlockType, type ArticleBlock } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import styles from "./ArticleDetails.module.css";

interface Props {
  className?: string;
  id: string;
}

const reducer: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<Props> = memo(({ className, id }) => {
  const { t } = useTranslation("article-details");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const article = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);

  useAsyncReducer(reducer, true);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent className={styles.block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent className={styles.block} />;
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent className={styles.block} block={block} />
        );
      default:
        return null;
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <Skeleton
          width={200}
          height={200}
          borderRadius="100%"
          className={styles.avatar}
        />
        <Skeleton width={300} height={32} className={styles.title} />
        <Skeleton width={600} height={24} className={styles.skeleton} />
        <Skeleton width="100%" height={200} className={styles.skeleton} />
        <Skeleton width="100%" height={200} className={styles.skeleton} />
      </div>
    );
  }

  if (error) {
    return (
      <Text
        title={t("ErrorLoadingDetailsPage")}
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
      />
    );
  }

  return (
    <div className={classNames(styles.articleDetails, {}, [className])}>
      <div className={styles.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={styles.avatar} />
      </div>
      <Text
        title={article?.title}
        text={article?.subtitle}
        className={styles.title}
        size={TextSize.L}
      />
      <div className={styles.articleInfo}>
        <Icon Svg={EyeIcon} />
        <Text text={String(article?.views)} />
      </div>
      <div className={styles.articleInfo}>
        <Icon Svg={CalendarIcon} />
        <Text text={article?.createdAt} />
      </div>
      {article?.blocks.map(renderBlock)}
    </div>
  );
});
