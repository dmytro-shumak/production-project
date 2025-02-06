/* eslint-disable react/jsx-props-no-spreading */
import {
  memo,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
} from "react";

import styles from "./Input.module.css";

import { classNames } from "@/shared/lib";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "readOnly"> {
  className?: string;
  label?: string;
  readOnly?: boolean;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const Input = memo(
  ({ className, label, autoFocus, readOnly, ...otherProps }: Props) => {
    const id = useId();
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (autoFocus) {
        ref.current?.focus();
      }
    }, [autoFocus]);

    return (
      <div className={classNames(styles.container, {}, [className])}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
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
