import { memo, type HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";

import { ArticleBlockType } from "../../../model/constants/article";
import {
  ArticleView,
  type Article,
  type ArticleTextBlock,
} from "../../../model/types/article";

import styles from "./ArticleListItemRedesigned.module.css";

import EyeIcon from "@/shared/assets/icons/view.svg?react";
import { getRouteArticleDetails } from "@/shared/const/router";
import { classNames } from "@/shared/lib";
import { HStack, VStack } from "@/shared/ui";
import { AppLink } from "@/shared/ui/redesigned";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  article: Article;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItemRedesigned = memo(
  ({ className, article, target, view }: Props) => {
    const { t } = useTranslation();

    const types = (
      <Text text={article.type.join(", ")} className={styles.types} />
    );
    const views = (
      <HStack gap={8}>
        <Icon Svg={EyeIcon} />
        <Text text={String(article.views)} className={styles.views} />
      </HStack>
    );

    if (view === ArticleView.LIST) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <Card
          padding="24"
          data-testid="ArticleItem"
          className={classNames(styles.articleListItem, {}, [
            className,
            styles.list,
          ])}
        >
          <VStack gap={16} align="start">
            <HStack gap={8}>
              <Avatar size={32} src={article.user.avatar} />
              <Text bold text={article.user.username} />
              <Text text={article.createdAt} />
            </HStack>
            <Text text={article.title} bold className={styles.title} />
            <Text text={article.subtitle} size="small" />
            <AppImage
              fallback={<Skeleton width="100%" height="250px" />}
              src={article.img}
              alt={article.title}
              className={styles.img}
            />
            {textBlock.paragraphs && (
              <Text
                className={styles.textBlock}
                title={textBlock.paragraphs.slice(0, 2).join(" ")}
              />
            )}
            <HStack justify="between" className={styles.footer}>
              <AppLink to={getRouteArticleDetails(article.id)} target={target}>
                <Button variant="outline">{t("ReadMore")}</Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        data-testid="ArticleItem"
        target={target}
        className={classNames(styles.articleListItem, {}, [
          className,
          styles.grid,
        ])}
        to={getRouteArticleDetails(article.id)}
      >
        <Card>
          <div className={styles.imageWrapper}>
            <AppImage
              fallback={<Skeleton width="100%" height="100%" />}
              src={article.img}
              alt={article.title}
              className={styles.img}
            />
            <Text text={article.createdAt} className={styles.date} />
          </div>
          <div className={styles.infoWrapper}>
            {types}
            {views}
          </div>
          <Text text={article.title} className={styles.title} />
        </Card>
      </AppLink>
    );
  },
);
