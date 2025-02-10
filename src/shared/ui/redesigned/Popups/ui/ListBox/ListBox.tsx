import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { type ReactNode } from "react";

import { HStack } from "../../../../redesigned/Stack";
import { Button } from "../../../Button";
import popupStyles from "../../styles/popup.module.css";

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
  return (
    <HStack gap={8} justify="start">
      {label && <span>{label}</span>}
      <Listbox
        as="div"
        value={value}
        disabled={readOnly}
        onChange={onChange}
        className={classNames(styles.listBox, {}, [
          className,
          popupStyles.menu,
        ])}
      >
        <ListboxButton disabled={readOnly} as="div">
          <Button disabled={readOnly}>{value ?? defaultValue}</Button>
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
