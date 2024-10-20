import type { ReducerSchema } from "shared/config/redux";
import type { DeepPartial } from "shared/lib";
import { ValidateProfileError } from "../../types/profile";
import { getProfileValidateErrors } from "./getProfileValidateErrors";

describe("get profile validate  errors", () => {
  test("should return profile validate  errors", () => {
    const state: DeepPartial<ReducerSchema> = {
      profile: {
        validateErrors: [ValidateProfileError.INCORRECT_AGE],
      },
    };
    const profileValidateError = getProfileValidateErrors(
      state as ReducerSchema,
    );
    expect(profileValidateError).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const profileValidateError = getProfileValidateErrors(
      state as ReducerSchema,
    );
    expect(profileValidateError).toEqual(undefined);
  });
});
