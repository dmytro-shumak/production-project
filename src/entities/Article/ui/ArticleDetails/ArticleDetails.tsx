import { memo, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";

import styles from "./ArticleDetails.module.css";
import { renderArticleBlock } from "./renderArticleBlock";

import CalendarIcon from "@/shared/assets/icons/calendar.svg?react";
import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import {
  classNames,
  useAppDispatch,
  useAppSelector,
  useAsyncReducer,
  type ReducersList,
} from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  Avatar as AvatarDeprecated,
  HStack,
  Icon as IconDeprecated,
  Skeleton as SkeletonDeprecated,
  TextAlign,
  Text as TextDeprecated,
  TextSize,
  TextTheme,
} from "@/shared/ui";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  id: string;
}

const reducer: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
  const article = useAppSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center">
        <AvatarDeprecated
          size={200}
          src={article?.img}
          className={styles.avatar}
        />
      </HStack>
      <TextDeprecated
        title={article?.title}
        text={article?.subtitle}
        className={styles.title}
        size={TextSize.L}
      />
      <HStack justify="start" gap={6}>
        <IconDeprecated Svg={EyeIcon} />
        <TextDeprecated text={String(article?.views)} />
      </HStack>
      <HStack justify="start" gap={6}>
        <IconDeprecated Svg={CalendarIcon} />
        <TextDeprecated text={article?.createdAt} />
      </HStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useAppSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size="large" bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={<Skeleton width="100%" height={420} borderRadius={16} />}
        src={article?.img}
        className={styles.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails: FC<Props> = memo(({ className, id }) => {
  const { t } = useTranslation("article-details");
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const error = useAppSelector(getArticleDetailsError);

  useAsyncReducer(reducer, true);

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div>
        <SkeletonDeprecated
          width={200}
          height={200}
          borderRadius="100%"
          className={styles.avatar}
        />
        <SkeletonDeprecated width={300} height={32} className={styles.title} />
        <SkeletonDeprecated
          width={600}
          height={24}
          className={styles.skeleton}
        />
        <SkeletonDeprecated
          width="100%"
          height={200}
          className={styles.skeleton}
        />
        <SkeletonDeprecated
          width="100%"
          height={200}
          className={styles.skeleton}
        />
      </div>
    );
  }

  if (error) {
    return (
      <TextDeprecated
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
      <ToggleFeatures
        featureName="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    </div>
  );
});
