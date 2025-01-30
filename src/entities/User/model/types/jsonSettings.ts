import type { Theme } from "@/shared/const";

export interface JsonSettings {
  theme?: Theme;
  isFirstVisit?: boolean;
  settingsPageHasBeenVisited?: boolean;
}
