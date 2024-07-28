import {
  counterDecrement,
  counterIncrement,
  counterReducer,
  type CounterState,
} from "entities/Counter/model/slice/counterSlice";

describe("counterSlice", () => {
  test("increment", () => {
    const state: CounterState = { value: 10 };
    expect(counterReducer(state, counterIncrement())).toEqual({ value: 11 });
  });
  test("decrement", () => {
    const state: CounterState = { value: 10 };
    expect(counterReducer(state, counterDecrement())).toEqual({ value: 9 });
  });
  test("should work with empty state ", () => {
    expect(counterReducer(undefined, counterDecrement())).toEqual({
      value: -1,
    });
  });
});
