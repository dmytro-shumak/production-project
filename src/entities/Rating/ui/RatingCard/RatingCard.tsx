import { memo, useCallback, useState, type ChangeEvent } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";

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
import { Input } from "@/shared/ui/deprecated/Input";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { Modal } from "@/shared/ui/redesigned/Modal";

interface Props {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  rate?: number;
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
    rate = 0,
    title,
  }: Props) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
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
          data-testid="RatingCard.Input"
        />
      </>
    );

    return (
      <Card className={className} data-testid="RatingCard">
        <VStack align="center" gap={8}>
          <Text title={starsCount ? t("ThanksForFeedback") : title} />
          <StarRating
            size={40}
            onSelect={handleSelectStars}
            selectedStars={starsCount}
          />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} contentClassName={styles.modalContent}>
            <VStack gap={32}>
              {modalContent}
              <HStack gap={16} justify="end">
                <Button
                  onClick={cancelHandle}
                  theme={ButtonTheme.OutlineRed}
                  data-testid="RatingCard.Close"
                >
                  {t("Close")}
                </Button>
                <Button onClick={acceptHandle} data-testid="RatingCard.Send">
                  {t("Send")}
                </Button>
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
