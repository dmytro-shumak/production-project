import { memo, type HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";

import { ArticleBlockType } from "../../model/constants/article";
import {
  ArticleView,
  type Article,
  type ArticleTextBlock,
} from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import styles from "./ArticleListItem.module.css";

import EyeIcon from "@/shared/assets/icons/eye.svg?react";
import { RoutesPath } from "@/shared/const/router";
import { classNames } from "@/shared/lib";
import {
  AppLink,
  Avatar,
  Button,
  ButtonTheme,
  Card,
  Icon,
  Text,
} from "@/shared/ui";

interface Props {
  className?: string;
  article: Article;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
  ({ className, article, view, target }: Props) => {
    const { t } = useTranslation("article");

    const types = (
      <Text text={article.type.join(", ")} className={styles.types} />
    );
    const views = (
      <>
        <Text text={String(article.views)} className={styles.views} />
        <Icon Svg={EyeIcon} />
      </>
    );

    if (view === ArticleView.LIST) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <div
          className={classNames(styles.articleListItem, {}, [
            className,
            styles.list,
          ])}
        >
          <Card>
            <div className={styles.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} className={styles.username} />
              <Text text={article.createdAt} className={styles.date} />
            </div>
            <Text text={article.title} className={styles.title} />
            {types}
            <img src={article.img} alt={article.title} className={styles.img} />
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={styles.textBlock}
              />
            )}
            <div className={styles.footer}>
              <AppLink
                to={`${RoutesPath.article_details}/${article.id}`}
                target={target}
              >
                <Button theme={ButtonTheme.Outline}>{t("ReadMore")}</Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <AppLink
        target={target}
        className={classNames(styles.articleListItem, {}, [
          className,
          styles.grid,
        ])}
        to={`${RoutesPath.article_details}/${article.id}`}
      >
        <Card>
          <div className={styles.imageWrapper}>
            <img src={article.img} alt={article.title} className={styles.img} />
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
