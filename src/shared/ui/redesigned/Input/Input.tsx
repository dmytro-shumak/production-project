import {
  memo,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { HStack } from "../Stack";

import styles from "./Input.module.css";

import { classNames } from "@/shared/lib";

type InputSize = "small" | "medium" | "large";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "readOnly" | "size"> {
  className?: string;
  label?: string;
  readOnly?: boolean;
  inputPrefix?: ReactNode;
  size?: InputSize;
}

export const Input = memo(
  ({
    className,
    label,
    autoFocus,
    readOnly,
    inputPrefix,
    size = "medium",
    ...otherProps
  }: Props) => {
    const id = useId();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (autoFocus) {
        ref.current?.focus();
      }
    }, [autoFocus]);

    const input = (
      <div
        className={classNames(
          styles.container,
          { [styles.withInputPrefix]: !!inputPrefix },
          [className, styles[size]],
        )}
      >
        <span className={styles.inputPrefix}>{inputPrefix}</span>
        <input
          {...otherProps}
          className={classNames(styles.input, { [styles.readOnly]: readOnly })}
          ref={ref}
          id={id}
          readOnly={readOnly}
        />
      </div>
    );

    if (label) {
      return (
        <HStack gap={8}>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          {input}
        </HStack>
      );
    }

    return input;
  },
);
