import { screen } from "@testing-library/dom";

import { AppRouter } from "./AppRouter";

import { UserRole } from "@/entities/User";
import {
  getRouteAbout,
  getRouteAdminPanel,
  getRouteProfile,
} from "@/shared/const/router";
import { componentRender } from "@/shared/lib/tests";

describe("app/router/AppRouter", () => {
  test("should render about page", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId("AboutPage");

    expect(page).toBeInTheDocument();
  });

  test("should render not found page", async () => {
    componentRender(<AppRouter />, {
      route: "/dksjfngjdsfnkjg",
    });

    const page = await screen.findByTestId("NotFoundPage");

    expect(page).toBeInTheDocument();
  });

  test("should redirect unauthorized user to main page", async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile("1"),
    });

    const page = await screen.findByTestId("MainPage");

    expect(page).toBeInTheDocument();
  });

  test("should render authorized route when user is authorized", async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile("1"),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            id: "1",
            username: "user",
            password: "password",
            roles: [UserRole.ADMIN],
            avatar: "https://images.ctfassets2&q=7&fm=webp",
          },
        },
      },
    });

    const page = await screen.findByTestId("ProfilePage");

    expect(page).toBeInTheDocument();
  });

  test("should redirect to forbidden page when user doesn't have admin role", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            id: "1",
            username: "user",
            password: "password",
            roles: [UserRole.USER],
            avatar: "https://images.ctfassets2&q=7&fm=webp",
          },
        },
      },
    });

    const page = await screen.findByTestId("ForbiddenPage");

    expect(page).toBeInTheDocument();
  });

  test("should render admin page when user have admin role", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            id: "1",
            username: "user",
            password: "password",
            roles: [UserRole.ADMIN],
            avatar: "https://images.ctfassets2&q=7&fm=webp",
          },
        },
      },
    });

    const page = await screen.findByTestId("AdminPage");

    expect(page).toBeInTheDocument();
  });
});
