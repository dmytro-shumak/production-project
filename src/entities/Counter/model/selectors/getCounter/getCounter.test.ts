import { getCounter } from "entities/Counter/model/selectors/getCounter/getCounter";
import type { RootState } from "shared/config/redux/store";
import { defaultState } from "shared/lib";

describe("getCounter", () => {
  test("should return counter", () => {
    const state: RootState = {
      ...defaultState,
      counter: { value: 10 },
    };
    expect(getCounter(state)).toEqual({ value: 10 });
  });
});
