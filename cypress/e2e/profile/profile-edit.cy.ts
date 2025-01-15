import { selectByTestId } from "../../helpers/selectByTestId";

describe('Profile page', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      cy.visit(`/profile/${data.id}`)
    })
  })
  it('Success loading profile', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'testuser')
  })
  it('Edit profile', () => {
  })
})