import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ScrollRestorationSchema } from "../types/scrollRestorationSchema";

const initialState: ScrollRestorationSchema = {
  scroll: {},
};

export const scrollRestorationSlice = createSlice({
  name: "scrollRestoration",
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: PayloadAction<{ position: number; path: string }>,
    ) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

export const {
  actions: scrollRestorationActions,
  reducer: scrollRestorationReducer,
} = scrollRestorationSlice;
