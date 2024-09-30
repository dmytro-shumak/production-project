import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";
import { fetchNextArticlesPage } from "./fetchNextArticlesPage";

jest.mock("../fetchArticleList/fetchArticleList");

describe("fetchNextArticlesPage", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticleList).toHaveBeenCalledWith();
  });

  test("should fetchArticleList not call when hasMore is false", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticleList).not.toHaveBeenCalled();
  });

  test("should fetchArticleList not call when loading is true", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticleList).not.toHaveBeenCalled();
  });
});
