import { memo, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
// import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import styles from "./ArticleDetailedPage.module.css";

interface Props {
  className?: string;
}

const ArticleDetailedPage: FC<Props> = ({ className }) => {
  // const { t } = useTranslation("article");
  return (
    <div className={classNames(styles.articleDetailedPage, {}, [className])}>
      <ArticleDetails />
    </div>
  );
};

export default memo(ArticleDetailedPage);
