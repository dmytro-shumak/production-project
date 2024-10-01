import { memo } from "react";
import { Card, Skeleton } from "shared/ui";
import styles from "./ArticleList.module.css";
import { ArticleView } from "../../model/types/article";

interface Props {
  view?: ArticleView;
}

export const ArticleListSkeleton = memo(
  ({ view = ArticleView.GRID }: Props) => {
    if (view === ArticleView.GRID) {
      return new Array(9).fill(0).map((_item, index) => (
        <Card key={index}>
          <Skeleton width={200} height={200} />
          <Skeleton width={200} height={24} />
          <Skeleton width={200} height={24} />
        </Card>
      ));
    }

    return new Array(3).fill(0).map((_item, index) => (
      <Card key={index}>
        <div className={styles.header}>
          <Skeleton
            width={30}
            height={30}
            borderRadius="100%"
            className={styles.avatar}
          />
          <Skeleton width={70} height={24} />
          <Skeleton width={60} height={24} className={styles.date} />
        </div>
        <Skeleton width={300} height={24} className={styles.text} />
        <Skeleton width={250} height={24} className={styles.text} />
        <Skeleton width="100%" height={200} className={styles.img} />
        <Skeleton width="100%" height={120} className={styles.textBlock} />
        <div className={styles.footerWrapper}>
          <Skeleton width={111} height={42} />
          <Skeleton width={60} height={24} />
        </div>
      </Card>
    ));
  },
);
