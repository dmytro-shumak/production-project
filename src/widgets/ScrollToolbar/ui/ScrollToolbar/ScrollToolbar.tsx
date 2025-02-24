import { memo, useEffect, useState } from "react";

import styles from "./ScrollToolbar.module.css";

import { ScrollToTopButton } from "@/features/scrollToTopButton";
import { classNames } from "@/shared/lib";
import { VStack } from "@/shared/ui/redesigned/Stack";

interface Props {
  className?: string;
}

const SCROLL_THRESHOLD = 200;

export const ScrollToolbar = memo(({ className }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <VStack
      justify="center"
      align="center"
      className={classNames(
        styles.scrollToolbar,
        { [styles.visible]: visible },
        [className],
      )}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
