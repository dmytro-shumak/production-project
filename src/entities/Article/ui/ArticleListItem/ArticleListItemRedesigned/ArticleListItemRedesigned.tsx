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
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItemRedesigned = memo(
  ({ className, article, target, view }: Props) => {
    const { t } = useTranslation();

    const userInfo = (
      <>
        <Avatar size={32} src={article.user.avatar} className={styles.avatar} />
        <Text bold text={article.user.username} />
      </>
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
              {userInfo}
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
        data-testid="ArticleListItem"
        target={target}
        to={getRouteArticleDetails(article.id)}
        className={classNames(styles.ArticleListItem, {}, [
          className,
          styles[view],
        ])}
      >
        <Card className={styles.card} borderRadius={20} padding="0">
          <AppImage
            fallback={<Skeleton width="100%" height={200} />}
            alt={article.title}
            src={article.img}
            className={styles.img}
          />
          <VStack className={styles.info} gap="4">
            <Text title={article.title} className={styles.title} />
            <VStack gap="4" className={styles.footer}>
              <HStack justify="between">
                <Text text={article.createdAt} className={styles.date} />
                {views}
              </HStack>
              <HStack gap={8} justify="start">
                {userInfo}
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);
