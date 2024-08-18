import type { DeepPartial } from "shared/lib";
import type { LoginSchema } from "../types";
import { loginReducer, setPassword, setUsername } from "./loginSlice";

describe("loginSlice", () => {
  test("should set username", () => {
    const state: DeepPartial<LoginSchema> = { username: "username" };
    expect(loginReducer(state as LoginSchema, setUsername("123123"))).toEqual({
      username: "123123",
    });
  });
  test("should set password", () => {
    const state: DeepPartial<LoginSchema> = { password: "password" };
    expect(
      loginReducer(state as LoginSchema, setPassword("password123")),
    ).toEqual({
      password: "password123",
    });
  });
});
