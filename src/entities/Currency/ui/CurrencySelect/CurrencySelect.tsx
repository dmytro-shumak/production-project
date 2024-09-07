import { memo, useCallback, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/constants/currency";

interface Props {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readOnly?: boolean;
}

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
      <Select
        className={classNames("", {}, [className])}
        onChange={onChangeHandler}
        value={value}
        label={t("ChooseCurrency")}
        options={Object.keys(Currency).map((currency) => ({
          content: currency,
          value: currency,
        }))}
        readOnly={readOnly}
      />
    );
  },
);
