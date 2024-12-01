import type { ReducerSchema } from "@/shared/config/redux";
import type { DeepPartial } from "@/shared/lib";
import { getLoginState } from "./getLoginState";

describe("get login state", () => {
  test("should return login state", () => {
    const state: DeepPartial<ReducerSchema> = {
      loginForm: {
        isLoading: false,
        password: "password",
        username: "username",
      },
    };
    const loginState = getLoginState(state as ReducerSchema);
    expect(loginState?.isLoading).toEqual(false);
    expect(loginState?.error).toEqual(undefined);
    expect(loginState?.password).toEqual("password");
    expect(loginState?.username).toEqual("username");
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const loginState = getLoginState(state as ReducerSchema);
    expect(loginState).toEqual(undefined);
  });
});
