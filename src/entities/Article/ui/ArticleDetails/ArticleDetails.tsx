import { memo, useCallback, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";

import { ArticleBlockType } from "../../model/constants/article";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { type ArticleBlock } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import styles from "./ArticleDetails.module.css";

import CalendarIcon from "@/shared/assets/icons/calendar.svg?react";
import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import { classNames } from "@/shared/lib";
import {
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "@/shared/lib";
import {
  Avatar,
  HStack,
  Icon,
  Skeleton,
  Text,
  TextAlign,
  TextSize,
  TextTheme,
} from "@/shared/ui";

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
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            className={styles.block}
            block={block}
            key={block.id}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            className={styles.block}
            block={block}
            key={block.id}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            className={styles.block}
            block={block}
            key={block.id}
          />
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
    <div
      className={classNames(styles.articleDetails, {}, [className])}
      data-testid="ArticleDetails"
    >
      <HStack justify="center">
        <Avatar size={200} src={article?.img} className={styles.avatar} />
      </HStack>
      <Text
        title={article?.title}
        text={article?.subtitle}
        className={styles.title}
        size={TextSize.L}
      />
      <HStack justify="start" gap={6}>
        <Icon Svg={EyeIcon} />
        <Text text={String(article?.views)} />
      </HStack>
      <HStack justify="start" gap={6}>
        <Icon Svg={CalendarIcon} />
        <Text text={article?.createdAt} />
      </HStack>
      {article?.blocks.map(renderBlock)}
    </div>
  );
});
