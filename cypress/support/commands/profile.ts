export const updateProfile = (firstName = 'first name', lastName = 'last name') => {
  cy.getByTestId("ProfilePageHeader.EditButton").click();
  cy.getByTestId("ProfileCard.firstName").clear().type("new");
  cy.getByTestId("ProfileCard.lastName").clear().type("last name");
  cy.getByTestId("ProfilePageHeader.SaveButton").click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: "PUT",
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      authorization: "sdfsdf",
    },
    body: {
      id: "3",
      firstName: "testuser",
      lastName: "Lesn",
      age: 28,
      currency: "UAH",
      country: "Ukraine",
      city: "Los Angeles",
      username: "testuser",
      avatar: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName?: string, lastName?: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
