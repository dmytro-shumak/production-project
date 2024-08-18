import axios from "axios";
import { setAuthData } from "entities/User";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, { shallow: false });

describe("loginByUsername", () => {
  test("success login", async () => {
    const userValue = { username: "123", id: "1" };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ password: "123", username: "1" });

    expect(thunk.dispatch).toHaveBeenCalledWith(setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ password: "123", username: "1" });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("failed to login");
  });
});
