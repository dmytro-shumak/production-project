import { memo, useCallback, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import styles from "./AddCommentForm.module.css";

import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";
import { Input } from "@/shared/ui/redesigned/Input";
import { HStack } from "@/shared/ui/redesigned/Stack";

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
      <Card padding="24" borderRadius={20}>
        <HStack
          gap={16}
          justify="between"
          align="center"
          className={className}
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
            onClick={handleSendComment}
            data-testid="AddCommentForm.Button"
          >
            {t("Submit")}
          </Button>
        </HStack>
      </Card>
    );
  },
);

export default AddCommentForm;
