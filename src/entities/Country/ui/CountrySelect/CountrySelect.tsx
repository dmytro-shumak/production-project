import { memo, useCallback, type FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui";
import { useTranslation } from "react-i18next";
import { Country } from "../../model/constants/country";

interface Props {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readOnly?: boolean;
}

export const CountrySelect: FC<Props> = memo(
  ({ className, onChange, value, readOnly }) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <Select
        className={classNames("", {}, [className])}
        onChange={onChangeHandler}
        value={value}
        label={t("ChooseCountry")}
        options={Object.keys(Country).map((country) => ({
          content: country,
          value: country,
        }))}
        readOnly={readOnly}
      />
    );
  },
);
