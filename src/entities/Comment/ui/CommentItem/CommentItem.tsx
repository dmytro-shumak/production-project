import { memo } from "react";

import type { Comment } from "../../model/types/comment";

import styles from "./CommentItem.module.css";

import { getRouteProfile } from "@/shared/const/router";
import { classNames } from "@/shared/lib";
import { AppLink, Avatar, Text } from "@/shared/ui";

interface Props {
  className?: string;
  comment: Comment;
}

export const CommentItem = memo(({ className, comment }: Props) => {
  return (
    <div className={classNames(styles.commentItem, {}, [className])}>
      <AppLink className={styles.header} to={getRouteProfile(comment.user.id)}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text title={comment.user.username} />
      </AppLink>
      <Text text={comment.text} className={styles.text} />
    </div>
  );
});
