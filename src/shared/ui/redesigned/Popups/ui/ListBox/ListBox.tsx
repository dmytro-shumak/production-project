import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useMemo, type ReactNode } from "react";

import { HStack } from "../../../../redesigned/Stack";
import { Button } from "../../../Button";

import styles from "./ListBox.module.css";

import { classNames } from "@/shared/lib";
import { typedMemo } from "@/shared/types";

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface Props<T extends string> {
  readOnly?: boolean;
  items: ListBoxItem<T>[];
  value?: T;
  defaultValue?: string;
  className?: string;
  label?: string;
  onChange?: (value: T) => void;
}

const ListBox = <T extends string>({
  className,
  items,
  onChange,
  defaultValue,
  value,
  readOnly,
  label,
}: Props<T>) => {
  const selectedItems = useMemo(
    () => items.find((item) => item.value === value),
    [items, value],
  );

  return (
    <HStack gap={8} justify="start">
      {label && <span>{label}</span>}
      <Listbox
        as="div"
        value={value}
        disabled={readOnly}
        onChange={onChange}
        className={classNames(styles.listBox, {}, [className])}
      >
        <ListboxButton disabled={readOnly} as="div">
          <Button variant="filled" disabled={readOnly}>
            {selectedItems?.content ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={classNames(styles.options, {}, [
            "w-[var(--button-width)]",
          ])}
        >
          {items.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({ focus, selected, disabled }) => (
                <div
                  className={classNames(styles.item, {
                    [styles.active]: focus,
                    [styles.disabled]: disabled,
                    [styles.selected]: selected,
                  })}
                >
                  {selected && "✓"}
                  {item.content}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </HStack>
  );
};

export const MemoListBox = typedMemo(ListBox);
