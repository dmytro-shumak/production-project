import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui";
import { Country } from "../../model/constants/country";

interface Props {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readOnly?: boolean;
}

const options = Object.keys(Country).map((country) => ({
  content: country,
  value: country,
}));

export const CountrySelect: FC<Props> = memo(
  ({ className, onChange, value, readOnly }) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <ListBox
        className={className}
        onChange={onChangeHandler}
        value={value}
        defaultValue={t("ChooseCurrency")}
        items={options}
        label={t("ChooseCountry")}
        readOnly={readOnly}
      />
    );
  },
);
