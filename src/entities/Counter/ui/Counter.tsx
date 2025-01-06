import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useCounterActions } from "../model/slice/counterSlice";

import { Button } from "@/shared/ui";

export const Counter: FC = () => {
  const value = useCounterValue();

  const { add, decrement, increment } = useCounterActions();

  const { t } = useTranslation();
  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  const handleAdd = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid="value-title">
        {t("Value")} {value}{" "}
      </h1>
      <Button onClick={handleIncrement} data-testid="increment-button">
        {t("Increment")}
      </Button>
      <Button onClick={handleDecrement} data-testid="decrement-button">
        {t("Decrement")}
      </Button>
      <Button onClick={handleAdd} data-testid="add-button">
        {t("Add")} 5
      </Button>
    </div>
  );
};
