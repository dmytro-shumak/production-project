import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./AddCommentForm.module.css";

interface Props {
  className?: string;
}

export const AddCommentForm = memo(({ className }: Props) => {
  return <div className={classNames(styles.addCommentForm, {}, [className])} />;
});
