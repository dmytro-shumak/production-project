import { getCounterValue } from "entities/Counter/model/selectors/getCounterValue/getCounterValue";
import type { RootState } from "shared/config/redux/store";

describe("getCounterValue", () => {
  test("should return counter value", () => {
    const state: RootState = {
      counter: { value: 10 },
    };
    expect(getCounterValue(state)).toEqual(10);
  });
});
