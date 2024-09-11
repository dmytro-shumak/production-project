import { memo, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import styles from "./ArticleDetailedPage.module.css";

interface Props {
  className?: string;
}

const ArticleDetailedPage: FC<Props> = ({ className }) => {
  const { t } = useTranslation("article");
  return (
    <div className={classNames(styles.articleDetailedPage, {}, [className])}>
      article detailed page
    </div>
  );
};

export default memo(ArticleDetailedPage);
