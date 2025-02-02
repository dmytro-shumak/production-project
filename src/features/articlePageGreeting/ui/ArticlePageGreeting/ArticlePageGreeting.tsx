import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib";
import { Text } from "@/shared/ui";
import { Modal } from "@/shared/ui/Modal";

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageHasBeenVisited } = useJsonSettings();

  useEffect(() => {
    if (!isArticlePageHasBeenVisited) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageHasBeenVisited: true }));
    }
  }, [dispatch, isArticlePageHasBeenVisited]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text title={t("ArticleWelcomeTitle")} text={t("ArticleWelcomeText")} />
    </Modal>
  );
});
