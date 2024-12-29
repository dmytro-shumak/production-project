import { useContext } from "react";

import {
  AnimationContext,
  type AnimationContextPayload,
} from "./AnimationProvider";

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};
