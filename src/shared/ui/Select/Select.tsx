import { useCallback, type ChangeEvent } from "react";

import styles from "./Select.module.css";

import { classNames } from "@/shared/lib";
import { typedMemo } from "@/shared/types";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface Props<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  readOnly?: boolean;
  onChange?: (value: T) => void;
}

const Select = <T extends string>({
  className,
  label,
  options,
  onChange,
  value,
  readOnly,
}: Props<T>) => {
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value as T);
    },
    [onChange],
  );

  return (
    <div className={classNames(styles.selectWrapper, {}, [className])}>
      {label && <span className={styles.label}>{label}</span>}
      <select
        disabled={readOnly}
        className={styles.select}
        onChange={onChangeHandler}
        value={value}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.content}
          </option>
        ))}
      </select>
    </div>
  );
};

export const MemoSelect = typedMemo(Select);
