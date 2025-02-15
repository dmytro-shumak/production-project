import type { FeaturesFlags } from "@/shared/types/featuresFlags";

let featureFlags: FeaturesFlags;

export const setFeaturesFlags = (flags: FeaturesFlags): void => {
  featureFlags = flags;
};

export const getFeaturesFlags = (flag: keyof FeaturesFlags) => {
  return featureFlags?.[flag];
};

export const getAllFeatureFlags = () => featureFlags;
