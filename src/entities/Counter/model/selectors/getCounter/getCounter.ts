import type { RootState } from "@/shared/config/redux/store";

export const getCounter = (state: RootState) => state.counter;
