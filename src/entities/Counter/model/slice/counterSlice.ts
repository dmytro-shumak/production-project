import { type PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib/store";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = buildSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    add: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment: counterIncrement, decrement: counterDecrement } =
  counterSlice.actions;

export const { useActions: useCounterActions, reducer: counterReducer } =
  counterSlice;
