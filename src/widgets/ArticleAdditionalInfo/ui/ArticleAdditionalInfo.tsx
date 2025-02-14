import { memo } from "react";
import { useTranslation } from "react-i18next";

import type { User } from "@/entities/User";
import { HStack, VStack } from "@/shared/ui";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Button } from "@/shared/ui/redesigned/Button";
import { Text } from "@/shared/ui/redesigned/Text";

interface Props {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit?: () => void;
}

export const ArticleAdditionalInfo = memo(
  ({ className, author, createdAt, views, onEdit }: Props) => {
    const { t } = useTranslation("article-details");

    return (
      <VStack gap={32} align="start" className={className}>
        <HStack gap={8}>
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        <Button onClick={onEdit}>{t("Edit")}</Button>
        <Text text={t("ViewsCount", { count: views })} />
      </VStack>
    );
  },
);
