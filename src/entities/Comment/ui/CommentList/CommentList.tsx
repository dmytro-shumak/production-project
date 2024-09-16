import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui";
import { useTranslation } from "react-i18next";
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
  return (
    <div className={classNames(styles.commentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => <CommentItem comment={comment} />)
      ) : (
        <Text text={t("CommentsEmpty")} />
      )}
    </div>
  );
});
