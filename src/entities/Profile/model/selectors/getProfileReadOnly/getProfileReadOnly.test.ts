import { getProfileReadOnly } from "./getProfileReadOnly";

import type { ReducerSchema } from "@/shared/config/redux";
import type { DeepPartial } from "@/shared/lib";

describe("get profile data", () => {
  test("should return profile data", () => {
    const state: DeepPartial<ReducerSchema> = {
      profile: {
        readonly: false,
      },
    };
    const profileReadOnly = getProfileReadOnly(state as ReducerSchema);
    expect(profileReadOnly).toEqual(false);
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const profileReadOnly = getProfileReadOnly(state as ReducerSchema);
    expect(profileReadOnly).toEqual(undefined);
  });
});
