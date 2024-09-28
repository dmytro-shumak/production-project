import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Skeleton, Text } from "shared/ui";
import type { Comment } from "../../model/types/comment";
import { CommentItem } from "../CommentItem/CommentItem";
import styles from "./CommentList.module.css";

interface Props {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: Props) => {
  const { t } = useTranslation("");

  if (isLoading) {
    return (
      <div>
        <Skeleton className={styles.skeleton} height={86} />
        <Skeleton className={styles.skeleton} height={86} />
        <Skeleton className={styles.skeleton} height={86} />
      </div>
    );
  }

  return (
    <div className={classNames("", {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      ) : (
        <Text text={t("CommentsEmpty")} />
      )}
    </div>
  );
});
