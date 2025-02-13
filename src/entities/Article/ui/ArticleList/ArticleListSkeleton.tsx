import { memo } from "react";

import { ArticleView } from "../../model/types/article";

import styles from "./ArticleList.module.css";

import { toggleFeatures } from "@/shared/lib/features";
import {
  Card as CardDeprecated,
  Skeleton as SkeletonDeprecated,
} from "@/shared/ui";
import { Card as CardRedesigned } from "@/shared/ui/redesigned/Card";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";

interface Props {
  view?: ArticleView;
}

export const ArticleListSkeleton = memo(
  ({ view = ArticleView.GRID }: Props) => {
    const Skeleton = toggleFeatures({
      name: "isAppRedesigned",
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures({
      name: "isAppRedesigned",
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    });

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
