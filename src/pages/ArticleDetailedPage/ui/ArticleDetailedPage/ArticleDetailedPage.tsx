import { memo, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
// import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import styles from "./ArticleDetailedPage.module.css";

interface Props {
  className?: string;
}

const ArticleDetailedPage: FC<Props> = ({ className }) => {
  // const { t } = useTranslation("article");
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <div className={classNames(styles.articleDetailedPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailedPage);
