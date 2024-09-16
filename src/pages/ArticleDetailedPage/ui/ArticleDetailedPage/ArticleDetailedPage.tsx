import { memo, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { Text } from "shared/ui";
import { useTranslation } from "react-i18next";
import { CommentList } from "entities/Comment";
import styles from "./ArticleDetailedPage.module.css";

interface Props {
  className?: string;
}

const ArticleDetailedPage: FC<Props> = ({ className }) => {
  const { t } = useTranslation("article-details");
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <div className={classNames(styles.articleDetailedPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text title={t("Comments")} className={styles.commentTitle} />
      <CommentList
        comments={[
          {
            id: "1",
            text: "Comment 1",
            user: {
              id: "1",
              username: "235",
              avatar:
                "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
            },
          },
          {
            id: "2",
            text: "Comment 2",
            user: {
              id: "1",
              username: "235",
            },
          },
        ]}
      />
    </div>
  );
};

export default memo(ArticleDetailedPage);
