import {
  memo,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import styles from "./Input.module.css";

import { classNames } from "@/shared/lib";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "readOnly"> {
  className?: string;
  label?: string;
  readOnly?: boolean;
  inputPrefix?: ReactNode;
}

export const Input = memo(
  ({
    className,
    label,
    autoFocus,
    readOnly,
    inputPrefix,
    ...otherProps
  }: Props) => {
    const id = useId();
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (autoFocus) {
        ref.current?.focus();
      }
    }, [autoFocus]);

    return (
      <div
        className={classNames(
          styles.container,
          { [styles.withInputPrefix]: !!inputPrefix },
          [className],
        )}
      >
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.inputPrefix}>{inputPrefix}</div>
        <input
          {...otherProps}
          className={classNames(styles.input, { [styles.readOnly]: readOnly })}
          ref={ref}
          id={id}
          readOnly={readOnly}
        />
      </div>
    );
  },
);
