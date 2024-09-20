import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui";
import { useTranslation } from "react-i18next";
import { Loader } from "shared/ui/Loader";
import { CommentItem } from "../CommentItem/CommentItem";
import type { Comment } from "../../model/types/comment";
import styles from "./CommentList.module.css";

interface Props {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: Props) => {
  const { t } = useTranslation("");

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <div className={classNames("", {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => <CommentItem comment={comment} />)
      ) : (
        <Text text={t("CommentsEmpty")} />
      )}
    </div>
  );
});
