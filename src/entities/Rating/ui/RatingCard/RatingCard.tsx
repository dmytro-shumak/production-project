import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./RatingCard.module.css";
import {
  Button,
  ButtonTheme,
  Card,
  HStack,
  StarRating,
  Text,
  VStack,
} from "@/shared/ui";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";

interface Props {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starCount: number) => void;
  onAccept?: (starCount: number, feedback?: string) => void;
}

export const RatingCard = memo(
  ({
    className,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title,
  }: Props) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectStars = useCallback(() => {
      setIsModalOpen(true);
    }, []);

    return (
      <Card className={classNames("", {}, [className])}>
        <VStack align="center" gap={8}>
          <Text title={title} />
          <StarRating size={40} onSelect={handleSelectStars} />
        </VStack>
        <Modal isOpen={isModalOpen} contentClassName={styles.modalContent}>
          <VStack gap={32}>
            <Text title={feedbackTitle} />
            <Input placeholder={t("YourFeedback")} />
            <HStack gap={16} justify="end">
              <Button theme={ButtonTheme.OutlineRed}>{t("Close")}</Button>
              <Button>{t("Send")}</Button>
            </HStack>
          </VStack>
        </Modal>
      </Card>
    );
  },
);
