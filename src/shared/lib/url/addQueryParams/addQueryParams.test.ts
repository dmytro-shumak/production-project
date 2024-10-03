import { getQueryParams } from "./addQueryParams";

describe("addQueryParams", () => {
  test("test with one params", () => {
    const params = getQueryParams({ test: "value" });

    expect(params).toBe("?test=value");
  });

  test("test with multiply params", () => {
    const params = getQueryParams({ test: "value", search: "123" });

    expect(params).toBe("?test=value&search=123");
  });

  test("test with undefined", () => {
    const params = getQueryParams({ test: "value", search: undefined });

    expect(params).toBe("?test=value");
  });
});
