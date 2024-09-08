import type { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import axios, { type AxiosStatic } from "axios";
import type { ReducerSchema } from "shared/config/redux";
import type { DeepPartial } from "shared/lib/types";

type ActionCreator<Returned, ThunkArg, RejectedValue> = (
  arg: ThunkArg,
) => AsyncThunkAction<Returned, ThunkArg, { rejectValue: RejectedValue }>;

jest.mock("axios");

const mockedAxios = jest.mocked(axios, { shallow: false });

export class TestAsyncThunk<Returned, ThunkArg, RejectedValue> {
  dispatch: Dispatch;

  actionCreator: ActionCreator<Returned, ThunkArg, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  navigate: jest.MockedFn<() => void>;

  getState: () => ReducerSchema;

  constructor(
    actionCreator: ActionCreator<Returned, ThunkArg, RejectedValue>,
    state?: DeepPartial<ReducerSchema>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as ReducerSchema);
    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(args: ThunkArg) {
    const action = this.actionCreator(args);
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });

    return result;
  }
}
