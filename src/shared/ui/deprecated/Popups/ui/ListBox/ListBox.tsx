import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { memo, type ReactNode } from "react";

import { HStack } from "../../../../redesigned/Stack";
import { Button } from "../../../Button";

import styles from "./ListBox.module.css";

import { classNames } from "@/shared/lib";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface Props {
  readOnly?: boolean;
  items: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  onChange?: <T extends string>(value: T) => void;
}

/**
 * deprecated, use components from redesign folder
 * @deprecated
 */
export const ListBox = memo(
  ({
    className,
    items,
    onChange,
    defaultValue,
    value,
    readOnly,
    label,
  }: Props) => {
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
  },
);
