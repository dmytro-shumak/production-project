describe("Routing", () => {
  it("Go to the main page", () => {
    cy.visit("/");
    cy.get("[data-testid=MainPage").should("exist");
  });
});
