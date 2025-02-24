import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";

import { Currency } from "../../model/constants/currency";

import { ListBox } from "@/shared/ui/redesigned/Popups";

interface Props {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readOnly?: boolean;
}

const options = Object.keys(Currency).map((currency) => ({
  content: currency,
  value: currency,
}));

export const CurrencySelect: FC<Props> = memo(
  ({ className, onChange, value, readOnly }) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    return (
      <ListBox
        className={className}
        onChange={onChangeHandler}
        value={value}
        defaultValue={t("ChooseCurrency")}
        label={t("Currency")}
        items={options}
        readOnly={readOnly}
      />
    );
  },
);
