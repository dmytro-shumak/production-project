import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import { profileReducer } from "../../model/slice/profileSlice";
import type { Profile } from "../../model/types/profile";
import { ProfileCard } from "./ProfileCard";

const profile: Profile = {
  id: "1",
  firstName: "admin",
  lastName: "admin",
  age: 465,
  currency: Currency.USD,
  country: Country.France,
  city: "Moscow",
  username: "admin213",
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: "1", username: "admin" },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserver;
});

describe("features/ProfileCard", () => {
  test("inputs should work", async () => {
    componentRender(<ProfileCard />, options);
    await userEvent.clear(screen.getByTestId("ProfileCard.firstName"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastName"));

    await userEvent.type(screen.getByTestId("ProfileCard.firstName"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastName"), "surname");

    expect(screen.getByTestId("ProfileCard.firstName")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastName")).toHaveValue("surname");
  });

  test("clearing should work", async () => {
    componentRender(<ProfileCard />, options);
    await userEvent.clear(screen.getByTestId("ProfileCard.firstName"));

    expect(screen.getByTestId("ProfileCard.lastName")).toHaveValue("");
  });
});
