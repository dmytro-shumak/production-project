import { memo } from "react";
import { useParams } from "react-router-dom";

import styles from "./ArticleEditPage.module.css";

import { classNames } from "@/shared/lib";
import { Page } from "@/widgets/Page";

interface Props {
  className?: string;
}

const ArticleEditPage = memo(({ className }: Props) => {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <Page className={classNames(styles.articleEditPage, {}, [className])}>
      {isEdit ? "edit" : "create"}
    </Page>
  );
});

export default ArticleEditPage;
