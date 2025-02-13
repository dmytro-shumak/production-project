import { memo } from "react";
import { useTranslation } from "react-i18next";

import { UiDesignSwitcher } from "@/features/uiDesignSwitcher";
import { VStack } from "@/shared/ui";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";

const SettingsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page>
      <VStack gap={16}>
        <Text text={t("UserSettings")} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
