describe('Article list page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles')
    })
  })
  it('Load articles', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleItem').should('have.length.greaterThan', 3)
  })
})