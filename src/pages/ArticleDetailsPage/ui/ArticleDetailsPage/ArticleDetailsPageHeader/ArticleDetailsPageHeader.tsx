import { getArticleDetailsData } from "entities/Article";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "shared/config/routeConfig/routeConfig";
import { useAppSelector } from "shared/lib";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { getCanEditArticle } from "../../../model/selectors/article";
import styles from "./ArticleDetailsPageHeader.module.css";

interface Props {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation("article-details");
  const canEdit = useAppSelector(getCanEditArticle);
  const article = useAppSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(RoutesPath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    article?.id && navigate(`${RoutesPath.articles}/${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div
      className={classNames(styles.articleDetailsPageHeader, {}, [className])}
    >
      <Button theme={ButtonTheme.Outline} onClick={onBackToList}>
        {t("BackToList")}
      </Button>
      {canEdit && (
        <Button
          theme={ButtonTheme.Outline}
          onClick={onEditArticle}
          className={styles.editBtn}
        >
          {t("Edit")}
        </Button>
      )}
    </div>
  );
});
