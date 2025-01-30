import type { UserRole } from "../constants/user";

import type { JsonSettings } from "./jsonSettings";

import type { FeaturesFlags } from "@/shared/types/featuresFlags";

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
  features?: FeaturesFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;
  _initiated?: boolean;
}
