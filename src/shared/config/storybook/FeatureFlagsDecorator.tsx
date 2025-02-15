import type { StoryFn } from "@storybook/react";

import { setFeaturesFlags } from "@/shared/lib/features";
import type { FeaturesFlags } from "@/shared/types/featuresFlags";

export const FeatureFlagsDecorator =
  (features: FeaturesFlags) => (StoryComponent: StoryFn) => {
    setFeaturesFlags(features);

    return <StoryComponent />;
  };
