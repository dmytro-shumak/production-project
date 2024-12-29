import { getProfileError } from "./getProfileError";

import type { ReducerSchema } from "@/shared/config/redux";
import type { DeepPartial } from "@/shared/lib";

describe("get profile error", () => {
  test("should return profile error", () => {
    const state: DeepPartial<ReducerSchema> = {
      profile: {
        error: "123",
      },
    };
    const profileError = getProfileError(state as ReducerSchema);
    expect(profileError).toEqual("123");
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const profileError = getProfileError(state as ReducerSchema);
    expect(profileError).toEqual(undefined);
  });
});
