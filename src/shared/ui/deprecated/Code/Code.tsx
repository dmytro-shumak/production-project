import { memo, useCallback } from "react";

import { Button, ButtonTheme } from "../Button/Button";

import styles from "./Code.module.css";

import CopyIcon from "@/shared/assets/icons/copy.svg?react";
import { classNames } from "@/shared/lib";

interface Props {
  className?: string;
  code: string;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const Code = memo(({ className, code }: Props) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <pre className={classNames(styles.code, {}, [className])}>
      <Button
        className={styles.copyBtn}
        theme={ButtonTheme.Clear}
        onClick={onCopy}
      >
        <CopyIcon className={styles.copyIcon} />
      </Button>
      <code>{code}</code>
    </pre>
  );
});
