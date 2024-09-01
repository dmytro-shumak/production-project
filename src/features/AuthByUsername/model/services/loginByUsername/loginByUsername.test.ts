import { setAuthData } from "entities/User";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";

describe("loginByUsername", () => {
  test("success login", async () => {
    const userValue = { username: "123", id: "1" };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({ password: "123", username: "1" });

    expect(thunk.dispatch).toHaveBeenCalledWith(setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ password: "123", username: "1" });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("failed to login");
  });
});
