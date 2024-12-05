import { Fragment, memo, useCallback, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
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
import { Drawer } from "@/shared/ui/Drawer";

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
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      },
      [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setFeedback(e.target.value);
      },
      [],
    );

    const modalContent = (
      <>
        <Text title={feedbackTitle} />
        <Input
          value={feedback}
          onChange={handleInputChange}
          placeholder={t("YourFeedback")}
        />
      </>
    );

    return (
      <Card className={classNames("", {}, [className])}>
        <VStack align="center" gap={8}>
          <Text title={title} />
          <StarRating size={40} onSelect={handleSelectStars} />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} contentClassName={styles.modalContent}>
            <VStack gap={32}>
              {modalContent}
              <HStack gap={16} justify="end">
                <Button onClick={cancelHandle} theme={ButtonTheme.OutlineRed}>
                  {t("Close")}
                </Button>
                <Button onClick={acceptHandle}>{t("Send")}</Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
            <VStack gap={32}>
              {modalContent}
              <Button onClick={acceptHandle}>{t("Send")}</Button>
            </VStack>
          </Drawer>
        </MobileView>
      </Card>
    );
  },
);
