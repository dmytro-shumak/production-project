import { memo, useCallback, type ChangeEvent, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  content: string;
}

interface Props {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export const Select: FC<Props> = memo(
  ({ className, label, options, onChange, value }) => {
    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
      },
      [onChange],
    );

    return (
      <div className={classNames(styles.selectWrapper, {}, [className])}>
        {label && <span className={styles.label}>{label}</span>}
        <select
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
  },
);
