import { selectByTestId } from "cypress/helpers/selectByTestId";

describe("Routing", () => {
  describe("user authorized", () => {
    it("Go to the main page", () => {
      cy.visit("/");
      cy.get(selectByTestId("MainPage")).should("exist");
    });
    it("Go to the profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("MainPage")).should("exist");
    });
    it("Go to the non-existent page", () => {
      cy.visit("/sdkjfnskdjfn");
      cy.get(selectByTestId("NotFoundPage")).should("exist");
    });
  });
  describe("user not authorized", () => {
    beforeEach(() => {
      cy.login()
    })
    it("Go to the profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("ProfilePage")).should("exist");
    });

    it("Go to the article page", () => {
      cy.login('user', 'password')
      cy.visit("/articles");
      cy.get(selectByTestId("ArticlesPage")).should("exist");
    });
  });
});
