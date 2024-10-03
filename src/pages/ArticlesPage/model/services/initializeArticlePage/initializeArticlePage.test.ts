import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { articlePageActions } from "pages/ArticlesPage/model/slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";
import { initializeArticlePage } from "./initializeArticlePage";

jest.mock("../fetchArticleList/fetchArticleList");
jest.spyOn(articlePageActions, "initState");

const searchParams = new URLSearchParams();

describe("initializeArticlePage.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(initializeArticlePage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    await thunk.callThunk(searchParams);

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticleList).toHaveBeenCalledWith();
    expect(articlePageActions.initState).toHaveBeenCalled();
  });

  test("should fetchArticleList not call when _initialized is true", async () => {
    const thunk = new TestAsyncThunk(initializeArticlePage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        _initialized: true,
      },
    });

    await thunk.callThunk(searchParams);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticleList).not.toHaveBeenCalled();
    expect(articlePageActions.initState).not.toHaveBeenCalled();
  });
});
