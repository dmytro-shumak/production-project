import { memo, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
// import styles from "./ArticlesPage.module.css";

interface Props {
  className?: string;
}

const ArticlesPage: FC<Props> = ({ className }) => {
  return (
    <div className={classNames("styles.articlesPage", {}, [className])}>
      articlesPage
    </div>
  );
};

export default memo(ArticlesPage);
