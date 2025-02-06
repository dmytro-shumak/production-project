import { memo, useCallback, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import styles from "./AddCommentForm.module.css";

import { classNames } from "@/shared/lib";
import { Button, ButtonTheme, HStack } from "@/shared/ui";
import { Input } from "@/shared/ui/deprecated/Input";

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
      <HStack
        justify="between"
        align="center"
        className={classNames(styles.addCommentForm, {}, [className])}
        data-testid="AddCommentForm"
      >
        <Input
          placeholder={t("EnterTextComment")}
          value={text}
          onChange={onCommentTextChange}
          className={styles.input}
          data-testid="AddCommentForm.Input"
        />
        <Button
          theme={ButtonTheme.Primary}
          onClick={handleSendComment}
          data-testid="AddCommentForm.Button"
        >
          {t("Submit")}
        </Button>
      </HStack>
    );
  },
);

export default AddCommentForm;
