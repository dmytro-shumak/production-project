import { useState } from "react";
import { useTranslation } from "react-i18next";

import { getUserAuthData } from "@/entities/User";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { getFeaturesFlags, updateFeatureFlag } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";

export const UiDesignSwitcher = () => {
  const { t } = useTranslation();
  const isAppRedesigned = getFeaturesFlags("isAppRedesigned");
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { content: t("New"), value: "new" },
    { content: t("Old"), value: "old" },
  ];

  if (!authData) {
    return null;
  }

  const onChange = (value: string) => {
    setIsLoading(true);
    dispatch(
      updateFeatureFlag({
        newFeatures: { isAppRedesigned: value === "new" },
        userId: authData.id,
      }),
    )
      .unwrap()
      .then(() => setIsLoading(false));
  };

  return (
    <HStack justify="start">
      <Text text={t("interfaceVariant")} />
      {isLoading ? (
        <Skeleton width={100} height={32} borderRadius={20} />
      ) : (
        <ListBox
          value={isAppRedesigned ? "new" : "old"}
          items={items}
          onChange={onChange}
        />
      )}
    </HStack>
  );
};
