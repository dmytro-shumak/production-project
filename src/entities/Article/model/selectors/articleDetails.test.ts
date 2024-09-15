import type { ReducerSchema } from "shared/config/redux";
import type { DeepPartial } from "shared/lib";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "./articleDetails";

describe("articleDetails", () => {
  test("should return article details", () => {
    const data = {
      id: "1",
      title: "title",
    };
    const state: DeepPartial<ReducerSchema> = {
      articleDetails: {
        data,
      },
    };
    const articleData = getArticleDetailsData(state as ReducerSchema);
    expect(articleData).toEqual(data);
  });
  test("should return loading", () => {
    const state: DeepPartial<ReducerSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };
    const loading = getArticleDetailsIsLoading(state as ReducerSchema);
    expect(loading).toEqual(true);
  });
  test("should return error", () => {
    const state: DeepPartial<ReducerSchema> = {
      articleDetails: {
        error: "123",
      },
    };
    const error = getArticleDetailsError(state as ReducerSchema);
    expect(error).toEqual("123");
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const data = getArticleDetailsData(state as ReducerSchema);
    expect(data).toEqual(undefined);
  });
});
