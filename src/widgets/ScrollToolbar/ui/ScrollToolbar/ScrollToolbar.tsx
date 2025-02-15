import { memo } from "react";

import styles from "./ScrollToolbar.module.css";

import { ScrollToTopButton } from "@/features/scrollToTopButton";
import { classNames } from "@/shared/lib";
import { VStack } from "@/shared/ui";

interface Props {
  className?: string;
}

export const ScrollToolbar = memo(({ className }: Props) => {
  return (
    <VStack
      justify="center"
      align="center"
      className={classNames(styles.scrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
