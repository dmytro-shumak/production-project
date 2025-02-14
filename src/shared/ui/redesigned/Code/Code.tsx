import { memo, useCallback } from "react";

import { Button, ButtonTheme } from "../../deprecated/Button/Button";
import { Icon } from "../Icon";

import styles from "./Code.module.css";

import CopyIcon from "@/shared/assets/icons/copy-new.svg?react";
import CopyIconDeprecated from "@/shared/assets/icons/copy.svg?react";
import { classNames } from "@/shared/lib";
import { ToggleFeatures } from "@/shared/lib/features";

interface Props {
  className?: string;
  code: string;
}

export const Code = memo(({ className, code }: Props) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <ToggleFeatures
      featureName="isAppRedesigned"
      on={
        <pre className={classNames(styles.codeRedesigned, {}, [className])}>
          {/* <Button
            className={styles.copyBtn}
            theme={ButtonTheme.Clear}
            onClick={onCopy}
          > */}
          <Icon
            clickable
            onClick={onCopy}
            Svg={CopyIcon}
            className={styles.copyBtn}
          />
          {/* <CopyIcon className={styles.copyIcon} /> */}
          {/* </Button> */}
          <code>{code}</code>
        </pre>
      }
      off={
        <pre className={classNames(styles.code, {}, [className])}>
          <Button
            className={styles.copyBtn}
            theme={ButtonTheme.Clear}
            onClick={onCopy}
          >
            <CopyIconDeprecated className={styles.copyIcon} />
          </Button>
          <code>{code}</code>
        </pre>
      }
    />
  );
});
