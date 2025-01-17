export const setRating = (starCount = 5, feedback = 'feedback') => {
  cy.getByTestId(`StarRating.${starCount}`).click()
  cy.getByTestId('RatingCard.Input').type(feedback);
  cy.getByTestId('RatingCard.Send').click()
};


declare global {
  namespace Cypress {
    interface Chainable {
      setRating(starCount?: number, feedback?: string): Chainable<void>;
    }
  }
}
