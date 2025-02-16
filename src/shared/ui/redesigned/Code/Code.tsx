import { memo, useCallback } from "react";

import { Icon } from "../Icon";

import styles from "./Code.module.css";

import CopyIcon from "@/shared/assets/icons/copy-new.svg?react";
import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  code: string;
}

export const Code = memo(({ className, code }: Props) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <pre className={classNames(styles.codeRedesigned, {}, [className])}>
      <Icon
        clickable
        onClick={onCopy}
        Svg={CopyIcon}
        className={styles.copyBtn}
      />
      <code>{code}</code>
    </pre>
  );
});
