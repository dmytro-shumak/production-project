let profileId: string;

describe('Profile page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`/profile/${data.id}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('Success loading profile', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'testuser')
  })
  it('Edit profile', () => {
    const newName = 'new';
    const lastName = 'last name'
    cy.updateProfile(newName, lastName);
    cy.getByTestId("ProfileCard.firstName").should('have.value', newName)
    cy.getByTestId("ProfileCard.lastName").should('have.value', lastName)
  })
})