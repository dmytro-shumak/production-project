import { type ReactNode, memo } from "react";

import { getFeaturesFlags } from "../../lib/setGetFeatures";

import type { FeaturesFlags } from "@/shared/types/featuresFlags";

interface Props {
  featureName: keyof FeaturesFlags;
  on: ReactNode;
  off: ReactNode;
}

export const ToggleFeatures = memo(({ featureName, off, on }: Props) => {
  if (getFeaturesFlags(featureName)) {
    return on;
  }

  return off;
});
