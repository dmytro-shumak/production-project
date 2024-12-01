import { memo, useCallback } from "react";
import CopyIcon from "@/shared/assets/icons/copy.svg";
import { classNames } from "@/shared/lib";
import { Button, ButtonTheme } from "../Button/Button";
import styles from "./Code.module.css";

interface Props {
  className?: string;
  code: string;
}

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
