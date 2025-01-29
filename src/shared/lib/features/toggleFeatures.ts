import { getFeaturesFlags } from "./setGetFeatures";

import type { FeaturesFlags } from "@/shared/types/featuresFlags";

interface ToggleFeaturesOptions<T> {
  name: keyof FeaturesFlags;
  on: () => T;
  off: () => T;
}

export const toggleFeatures = <T>({
  name,
  off,
  on,
}: ToggleFeaturesOptions<T>): T => {
  if (getFeaturesFlags(name)) {
    return on();
  }

  return off();
};
