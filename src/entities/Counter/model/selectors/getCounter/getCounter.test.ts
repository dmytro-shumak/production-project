import type { RootState } from "@/shared/config/redux/store";
import { defaultState } from "@/shared/lib";
import { getCounter } from "./getCounter";

describe("getCounter", () => {
  test("should return counter", () => {
    const state: RootState = {
      ...defaultState,
      counter: { value: 10 },
    };
    expect(getCounter(state)).toEqual({ value: 10 });
  });
});
