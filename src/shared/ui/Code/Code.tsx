import { memo } from "react";
import CopyIcon from "shared/assets/icons/copy.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui";
import styles from "./Code.module.css";

interface Props {
  className?: string;
  code: string;
}

export const Code = memo(({ className, code }: Props) => {
  return (
    <pre className={classNames(styles.code, {}, [className])}>
      <Button className={styles.copyBtn} theme={ButtonTheme.Clear}>
        <CopyIcon className={styles.copyIcon} />
      </Button>
      <code>{code}</code>
    </pre>
  );
});
