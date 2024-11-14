import type { UnknownAction } from "@reduxjs/toolkit";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import type { DeepPartial } from "shared/lib";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { type ProfileSchema } from "../types/profile";
import { profileActions, profileReducer } from "./profileSlice";
import { ValidateProfileError } from "../constants/profile";

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

describe("profileSlice", () => {
  test("should set readonly", () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadOnly(true)),
    ).toEqual({
      readonly: true,
    });
  });

  test("should cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: "" } };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({
      readonly: true,
      validateErrors: [],
      data,
      form: data,
    });
  });

  test("should update profile", () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: "" } };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: "123456" }),
      ),
    ).toEqual({
      form: { username: "123456" },
    });
  });

  test("should update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending as unknown as UnknownAction,
      ),
    ).toEqual({
      isLoading: true,
      validateErrors: [],
    });
  });

  test("should update profile service fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, "") as unknown as UnknownAction,
      ),
    ).toEqual({
      isLoading: false,
      validateErrors: [],
      form: data,
      data,
    });
  });
});
