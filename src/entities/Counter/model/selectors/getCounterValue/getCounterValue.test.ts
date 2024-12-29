import { getCounterValue } from "./getCounterValue";

import type { RootState } from "@/shared/config/redux/store";
import { defaultState } from "@/shared/lib";

describe("getCounterValue", () => {
  test("should return counter value", () => {
    const state: RootState = {
      ...defaultState,
      counter: { value: 10 },
    };
    expect(getCounterValue(state)).toEqual(10);
  });
});
