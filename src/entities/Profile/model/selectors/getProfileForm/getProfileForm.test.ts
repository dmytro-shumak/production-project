import { getProfileForm } from "./getProfileForm";

import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import type { ReducerSchema } from "@/shared/config/redux";
import type { DeepPartial } from "@/shared/lib";

describe("get profile form", () => {
  test("should return profile form", () => {
    const data = {
      age: 18,
      country: Country.Germany,
      firstName: "John",
      lastName: "Doe",
      avatar:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
      username: "john_doe",
      city: "Berlin",
      currency: Currency.AWG,
    };
    const state: DeepPartial<ReducerSchema> = {
      profile: {
        form: data,
      },
    };
    const profileForm = getProfileForm(state as ReducerSchema);
    expect(profileForm).toEqual(data);
  });
  test("should return empty state", () => {
    const state: DeepPartial<ReducerSchema> = {};
    const profileForm = getProfileForm(state as ReducerSchema);
    expect(profileForm).toEqual(undefined);
  });
});
