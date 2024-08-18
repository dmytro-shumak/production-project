import type { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import type { ReducerSchema } from "shared/config/redux";

type ActionCreator<Returned, ThunkArg, RejectedValue> = (
  arg: ThunkArg,
) => AsyncThunkAction<Returned, ThunkArg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Returned, ThunkArg, RejectedValue> {
  dispatch: Dispatch;

  actionCreator: ActionCreator<Returned, ThunkArg, RejectedValue>;

  getState: () => ReducerSchema;

  constructor(actionCreator: ActionCreator<Returned, ThunkArg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }

  async callThunk(args: ThunkArg) {
    const action = this.actionCreator(args);
    const result = await action(this.dispatch, this.getState, undefined);

    return result;
  }
}
