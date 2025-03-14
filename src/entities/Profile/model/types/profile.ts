import type { ValidateProfileError } from "../constants/profile";

import type { Country } from "@/entities/Country";
import type { Currency } from "@/entities/Currency";

export interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}
