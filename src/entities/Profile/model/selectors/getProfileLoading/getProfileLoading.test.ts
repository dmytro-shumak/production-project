import type { ReducerSchema } from "shared/config/redux";
import type { DeepPartial } from "shared/lib";
import { getProfileLoading } from "./getProfileLoading";

describe("get profile loading", () => {
  test("should return profile loading", () => {
    const state: DeepPartial<ReducerSchema> = {
      profile: {
        isLoading: true,
      },
    };
    const profileLoading = getProfileLoading(state as ReducerSchema);
    expect(profileLoading).toEqual(true);
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const profileLoading = getProfileLoading(state as ReducerSchema);
    expect(profileLoading).toEqual(undefined);
  });
});
