import type { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "shared/ui";
import { useAppSelector } from "shared/lib";
import { getCounterValue } from "entities/Counter/model/selectors/getCounterValue/getCounterValue";
import {
  counterDecrement,
  counterIncrement,
} from "../model/slice/counterSlice";

export const Counter: FC = () => {
  const value = useAppSelector(getCounterValue);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(counterIncrement());
  };

  const decrement = () => {
    dispatch(counterDecrement());
  };
  return (
    <div>
      <h1>Value {value} </h1>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </div>
  );
};
