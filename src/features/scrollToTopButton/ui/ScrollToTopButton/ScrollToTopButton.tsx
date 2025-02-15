import { memo } from "react";

import ArrowCircleUp from "@/shared/assets/icons/arrow-circle-up.svg?react";
import { classNames } from "@/shared/lib";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface Props {
  className?: string;
}

export const ScrollToTopButton = memo(({ className }: Props) => {
  const handleOnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Icon
      Svg={ArrowCircleUp}
      clickable
      onClick={handleOnClick}
      width={32}
      height={32}
      className={classNames("", {}, [className])}
    />
  );
});
