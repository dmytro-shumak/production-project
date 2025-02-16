import { memo } from "react";

import type { Comment } from "../../model/types/comment";

import styles from "./CommentItem.module.css";

import { getRouteProfile } from "@/shared/const/router";
import { AppLink } from "@/shared/ui/redesigned";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Card } from "@/shared/ui/redesigned/Card";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  comment: Comment;
}

export const CommentItem = memo(({ className, comment }: Props) => {
  return (
    <Card padding="24" borderRadius={20}>
      <div className={className} data-testid="CommentItem">
        <AppLink
          className={styles.header}
          to={getRouteProfile(comment.user.id)}
        >
          {comment.user.avatar && (
            <Avatar size={30} src={comment.user.avatar} />
          )}
          <Text text={comment.user.username} bold />
        </AppLink>
        <Text text={comment.text} />
      </div>
    </Card>
  );
});
