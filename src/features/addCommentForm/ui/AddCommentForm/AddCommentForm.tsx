import { memo, useCallback, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import { Input } from "shared/ui/Input/Input";
import styles from "./AddCommentForm.module.css";

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (string: string) => void;
}

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation();
    const [text, setText] = useState("");

    const onCommentTextChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
      },
      [],
    );

    const handleSendComment = useCallback(() => {
      onSendComment(text);
      setText("");
    }, [onSendComment, text]);

    return (
      <div className={classNames(styles.addCommentForm, {}, [className])}>
        <Input
          placeholder={t("EnterTextComment")}
          value={text}
          onChange={onCommentTextChange}
          className={styles.input}
        />
        <Button theme={ButtonTheme.Primary} onClick={handleSendComment}>
          {t("Submit")}
        </Button>
      </div>
    );
  },
);

export default AddCommentForm;