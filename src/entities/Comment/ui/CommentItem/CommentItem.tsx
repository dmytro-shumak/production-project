import { memo } from "react";
import { classNames } from "@/shared/lib";
import { AppLink, Avatar, Text } from "@/shared/ui";
import { RoutesPath } from "@/shared/const/router";
import styles from "./CommentItem.module.css";
import type { Comment } from "../../model/types/comment";

interface Props {
  className?: string;
  comment: Comment;
}

export const CommentItem = memo(({ className, comment }: Props) => {
  return (
    <div className={classNames(styles.commentItem, {}, [className])}>
      <AppLink
        className={styles.header}
        to={`${RoutesPath.profile}/${comment.user.id}`}
      >
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} className={styles.text} />
    </div>
  );
});
