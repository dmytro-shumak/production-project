import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "shared/config/redux";

export const getScrollRestorationScroll = (state: RootState) =>
  state.scrollRestoration.scroll;

export const getScrollRestorationByPath = createSelector(
  getScrollRestorationScroll,
  (_, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
