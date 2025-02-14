import { memo, useCallback, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import styles from "./AddCommentForm.module.css";

import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button as ButtonDeprecated, ButtonTheme, HStack } from "@/shared/ui";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";
import { Input } from "@/shared/ui/redesigned/Input";

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
      <ToggleFeatures
        featureName="isAppRedesigned"
        on={
          <Card padding="24" borderRadius={32}>
            <HStack
              gap={16}
              justify="between"
              align="center"
              className={classNames(styles.addCommentFormRedesigned, {}, [
                className,
              ])}
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
        }
        off={
          <HStack
            justify="between"
            align="center"
            className={classNames(styles.addCommentForm, {}, [className])}
            data-testid="AddCommentForm"
          >
            <InputDeprecated
              placeholder={t("EnterTextComment")}
              value={text}
              onChange={onCommentTextChange}
              className={styles.input}
              data-testid="AddCommentForm.Input"
            />
            <ButtonDeprecated
              theme={ButtonTheme.Primary}
              onClick={handleSendComment}
              data-testid="AddCommentForm.Button"
            >
              {t("Submit")}
            </ButtonDeprecated>
          </HStack>
        }
      />
    );
  },
);

export default AddCommentForm;
