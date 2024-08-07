/* eslint-disable react/jsx-props-no-spreading */
import {
  memo,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

export const Input = memo(
  ({ className, label, autoFocus, ...otherProps }: Props) => {
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
        <input {...otherProps} className={styles.input} ref={ref} id={id} />
      </div>
    );
  },
);
