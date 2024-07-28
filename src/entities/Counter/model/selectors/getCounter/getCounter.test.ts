import { getCounter } from "entities/Counter/model/selectors/getCounter/getCounter";
import type { RootState } from "shared/config/redux/store";

describe("getCounter", () => {
  test("should return counter", () => {
    const state: RootState = {
      counter: { value: 10 },
    };
    expect(getCounter(state)).toEqual({ value: 10 });
  });
});
