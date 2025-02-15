import { memo } from "react";

import type { Comment } from "../../model/types/comment";

import styles from "./CommentItem.module.css";

import { getRouteProfile } from "@/shared/const/router";
import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import {
  AppLinkDeprecated,
  Avatar as AvatarDeprecated,
  Text as TextDeprecated,
} from "@/shared/ui";
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
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <Card padding="24" borderRadius={20}>
          <div
            className={classNames(styles.commentItemRedesigned, {}, [
              className,
            ])}
            data-testid="CommentItem"
          >
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
      }
      off={
        <div
          className={classNames(styles.commentItem, {}, [className])}
          data-testid="CommentItem"
        >
          <AppLinkDeprecated
            className={styles.header}
            to={getRouteProfile(comment.user.id)}
          >
            {comment.user.avatar && (
              <AvatarDeprecated size={30} src={comment.user.avatar} />
            )}
            <TextDeprecated title={comment.user.username} />
          </AppLinkDeprecated>
          <TextDeprecated text={comment.text} className={styles.text} />
        </div>
      }
    />
  );
});
