import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Avatar, Text } from "shared/ui";
import styles from "./CommentItem.module.css";
import type { Comment } from "../../model/types/comment";

interface Props {
  className?: string;
  comment: Comment;
}

export const CommentItem = memo(({ className, comment }: Props) => {
  return (
    <div className={classNames(styles.commentItem, {}, [className])}>
      <div className={styles.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text title={comment.user.username} />
      </div>
      <Text text={comment.text} className={styles.text} />
    </div>
  );
});
