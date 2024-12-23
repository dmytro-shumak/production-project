import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import {
  counterDecrement,
  counterIncrement,
} from "../model/slice/counterSlice";

export const Counter: FC = () => {
  const value = useAppSelector(getCounterValue);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const increment = () => {
    dispatch(counterIncrement());
  };

  const decrement = () => {
    dispatch(counterDecrement());
  };

  return (
    <div>
      <h1 data-testid="value-title">
        {t("Value")} {value}{" "}
      </h1>
      <Button onClick={increment} data-testid="increment-button">
        {t("Increment")}
      </Button>
      <Button onClick={decrement} data-testid="decrement-button">
        {t("Decrement")}
      </Button>
    </div>
  );
};
